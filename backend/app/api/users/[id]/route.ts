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
  email: z.string().email().optional(),
  active: z.boolean().optional(),
  firstName: z.string().max(100).nullable().optional(),
  lastName: z.string().max(100).nullable().optional(),
  preferredName: z.string().max(100).nullable().optional(),
  phone: z.string().max(40).nullable().optional(),
  mobile: z.string().max(40).nullable().optional(),
  title: z.string().max(100).nullable().optional(),
  company: z.string().max(150).nullable().optional(),
  division: z.string().max(100).nullable().optional(),
  employeeNumber: z.string().max(100).nullable().optional(),
  costCenter: z.string().max(100).nullable().optional(),
  timeZone: z.string().max(100).nullable().optional(),
  language: z.string().max(100).nullable().optional(),
});

const userSelect = {
  id: true, email: true, name: true, role: true, active: true,
  firstName: true, lastName: true, preferredName: true,
  phone: true, mobile: true, title: true, company: true,
  division: true, employeeNumber: true, costCenter: true,
  timeZone: true, language: true,
} as const;

// PUT /api/users/:id — Admin only
export const PUT = withAuth(
  withRole("ADMIN", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
    }

    const target = await prisma.user.findFirst({
      where: { id: params.id, organizationId: req.user.orgId, deletedAt: null },
    });
    if (!target) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    // Email is unique — block a collision with another account before updating.
    if (parsed.data.email && parsed.data.email !== target.email) {
      const clash = await prisma.user.findUnique({ where: { email: parsed.data.email } });
      if (clash) return NextResponse.json({ error: "Email already in use", code: "EMAIL_CONFLICT" }, { status: 409 });
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: parsed.data,
      select: userSelect,
    });

    await auditLog(req.user.sub, "user.update", params.id, { fields: Object.keys(parsed.data) });

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
