import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { decryptSchema } from "@/lib/crypto/aes";
import { dataLimiter } from "@/lib/rateLimit";

type Ctx = { params: Promise<{ token: string }> };

// GET /api/links/:token — PUBLIC (no auth): resolve a share token to its
// fillable form HTML. The patient filling the form is never signed in, so this
// endpoint is intentionally unauthenticated; access is gated only by possession
// of the unguessable token, plus revoke/expiry/single-use checks.
export async function GET(req: NextRequest, ctx: Ctx) {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const { token } = await ctx.params;
  const link = await prisma.shareLink.findUnique({
    where: { token },
    include: { form: { select: { id: true, title: true, deletedAt: true } } },
  });

  if (!link || link.form.deletedAt) {
    return NextResponse.json({ error: "This form link is not available.", code: "LINK_NOT_FOUND" }, { status: 404 });
  }
  if (link.revokedAt) {
    return NextResponse.json({ error: "This form link has been revoked.", code: "LINK_REVOKED" }, { status: 410 });
  }
  if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "This form link has expired.", code: "LINK_EXPIRED" }, { status: 410 });
  }
  if (link.kind === "single" && link.usedAt) {
    return NextResponse.json({ error: "This form link has already been used.", code: "LINK_USED" }, { status: 410 });
  }

  const html = decryptSchema(link.htmlEnc, link.htmlIv, link.htmlTag);
  return NextResponse.json({
    form: { id: link.form.id, title: link.form.title, html },
    token: link.token,
    kind: link.kind,
  });
}
