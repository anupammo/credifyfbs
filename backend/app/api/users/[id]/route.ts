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
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional(),
  name: z.string().min(1).max(100).optional(),
});

// PUT /api/users/:id — Admin only
export const PUT = withAuth(
  withRole("ADMIN", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const target = await prisma.user.findFirst({
      where: { id: params.id, organizationId: req.user.orgId, deletedAt: null },
    });
    if (!target) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    const user = await prisma.user.update({
      where: { id: params.id },
      data: parsed.data,
      select: { id: true, email: true, name: true, role: true },
    });

    await auditLog(req.user.sub, "user.update", params.id, parsed.data);

    return NextResponse.json({ user });
  })
);

// DELETE /api/users/:id — Admin only
export const DELETE = withAuth(
  withRole("ADMIN", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    if (params.id === req.user.sub) {
      return NextResponse.json({ error: "Cannot delete yourself", code: "SELF_DELETE" }, { status: 400 });
    }

    const target = await prisma.user.findFirst({
      where: { id: params.id, organizationId: req.user.orgId, deletedAt: null },
    });
    if (!target) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    await prisma.user.update({ where: { id: params.id }, data: { deletedAt: new Date() } });
    await auditLog(req.user.sub, "user.delete", params.id, { email: target.email });

    return NextResponse.json({ success: true });
  })
);
