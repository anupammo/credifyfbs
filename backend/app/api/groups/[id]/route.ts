import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

type Ctx = { params: Record<string, string> };

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).nullable().optional(),
});

// PUT /api/groups/:id
export const PUT = withAuth(
  withRole("EDITOR", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const existing = await prisma.group.findFirst({ where: { id: params.id, organizationId: req.user.orgId } });
    if (!existing) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    // Issue 8: scope write to org to eliminate TOCTOU
    const updateResult = await prisma.group.updateMany({
      where: { id: params.id, organizationId: req.user.orgId },
      data: parsed.data,
    });
    if (updateResult.count === 0) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    const group = await prisma.group.findUnique({ where: { id: params.id } });
    await auditLog(req.user.sub, "group.update", params.id);

    return NextResponse.json({ group });
  })
);

// DELETE /api/groups/:id
export const DELETE = withAuth(
  withRole("ADMIN", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const existing = await prisma.group.findFirst({ where: { id: params.id, organizationId: req.user.orgId } });
    if (!existing) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    // Issue 6: scope form unlink to org; Issue 8: scope delete to org
    await prisma.form.updateMany({
      where: { groupId: params.id, organizationId: req.user.orgId },
      data: { groupId: null },
    });
    await prisma.group.deleteMany({ where: { id: params.id, organizationId: req.user.orgId } });
    await auditLog(req.user.sub, "group.delete", params.id);

    return NextResponse.json({ success: true });
  })
);
