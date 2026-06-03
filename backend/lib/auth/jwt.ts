import jwt, { type SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "@/lib/db";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRY = (process.env.JWT_ACCESS_EXPIRY ?? "15m") as `${number}${'s'|'m'|'h'|'d'}`;
const REFRESH_EXPIRY_DAYS = 30;

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
  orgId: string;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY } as SignOptions);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as AccessTokenPayload;
}

export async function createRefreshToken(userId: string): Promise<string> {
  const raw = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_DAYS * 86_400_000);

  await prisma.refreshToken.create({ data: { tokenHash, userId, expiresAt } });

  return raw;
}

export async function rotateRefreshToken(
  rawToken: string
): Promise<{ userId: string; newRaw: string } | null> {
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });

  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    return null;
  }

  // Revoke old token
  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const newRaw = await createRefreshToken(stored.userId);
  return { userId: stored.userId, newRaw };
}

export async function revokeRefreshToken(rawToken: string): Promise<void> {
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  await prisma.refreshToken.updateMany({
    where: { tokenHash },
    data: { revokedAt: new Date() },
  });
}
