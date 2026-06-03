import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

type Ctx = { params: Record<string, string> };

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  fieldsJson: z.record(z.unknown()).optional(),
});

// PUT /api/blocks/:id
export const PUT = withAuth(
  withRole("EDITOR", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const existing = await prisma.block.findFirst({ where: { id: params.id, organizationId: req.user.orgId } });
    if (!existing) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    const updateData: Prisma.BlockUpdateInput = {};
    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.fieldsJson !== undefined) updateData.fieldsJson = parsed.data.fieldsJson as Prisma.InputJsonValue;
    const block = await prisma.block.update({ where: { id: params.id }, data: updateData });
    await auditLog(req.user.sub, "block.update", params.id);

    return NextResponse.json({ block });
  })
);

// DELETE /api/blocks/:id
export const DELETE = withAuth(
  withRole("EDITOR", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const existing = await prisma.block.findFirst({ where: { id: params.id, organizationId: req.user.orgId } });
    if (!existing) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    await prisma.block.delete({ where: { id: params.id } });
    await auditLog(req.user.sub, "block.delete", params.id);

    return NextResponse.json({ success: true });
  })
);
