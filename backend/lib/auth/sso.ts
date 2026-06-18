import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import type { AccessTokenPayload } from "@/lib/auth/jwt";

/**
 * Single sign-on bridge for credify-login (login.credifyfast.com).
 *
 * credify-login issues its own JWT ({ userId, email }) signed with its JWT_SECRET
 * and stores it in the `credify_token` cookie, scoped to `.credifyfast.com` so it
 * reaches this backend too. We verify that cookie here with the SHARED secret
 * (CREDIFY_LOGIN_JWT_SECRET) and map the login user — by email — onto a local
 * User, provisioning one on first sight. The returned payload matches
 * AccessTokenPayload so every withAuth-protected route works unchanged.
 */

const LOGIN_JWT_SECRET = process.env.CREDIFY_LOGIN_JWT_SECRET;

export interface LoginTokenPayload {
  userId: string;
  email: string;
}

/** Verify a credify-login JWT. Returns null on any failure (missing secret,
 *  bad signature, expired, malformed). */
export function verifyLoginCookie(token: string | undefined | null): LoginTokenPayload | null {
  if (!token || !LOGIN_JWT_SECRET) return null;
  try {
    const decoded = jwt.verify(token, LOGIN_JWT_SECRET) as Partial<LoginTokenPayload>;
    if (!decoded || !decoded.email) return null;
    return { userId: String(decoded.userId ?? ""), email: String(decoded.email) };
  } catch {
    return null;
  }
}

/** Find the default organization to provision SSO users into (the seeded
 *  "credify" org), creating one only if the instance has none at all. */
async function defaultOrg() {
  const bySlug = await prisma.organization.findUnique({ where: { slug: "credify" } });
  if (bySlug) return bySlug;
  const first = await prisma.organization.findFirst();
  if (first) return first;
  return prisma.organization.create({ data: { name: "Credify", slug: "credify" } });
}

/**
 * Resolve a credify-login identity to a local User, provisioning on first sight.
 * Match is by email (the stable identifier across the two separate user stores).
 * New users get role EDITOR and an unusable password hash (they only ever sign
 * in through credify-login). Returns an AccessTokenPayload-shaped object.
 */
export async function resolveSsoUser(payload: LoginTokenPayload): Promise<AccessTokenPayload> {
  const email = payload.email.toLowerCase().trim();

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const org = await defaultOrg();
    user = await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0] || "User",
        // SSO users never password-login here; store a non-bcrypt sentinel so a
        // password check can never succeed.
        passwordHash: "sso:" + crypto.randomBytes(24).toString("hex"),
        role: Role.EDITOR,
        organizationId: org.id,
      },
    });
  }

  return { sub: user.id, email: user.email, role: user.role, orgId: user.organizationId };
}
