import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

type Ctx = { params: Record<string, string> };

async function assertOwnerOrAdmin(req: AuthedRequest, formId: string) {
  const form = await prisma.form.findFirst({
    where: { id: formId, organizationId: req.user.orgId, deletedAt: null },
  });
  if (!form) return null;
  if (form.ownerId !== req.user.sub && req.user.role !== "ADMIN") return null;
  return form;
}

// GET /api/forms/:id/role-share — list this form's role grants
export const GET = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const form = await assertOwnerOrAdmin(req, params.id);
  if (!form) return NextResponse.json({ error: "Not found or forbidden", code: "NOT_FOUND" }, { status: 404 });

  const roleShares = await prisma.formRoleShare.findMany({
    where: { formId: params.id },
    select: { role: true, access: true },
  });

  return NextResponse.json({ roleShares });
});

const roleShareSchema = z.object({
  // The role string. Built-in roles (ADMIN/EDITOR/VIEWER) resolve to users; a
  // custom front-end role can be stored but won't match any user server-side.
  role: z.string().min(1).max(64),
  access: z.enum(["EDIT", "VIEW"]),
});

// POST /api/forms/:id/role-share — grant/update a role's access (upsert)
export const POST = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const form = await assertOwnerOrAdmin(req, params.id);
  if (!form) return NextResponse.json({ error: "Not found or forbidden", code: "NOT_FOUND" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = roleShareSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  const role = parsed.data.role.toUpperCase();
  const { access } = parsed.data;

  const roleShare = await prisma.formRoleShare.upsert({
    where: { formId_role: { formId: params.id, role } },
    update: { access },
    create: { formId: params.id, role, access },
  });

  await auditLog(req.user.sub, "form.roleShare", params.id, { role, access }, params.id);

  return NextResponse.json({ roleShare });
});

// DELETE /api/forms/:id/role-share?role=EDITOR — revoke a role's access
export const DELETE = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const form = await assertOwnerOrAdmin(req, params.id);
  if (!form) return NextResponse.json({ error: "Not found or forbidden", code: "NOT_FOUND" }, { status: 404 });

  const role = (new URL(req.url).searchParams.get("role") || "").toUpperCase();
  if (!role) {
    return NextResponse.json({ error: "role query param required", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  await prisma.formRoleShare.deleteMany({ where: { formId: params.id, role } });
  await auditLog(req.user.sub, "form.roleUnshare", params.id, { role }, params.id);

  return NextResponse.json({ success: true });
});
