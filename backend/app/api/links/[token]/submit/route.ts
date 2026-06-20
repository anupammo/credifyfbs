import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { encryptSchema } from "@/lib/crypto/aes";
import { dataLimiter } from "@/lib/rateLimit";

type Ctx = { params: Promise<{ token: string }> };

const submitSchema = z.object({
  answers: z.record(z.unknown()),
});

// POST /api/links/:token/submit — PUBLIC (no auth): store a filled response.
// Answers are PHI, so the payload is AES-256-GCM encrypted at rest, exactly like
// the form schema. Single-use patient links are marked used in the same tx.
export async function POST(req: NextRequest, ctx: Ctx) {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { token } = await ctx.params;
  const link = await prisma.shareLink.findUnique({
    where: { token },
    include: { form: { select: { id: true, deletedAt: true } } },
  });

  if (!link || link.form.deletedAt) {
    return NextResponse.json({ error: "This form link is not available.", code: "LINK_NOT_FOUND" }, { status: 404 });
  }
  if (link.revokedAt || (link.expiresAt && link.expiresAt.getTime() < Date.now()) || (link.kind === "single" && link.usedAt)) {
    return NextResponse.json({ error: "This form link can no longer accept responses.", code: "LINK_CLOSED" }, { status: 410 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
  }
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { enc, iv, tag } = encryptSchema(JSON.stringify(parsed.data.answers));

  await prisma.$transaction(async (tx) => {
    await tx.submission.create({
      data: {
        formId: link.formId,
        shareLinkId: link.id,
        organizationId: link.organizationId,
        dataEnc: enc,
        dataIv: iv,
        dataTag: tag,
      },
    });
    if (link.kind === "single") {
      await tx.shareLink.update({ where: { id: link.id }, data: { usedAt: new Date() } });
    }
  });

  return NextResponse.json({ success: true });
}
