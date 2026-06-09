import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { rotateRefreshToken, signAccessToken } from "@/lib/auth/jwt";
import { authLimiter } from "@/lib/rateLimit";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

const schema = z.object({ refreshToken: z.string().min(1) });

export async function POST(req: NextRequest) {
  const limited = authLimiter(req);
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", code: "VALIDATION_ERROR" }, { status: 400, headers: corsHeaders });
  }

  const result = await rotateRefreshToken(parsed.data.refreshToken);
  if (!result) {
    return NextResponse.json({ error: "Invalid or expired token", code: "INVALID_REFRESH_TOKEN" }, { status: 401, headers: corsHeaders });
  }

  const user = await prisma.user.findUnique({
    where: { id: result.userId },
    select: { id: true, email: true, role: true, organizationId: true, deletedAt: true },
  });

  if (!user || user.deletedAt) {
    return NextResponse.json({ error: "User not found", code: "USER_NOT_FOUND" }, { status: 401, headers: corsHeaders });
  }

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    orgId: user.organizationId,
  });

  return NextResponse.json({ accessToken, refreshToken: result.newRaw }, { headers: corsHeaders });
}
