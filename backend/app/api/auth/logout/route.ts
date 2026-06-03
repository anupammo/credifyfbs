import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/withAuth";
import { revokeRefreshToken } from "@/lib/auth/jwt";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

export const POST = withAuth(async (req: AuthedRequest) => {
  const body = await req.json().catch(() => ({}));
  const refreshToken = body?.refreshToken as string | undefined;

  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }

  return NextResponse.json({ success: true });
});
