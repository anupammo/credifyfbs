import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Credify-Signature",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export const GET = withAuth(async (req: AuthedRequest) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.sub },
    select: { id: true, email: true, name: true, role: true, organizationId: true, createdAt: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found", code: "USER_NOT_FOUND" }, { status: 404, headers: corsHeaders });
  }

  return NextResponse.json({ user }, { headers: corsHeaders });
});
