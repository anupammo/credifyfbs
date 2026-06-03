import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

export const GET = withAuth(async (req: AuthedRequest) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    select: { id: true, email: true, name: true, role: true, organizationId: true, createdAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found", code: "USER_NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({ user });
});
