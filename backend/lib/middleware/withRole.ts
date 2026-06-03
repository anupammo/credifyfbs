import { NextResponse } from "next/server";
import type { AuthedRequest } from "./withAuth";

type Handler = (req: AuthedRequest, ctx: { params: Record<string, string> }) => Promise<NextResponse>;

const ROLE_RANK: Record<string, number> = { VIEWER: 0, EDITOR: 1, ADMIN: 2 };

export function withRole(minRole: "VIEWER" | "EDITOR" | "ADMIN", handler: Handler) {
  return async (req: AuthedRequest, ctx: { params: Record<string, string> }) => {
    const userRank = ROLE_RANK[req.user.role] ?? -1;
    const requiredRank = ROLE_RANK[minRole];

    if (userRank < requiredRank) {
      return NextResponse.json({ error: "Forbidden", code: "INSUFFICIENT_ROLE" }, { status: 403 });
    }

    return handler(req, ctx);
  };
}
