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

// GET /api/forms/:id/share
export const GET = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const form = await assertOwnerOrAdmin(req, params.id);
  if (!form) return NextResponse.json({ error: "Not found or forbidden", code: "NOT_FOUND" }, { status: 404 });

  const allShares = await prisma.formShare.findMany({
    where: { formId: params.id },
    include: { user: { select: { id: true, name: true, email: true, role: true, deletedAt: true } } },
  });
  // Issue 11: exclude shares belonging to soft-deleted users
  const shares = allShares
    .filter((s) => s.user.deletedAt === null)
    .map(({ user: { deletedAt: _d, ...u }, ...s }) => ({ ...s, user: u }));

  return NextResponse.json({ shares });
});

const shareSchema = z.object({
  userId: z.string().cuid(),
  access: z.enum(["EDIT", "VIEW"]),
});

// POST /api/forms/:id/share
export const POST = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const form = await assertOwnerOrAdmin(req, params.id);
  if (!form) return NextResponse.json({ error: "Not found or forbidden", code: "NOT_FOUND" }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = shareSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { userId, access } = parsed.data;

  // Issue 10: validate target user belongs to same org and is not soft-deleted
  const target = await prisma.user.findFirst({ where: { id: userId, organizationId: req.user.orgId, deletedAt: null } });
  if (!target) {
    return NextResponse.json({ error: "User not found in organisation", code: "USER_NOT_FOUND" }, { status: 400 });
  }

  const share = await prisma.formShare.upsert({
    where: { formId_userId: { formId: params.id, userId } },
    update: { access },
    create: { formId: params.id, userId, access },
  });

  await auditLog(req.user.sub, "form.share", params.id, { userId, access }, params.id);

  return NextResponse.json({ share });
});

// DELETE /api/forms/:id/share/:userId — handled via query param since Next.js nested dynamic segments are tricky
export const DELETE = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const form = await assertOwnerOrAdmin(req, params.id);
  if (!form) return NextResponse.json({ error: "Not found or forbidden", code: "NOT_FOUND" }, { status: 404 });

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId query param required", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  await prisma.formShare.deleteMany({ where: { formId: params.id, userId } });
  await auditLog(req.user.sub, "form.unshare", params.id, { userId }, params.id);

  return NextResponse.json({ success: true });
});
