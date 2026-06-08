import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { encryptSchema, decryptSchema } from "@/lib/crypto/aes";
import { verifyPayloadSignature } from "@/lib/crypto/hmac";
import { withAuth } from "@/lib/middleware/withAuth";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

type Ctx = { params: Record<string, string> };

async function canAccess(userId: string, orgId: string, formId: string, role: string) {
  const form = await prisma.form.findFirst({
    where: { id: formId, organizationId: orgId, deletedAt: null },
    include: { shares: { where: { userId } } },
  });
  if (!form) return { form: null, permitted: false, canEdit: false };

  const isOwner = form.ownerId === userId;
  const share = form.shares[0];
  const isAdmin = role === "ADMIN";

  const canEdit = isOwner || isAdmin || share?.access === "EDIT";
  const permitted = isOwner || isAdmin || !!share;

  return { form, permitted, canEdit };
}

// GET /api/forms/:id
export const GET = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { form, permitted } = await canAccess(req.user.sub, req.user.orgId, params.id, req.user.role);
  if (!form || !permitted) {
    return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
  }

  const schema = decryptSchema(form.schemaEnc, form.schemaIv, form.schemaTag);

  return NextResponse.json({
    form: {
      id: form.id,
      title: form.title,
      description: form.description,
      groupId: form.groupId,
      scoringSections: form.scoringSections,
      schema: JSON.parse(schema),
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    },
  });
});

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  schema: z.record(z.unknown()).optional(),
  groupId: z.string().cuid().nullable().optional(),
  scoringSections: z.array(z.unknown()).optional(),
});

// PUT /api/forms/:id
export const PUT = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { form, canEdit } = await canAccess(req.user.sub, req.user.orgId, params.id, req.user.role);
  if (!form) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
  if (!canEdit) return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });

  const rawBody = await req.text();
  const sig = req.headers.get("x-credify-signature");
  if (sig && !verifyPayloadSignature(rawBody, sig)) {
    return NextResponse.json({ error: "Invalid signature", code: "BAD_SIGNATURE" }, { status: 400 });
  }

  let body: unknown;
  try { body = JSON.parse(rawBody); } catch {
    return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
  }

  const data: Prisma.FormUpdateInput = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if ("groupId" in parsed.data) {
    // Issue 3: validate groupId belongs to caller's org before writing
    if (parsed.data.groupId !== null && parsed.data.groupId !== undefined) {
      const group = await prisma.group.findFirst({
        where: { id: parsed.data.groupId, organizationId: req.user.orgId },
      });
      if (!group) {
        return NextResponse.json({ error: "Group not found", code: "NOT_FOUND" }, { status: 400 });
      }
    }
    data.group = parsed.data.groupId ? { connect: { id: parsed.data.groupId } } : { disconnect: true };
  }
  if (parsed.data.scoringSections !== undefined)
    data.scoringSections = parsed.data.scoringSections as Prisma.InputJsonValue;
  if (parsed.data.schema !== undefined) {
    const { enc, iv, tag } = encryptSchema(JSON.stringify(parsed.data.schema));
    data.schemaEnc = enc;
    data.schemaIv = iv;
    data.schemaTag = tag;
  }

  // Issue 5: scope write to the org to eliminate TOCTOU window
  const updateResult = await prisma.form.updateMany({
    where: { id: params.id, organizationId: req.user.orgId },
    data: data as Prisma.FormUncheckedUpdateInput,
  });
  if (updateResult.count === 0) {
    return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
  }
  const updated = await prisma.form.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, updatedAt: true },
  });

  await auditLog(req.user.sub, "form.update", params.id, {}, params.id);

  return NextResponse.json({ form: updated });
});

// DELETE /api/forms/:id
export const DELETE = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { form } = await canAccess(req.user.sub, req.user.orgId, params.id, req.user.role);
  if (!form) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

  const isOwner = form.ownerId === req.user.sub;
  const isAdmin = req.user.role === "ADMIN";
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
  }

  // Issue 5: scope soft-delete to org (TOCTOU fix)
  await prisma.form.updateMany({
    where: { id: params.id, organizationId: req.user.orgId },
    data: { deletedAt: new Date() },
  });
  await auditLog(req.user.sub, "form.delete", params.id, {}, params.id);

  return NextResponse.json({ success: true });
});
