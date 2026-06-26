import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

// Fields returned to the client — basics + the Manage-Users profile fields.
const userSelect = {
  id: true, email: true, name: true, role: true, active: true,
  firstName: true, lastName: true, preferredName: true,
  phone: true, mobile: true, title: true, company: true,
  division: true, employeeNumber: true, costCenter: true,
  timeZone: true, language: true, createdAt: true,
} as const;

// Minimal roster fields — enough to populate the form-sharing picker. Non-admins
// get only this (no profile/PII beyond name+email); admins get the full profile.
const rosterSelect = {
  id: true, email: true, name: true, role: true, active: true,
} as const;

// GET /api/users — any signed-in org member (needed to share forms with
// teammates). Admins receive the full profile; everyone else the basic roster.
export const GET = withAuth(async (req: AuthedRequest) => {
  const limited = dataLimiter(req);
  if (limited) return limited;

  const isAdmin = req.user.role === "ADMIN";
  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "25")));

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where: { organizationId: req.user.orgId, deletedAt: null },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "asc" },
      select: isAdmin ? userSelect : rosterSelect,
    }),
    prisma.user.count({ where: { organizationId: req.user.orgId, deletedAt: null } }),
  ]);

  return NextResponse.json({ users, total, page, limit });
});

const inviteSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).default("EDITOR"),
  // Password is OPTIONAL. When omitted, a temporary password is generated and
  // returned ONCE so the inviting admin can hand it to the new user (the backend
  // has no mailer configured yet — wiring an email provider is a drop-in later).
  password: z.string().min(8).optional(),
  // Profile fields (all optional).
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  preferredName: z.string().max(100).optional(),
  phone: z.string().max(40).optional(),
  mobile: z.string().max(40).optional(),
  title: z.string().max(100).optional(),
  company: z.string().max(150).optional(),
  division: z.string().max(100).optional(),
  employeeNumber: z.string().max(100).optional(),
  costCenter: z.string().max(100).optional(),
  timeZone: z.string().max(100).optional(),
  language: z.string().max(100).optional(),
  active: z.boolean().optional(),
});

// A readable, reasonably strong temporary password (no ambiguous chars).
function generateTempPassword(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = crypto.randomBytes(14);
  let out = "";
  for (let i = 0; i < bytes.length; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

// POST /api/users — Admin only
export const POST = withAuth(
  withRole("ADMIN", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const body = await req.json().catch(() => null);
    const parsed = inviteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR", issues: parsed.error.issues }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use", code: "EMAIL_CONFLICT" }, { status: 409 });
    }

    const { password, ...profile } = parsed.data;
    const tempPassword = password ? null : generateTempPassword();
    const passwordHash = await hashPassword(password ?? (tempPassword as string));

    const user = await prisma.user.create({
      data: { ...profile, passwordHash, organizationId: req.user.orgId },
      select: userSelect,
    });

    await auditLog(req.user.sub, "user.invite", user.id, { email: user.email });

    // tempPassword is only present when the admin didn't supply one; surface it
    // once so the new user can sign in (until an email/set-password flow exists).
    return NextResponse.json({ user, tempPassword }, { status: 201 });
  })
);
