import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, type AccessTokenPayload } from "@/lib/auth/jwt";

export type AuthedRequest = NextRequest & { user: AccessTokenPayload };

type Handler = (req: AuthedRequest, ctx: { params: Record<string, string> }) => Promise<NextResponse>;

export function withAuth(handler: Handler) {
  return async (req: NextRequest, ctx: { params: Record<string, string> }) => {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized", code: "MISSING_TOKEN" }, { status: 401 });
    }

    const token = authHeader.slice(7);
    try {
      const payload = verifyAccessToken(token);
      (req as AuthedRequest).user = payload;
      return handler(req as AuthedRequest, ctx);
    } catch {
      return NextResponse.json({ error: "Unauthorized", code: "INVALID_TOKEN" }, { status: 401 });
    }
  };
}
