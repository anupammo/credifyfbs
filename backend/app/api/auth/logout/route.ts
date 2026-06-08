import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/withAuth";
import { revokeRefreshToken } from "@/lib/auth/jwt";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

export const POST = withAuth(async (req: AuthedRequest) => {
  const body = await req.json().catch(() => ({}));
  const refreshToken = body?.refreshToken as string | undefined;

  if (refreshToken) {
    // Issue 12: scope revocation to the calling user's own tokens
    await revokeRefreshToken(refreshToken, req.user.sub);
  }

  return NextResponse.json({ success: true });
});
