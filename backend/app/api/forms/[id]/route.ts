import { NextResponse } from "next/server";
import { z } from "zod";
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
    include: {
      shares: { where: { userId } },
      roleShares: { where: { role } }, // a grant to THIS user's role
    },
  });
  if (!form) return { form: null, permitted: false, canEdit: false, myAccess: null };

  const isOwner = form.ownerId === userId;
  const isAdmin = role === "ADMIN";

  // Effective grant = strongest of the direct user share and the role share.
  const grants = [form.shares[0]?.access, form.roleShares[0]?.access].filter(Boolean);
  const hasEdit = grants.includes("EDIT");
  const hasAny = grants.length > 0;

  const canEdit = isOwner || isAdmin || hasEdit;
  const permitted = isOwner || isAdmin || hasAny;
  const myAccess = isOwner || isAdmin ? null : hasEdit ? "EDIT" : hasAny ? "VIEW" : null;

  return { form, permitted, canEdit, myAccess };
}

// GET /api/forms/:id
export const GET = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { form, permitted, myAccess } = await canAccess(req.user.sub, req.user.orgId, params.id, req.user.role);
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
      ownerId: form.ownerId,
      // The current user's effective grant (direct user share OR role share),
      // so a shared user resolves Edit/View on the form detail too.
      myAccess,
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

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) data.title = parsed.data.title;
  if (parsed.data.description !== undefined) data.description = parsed.data.description;
  if ("groupId" in parsed.data) data.groupId = parsed.data.groupId;
  if (parsed.data.scoringSections !== undefined) data.scoringSections = parsed.data.scoringSections;
  if (parsed.data.schema !== undefined) {
    const { enc, iv, tag } = encryptSchema(JSON.stringify(parsed.data.schema));
    data.schemaEnc = enc;
    data.schemaIv = iv;
    data.schemaTag = tag;
  }

  const updated = await prisma.form.update({
    where: { id: params.id },
    data,
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

  await prisma.form.update({ where: { id: params.id }, data: { deletedAt: new Date() } });
  await auditLog(req.user.sub, "form.delete", params.id, {}, params.id);

  return NextResponse.json({ success: true });
});
