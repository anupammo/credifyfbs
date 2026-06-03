import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

// GET /api/groups
export const GET = withAuth(
  withRole("VIEWER", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const groups = await prisma.group.findMany({
      where: { organizationId: req.user.orgId },
      orderBy: { name: "asc" },
      select: { id: true, name: true, color: true, createdAt: true, _count: { select: { forms: true } } },
    });

    return NextResponse.json({ groups });
  })
);

const createSchema = z.object({
  name: z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

// POST /api/groups
export const POST = withAuth(
  withRole("EDITOR", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const group = await prisma.group.create({
      data: { ...parsed.data, organizationId: req.user.orgId },
      select: { id: true, name: true, color: true, createdAt: true },
    });

    await auditLog(req.user.sub, "group.create", group.id);

    return NextResponse.json({ group }, { status: 201 });
  })
);
