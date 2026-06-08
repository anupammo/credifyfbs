import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { encryptSchema } from "@/lib/crypto/aes";
import { verifyPayloadSignature } from "@/lib/crypto/hmac";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  schema: z.record(z.unknown()),
  groupId: z.string().cuid().optional(),
  scoringSections: z.array(z.unknown()).default([]),
});

// GET /api/forms
export const GET = withAuth(
  withRole("VIEWER", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "25")));
    const search = url.searchParams.get("search") ?? "";

    // VIEWERs can only see forms they own or have been explicitly shared with
    const visibilityFilter: Prisma.FormWhereInput =
      req.user.role === "VIEWER"
        ? { OR: [{ ownerId: req.user.sub }, { shares: { some: { userId: req.user.sub } } }] }
        : {};

    const where: Prisma.FormWhereInput = {
      organizationId: req.user.orgId,
      deletedAt: null,
      ...visibilityFilter,
      ...(search ? { title: { contains: search, mode: "insensitive" as const } } : {}),
    };

    const [forms, total] = await Promise.all([
      prisma.form.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          groupId: true,
          scoringSections: true,
          createdAt: true,
          updatedAt: true,
          owner: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.form.count({ where }),
    ]);

    return NextResponse.json({ forms, total, page, limit });
  })
);

// POST /api/forms
export const POST = withAuth(
  withRole("EDITOR", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const rawBody = await req.text();
    const sig = req.headers.get("x-credify-signature");
    if (sig && !verifyPayloadSignature(rawBody, sig)) {
      return NextResponse.json({ error: "Invalid signature", code: "BAD_SIGNATURE" }, { status: 400 });
    }

    let body: unknown;
    try { body = JSON.parse(rawBody); } catch {
      return NextResponse.json({ error: "Invalid JSON", code: "INVALID_JSON" }, { status: 400 });
    }

    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
    }

    const { title, description, schema, groupId, scoringSections } = parsed.data;

    // Issue 2: validate groupId belongs to the caller's org before using it
    if (groupId) {
      const group = await prisma.group.findFirst({
        where: { id: groupId, organizationId: req.user.orgId },
      });
      if (!group) {
        return NextResponse.json({ error: "Group not found", code: "NOT_FOUND" }, { status: 400 });
      }
    }

    const { enc, iv, tag } = encryptSchema(JSON.stringify(schema));

    const form = await prisma.form.create({
      data: {
        title,
        description,
        schemaEnc: enc,
        schemaIv: iv,
        schemaTag: tag,
        ownerId: req.user.sub,
        organizationId: req.user.orgId,
        groupId: groupId ?? null,
        scoringSections: scoringSections as Prisma.InputJsonValue,
      },
      select: { id: true, title: true, description: true, groupId: true, scoringSections: true, createdAt: true },
    });

    await auditLog(req.user.sub, "form.create", form.id, { title }, form.id);

    return NextResponse.json({ form }, { status: 201 });
  })
);
