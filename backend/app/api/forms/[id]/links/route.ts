import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { encryptSchema } from "@/lib/crypto/aes";
import { withAuth } from "@/lib/middleware/withAuth";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

type Ctx = { params: Record<string, string> };

// The user may manage a form's links if they own it, are an admin, or hold an
// EDIT share. Mirrors canAccess() in ../route.ts but scoped to edit rights.
async function canManageForm(userId: string, orgId: string, formId: string, role: string) {
  const form = await prisma.form.findFirst({
    where: { id: formId, organizationId: orgId, deletedAt: null },
    include: { shares: { where: { userId } } },
  });
  if (!form) return { form: null, canEdit: false };
  const canEdit = form.ownerId === userId || role === "ADMIN" || form.shares[0]?.access === "EDIT";
  return { form, canEdit };
}

function linkStatus(l: { revokedAt: Date | null; usedAt: Date | null; expiresAt: Date | null }): string {
  if (l.revokedAt) return "revoked";
  if (l.expiresAt && l.expiresAt.getTime() < Date.now()) return "expired";
  if (l.usedAt) return "used";
  return "active";
}

const createSchema = z.object({
  kind: z.enum(["public", "single"]).default("public"),
  html: z.string().min(1).max(2_000_000),
  label: z.string().max(200).nullish(),
  expiresInDays: z.number().int().positive().max(365).optional(),
});

// POST /api/forms/:id/links — create a share link (returns its token).
export const POST = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { form, canEdit } = await canManageForm(req.user.sub, req.user.orgId, params.id, req.user.role);
  if (!form) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
  if (!canEdit) return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
  }
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
  }

  const token = crypto.randomBytes(18).toString("base64url");
  const { enc, iv, tag } = encryptSchema(parsed.data.html);
  const expiresAt = parsed.data.expiresInDays
    ? new Date(Date.now() + parsed.data.expiresInDays * 86_400_000)
    : null;

  const link = await prisma.shareLink.create({
    data: {
      token,
      formId: form.id,
      organizationId: req.user.orgId,
      kind: parsed.data.kind,
      label: parsed.data.label ?? null,
      htmlEnc: enc,
      htmlIv: iv,
      htmlTag: tag,
      expiresAt,
      createdById: req.user.sub,
    },
    select: { id: true, token: true, kind: true, label: true, expiresAt: true, revokedAt: true, usedAt: true },
  });

  await auditLog(req.user.sub, "form.share_link.create", link.id, { kind: link.kind }, form.id);

  return NextResponse.json({
    token: link.token,
    link: { id: link.id, token: link.token, kind: link.kind, label: link.label, status: linkStatus(link), expires_at: link.expiresAt },
  });
});

// GET /api/forms/:id/links — list a form's share links.
export const GET = withAuth(async (req: AuthedRequest, { params }: Ctx) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { form, canEdit } = await canManageForm(req.user.sub, req.user.orgId, params.id, req.user.role);
  if (!form) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
  if (!canEdit) return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });

  const links = await prisma.shareLink.findMany({
    where: { formId: form.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, token: true, kind: true, label: true, expiresAt: true, revokedAt: true, usedAt: true },
  });

  return NextResponse.json({
    links: links.map((l) => ({
      id: l.id, token: l.token, kind: l.kind, label: l.label,
      status: linkStatus(l), expires_at: l.expiresAt,
    })),
  });
});
