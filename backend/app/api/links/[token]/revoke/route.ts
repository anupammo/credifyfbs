import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

type Ctx = { params: Record<string, string> };

// POST /api/links/:idOrToken/revoke — revoke a share link (owner / admin /
// editor). The builder UI passes the link id here; we also accept the token.
export const POST = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const key = params.token; // route folder is [token]; UI sends the link id
  const link = await prisma.shareLink.findFirst({
    where: { organizationId: req.user.orgId, OR: [{ id: key }, { token: key }] },
    include: { form: { select: { ownerId: true, shares: { where: { userId: req.user.sub } } } } },
  });
  if (!link) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

  const canEdit =
    link.form.ownerId === req.user.sub ||
    req.user.role === "ADMIN" ||
    link.form.shares[0]?.access === "EDIT";
  if (!canEdit) return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });

  if (!link.revokedAt) {
    await prisma.shareLink.update({ where: { id: link.id }, data: { revokedAt: new Date() } });
  }
  await auditLog(req.user.sub, "form.share_link.revoke", link.id, {}, link.formId);

  return NextResponse.json({ success: true });
});
