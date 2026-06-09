import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/withAuth";
import { revokeRefreshToken } from "@/lib/auth/jwt";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export const POST = withAuth(async (req: AuthedRequest) => {
  const body = await req.json().catch(() => ({}));
  const refreshToken = body?.refreshToken as string | undefined;

  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }

  return NextResponse.json({ success: true }, { headers: corsHeaders });
});
