import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { signAccessToken, createRefreshToken } from "@/lib/auth/jwt";
import { authLimiter } from "@/lib/rateLimit";
import { auditLog } from "@/lib/audit";
import { isStrongPassword, normalizePhone, slugify } from "@/lib/auth/validation";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  company: z.string().min(1).max(200),
  phone: z.string(),
  source: z.string().optional(),
  sourceLabel: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", code: "VALIDATION_ERROR" }, { status: 400, headers: corsHeaders });
  }

  const { firstName, lastName, company, source, sourceLabel } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const password = parsed.data.password;

  if (!isStrongPassword(password)) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters and include uppercase, lowercase, a digit, and a special character", code: "VALIDATION_ERROR" },
      { status: 400, headers: corsHeaders }
    );
  }

  const phone = normalizePhone(parsed.data.phone);

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return NextResponse.json({ error: "Email already in use", code: "EMAIL_CONFLICT" }, { status: 409, headers: corsHeaders });
  }

  if (phone) {
    const existingPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingPhone) {
      return NextResponse.json({ error: "Phone number already in use", code: "PHONE_CONFLICT" }, { status: 409, headers: corsHeaders });
    }
  }

  const passwordHash = await hashPassword(password);
  const name = `${firstName} ${lastName}`.trim();
  const slug = `${slugify(company) || "org"}-${crypto.randomBytes(3).toString("hex")}`;

  const user = await prisma.$transaction(async (tx) => {
    const org = await tx.organization.create({
      data: { name: company, slug },
    });
    return tx.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "ADMIN",
        phone: phone || null,
        source: source ?? null,
        sourceLabel: sourceLabel ?? null,
        organizationId: org.id,
      },
      select: { id: true, email: true, name: true, role: true, organizationId: true },
    });
  });

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    orgId: user.organizationId,
  });
  const refreshToken = await createRefreshToken(user.id);

  await auditLog(user.id, "auth.signup", user.id, { email: user.email, source: source ?? null });

  return NextResponse.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  }, { status: 201, headers: corsHeaders });
}
