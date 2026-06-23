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
  name: z.string().min(1).max(200).optional(),
  firstName: z.string().max(100).nullable().optional(),
  lastName: z.string().max(100).nullable().optional(),
  preferredName: z.string().max(100).nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal("")),
  phone: z.string().max(40).nullable().optional(),
  mobile: z.string().max(40).nullable().optional(),
  title: z.string().max(100).nullable().optional(),
  company: z.string().max(150).nullable().optional(),
  dob: z.string().max(40).nullable().optional(),
  mrn: z.string().max(100).nullable().optional(),
  timeZone: z.string().max(100).nullable().optional(),
  language: z.string().max(100).nullable().optional(),
  notify: z.enum(["email", "sms", "both"]).optional(),
});

// PUT /api/contacts/:id
export const PUT = withAuth(
  withRole("EDITOR", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
    }

    const existing = await prisma.contact.findFirst({ where: { id: params.id, organizationId: req.user.orgId, deletedAt: null } });
    if (!existing) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    const data = { ...parsed.data };
    if (data.email === "") data.email = null;

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data,
      select: {
        id: true, name: true, firstName: true, lastName: true, preferredName: true,
        email: true, phone: true, mobile: true, title: true, company: true,
        dob: true, mrn: true, timeZone: true, language: true, notify: true,
      },
    });
    await auditLog(req.user.sub, "contact.update", params.id);

    return NextResponse.json({ contact });
  })
);

// DELETE /api/contacts/:id — soft delete (mirrors User)
export const DELETE = withAuth(
  withRole("EDITOR", async (req: AuthedRequest, { params }: Ctx) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const existing = await prisma.contact.findFirst({ where: { id: params.id, organizationId: req.user.orgId, deletedAt: null } });
    if (!existing) return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });

    await prisma.contact.update({ where: { id: params.id }, data: { deletedAt: new Date() } });
    await auditLog(req.user.sub, "contact.delete", params.id);

    return NextResponse.json({ success: true });
  })
);
