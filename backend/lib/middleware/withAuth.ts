import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken, type AccessTokenPayload } from "@/lib/auth/jwt";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export type AuthedRequest = NextRequest & { user: AccessTokenPayload };

type Handler = (req: AuthedRequest, ctx: { params: Record<string, string> }) => Promise<NextResponse>;

export function withAuth(handler: Handler) {
  return async (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => {
    // Handle preflight
    if (req.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: corsHeaders });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized", code: "MISSING_TOKEN" }, { status: 401, headers: corsHeaders });
    }

    const token = authHeader.slice(7);
    try {
      const payload = verifyAccessToken(token);
      (req as AuthedRequest).user = payload;
      const resolvedCtx = { params: await ctx.params };
      return handler(req as AuthedRequest, resolvedCtx);
    } catch {
      return NextResponse.json({ error: "Unauthorized", code: "INVALID_TOKEN" }, { status: 401, headers: corsHeaders });
    }
  };
}
