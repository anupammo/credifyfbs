import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { signAccessToken, createRefreshToken } from "@/lib/auth/jwt";
import { authLimiter } from "@/lib/rateLimit";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, role: true, organizationId: true, passwordHash: true, deletedAt: true },
  });

  // Constant-time: always run bcrypt to prevent timing attacks
  const dummyHash = "$2b$12$invalidhashfortimingnormalization000000000000000000000";
  const valid = await verifyPassword(password, user?.passwordHash ?? dummyHash);

  if (!user || !valid || user.deletedAt) {
    return NextResponse.json({ error: "Invalid credentials", code: "INVALID_CREDENTIALS" }, { status: 401 });
  }

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    orgId: user.organizationId,
  });
  const refreshToken = await createRefreshToken(user.id);

  return NextResponse.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
}
