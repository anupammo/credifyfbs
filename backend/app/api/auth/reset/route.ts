import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { authLimiter } from "@/lib/rateLimit";
import { isStrongPassword } from "@/lib/auth/validation";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", code: "VALIDATION_ERROR" }, { status: 400, headers: corsHeaders });
  }

  const { token, password } = parsed.data;

  if (!isStrongPassword(password)) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters and include uppercase, lowercase, a digit, and a special character", code: "VALIDATION_ERROR" },
      { status: 400, headers: corsHeaders }
    );
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const stored = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });

  if (!stored || stored.usedAt || stored.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token", code: "INVALID_TOKEN" }, { status: 400, headers: corsHeaders });
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({ where: { id: stored.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: stored.id }, data: { usedAt: new Date() } }),
    prisma.refreshToken.updateMany({
      where: { userId: stored.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}
