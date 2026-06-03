import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

// GET /api/blocks
export const GET = withAuth(
  withRole("VIEWER", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const blocks = await prisma.block.findMany({
      where: { organizationId: req.user.orgId },
      orderBy: { updatedAt: "desc" },
      select: { id: true, name: true, fieldsJson: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({ blocks });
  })
);

const createSchema = z.object({
  name: z.string().min(1).max(100),
  fieldsJson: z.record(z.unknown()),
});

// POST /api/blocks
export const POST = withAuth(
  withRole("EDITOR", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const block = await prisma.block.create({
      data: { name: parsed.data.name, fieldsJson: parsed.data.fieldsJson as Prisma.InputJsonValue, organizationId: req.user.orgId },
      select: { id: true, name: true, fieldsJson: true, createdAt: true },
    });

    await auditLog(req.user.sub, "block.create", block.id);

    return NextResponse.json({ block }, { status: 201 });
  })
);
