import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, type AccessTokenPayload } from "@/lib/auth/jwt";
import { verifyLoginCookie, resolveSsoUser } from "@/lib/auth/sso";

export type AuthedRequest = NextRequest & { user: AccessTokenPayload };

type Handler = (req: AuthedRequest, ctx: { params: Record<string, string> }) => Promise<NextResponse>;

const unauthorized = (code: string) =>
  NextResponse.json({ error: "Unauthorized", code }, { status: 401 });

/**
 * Authorize a request by EITHER:
 *  1. a Bearer access token (extension / offline clients), or
 *  2. the credify-login `credify_token` cookie (SSO from login.credifyfast.com),
 *     validated with the shared secret and mapped/provisioned to a local user.
 * Either path yields the same `req.user` (AccessTokenPayload), so downstream
 * routes are unchanged. CORS — including OPTIONS preflight — is handled centrally
 * in middleware.ts.
 */
export function withAuth(handler: Handler) {
  return async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    const run = async (user: AccessTokenPayload) => {
      (req as AuthedRequest).user = user;
      return handler(req as AuthedRequest, { params: await ctx.params });
    };

    // 1) Bearer access token.
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      try {
        return await run(verifyAccessToken(authHeader.slice(7)));
      } catch {
        return unauthorized("INVALID_TOKEN");
      }
    }

    // 2) credify-login SSO cookie.
    const loginPayload = verifyLoginCookie(req.cookies.get("credify_token")?.value);
    if (loginPayload) {
      try {
        return await run(await resolveSsoUser(loginPayload));
      } catch {
        return unauthorized("SSO_RESOLVE_FAILED");
      }
    }

    return unauthorized("MISSING_TOKEN");
  };
}
