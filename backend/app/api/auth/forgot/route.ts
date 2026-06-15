import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { authLimiter } from "@/lib/rateLimit";
import { sendMail, passwordResetEmail } from "@/lib/mail";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

const schema = z.object({ email: z.string().email() });

const RESET_TTL_MS = 30 * 60_000; // 30 minutes

export async function POST(req: NextRequest) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  // Never reveal whether the email exists or was malformed — always 200.
  if (!parsed.success) {
    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, deletedAt: true } });

  if (user && !user.deletedAt) {
    // Invalidate any prior unused tokens for this user.
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });

    const raw = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
    const expiresAt = new Date(Date.now() + RESET_TTL_MS);

    await prisma.passwordResetToken.create({ data: { tokenHash, userId: user.id, expiresAt } });

    const appUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    const link = `${appUrl}/reset?token=${raw}`;
    const { subject, html, text } = passwordResetEmail(link);

    try {
      await sendMail({ to: email, subject, html, text });
    } catch (err) {
      // Do not leak failures to the client; log for operators.
      console.error("[auth.forgot] failed to send reset email:", err);
    }
  }

  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}
