import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

// Fields returned to the client — everything the Contact Directory UI renders.
const contactSelect = {
  id: true, name: true, firstName: true, lastName: true, preferredName: true,
  email: true, phone: true, mobile: true, title: true, company: true,
  dob: true, mrn: true, timeZone: true, language: true, notify: true,
  createdAt: true,
} as const;

// GET /api/contacts
export const GET = withAuth(
  withRole("VIEWER", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const contacts = await prisma.contact.findMany({
      where: { organizationId: req.user.orgId, deletedAt: null },
      orderBy: { name: "asc" },
      select: contactSelect,
    });

    return NextResponse.json({ contacts });
  })
);

const createSchema = z.object({
  name: z.string().min(1).max(200),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  preferredName: z.string().max(100).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional(),
  mobile: z.string().max(40).optional(),
  title: z.string().max(100).optional(),
  company: z.string().max(150).optional(),
  dob: z.string().max(40).optional(),
  mrn: z.string().max(100).optional(),
  timeZone: z.string().max(100).optional(),
  language: z.string().max(100).optional(),
  notify: z.enum(["email", "sms", "both"]).default("email"),
});

// POST /api/contacts
export const POST = withAuth(
  withRole("EDITOR", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
    }

    const { email, ...rest } = parsed.data;
    const contact = await prisma.contact.create({
      data: { ...rest, email: email || null, organizationId: req.user.orgId },
      select: contactSelect,
    });

    await auditLog(req.user.sub, "contact.create", contact.id);

    return NextResponse.json({ contact }, { status: 201 });
  })
);
