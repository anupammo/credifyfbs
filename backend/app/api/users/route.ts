import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { withAuth } from "@/lib/middleware/withAuth";
import { withRole } from "@/lib/middleware/withRole";
import { auditLog } from "@/lib/audit";
import { dataLimiter } from "@/lib/rateLimit";
import type { AuthedRequest } from "@/lib/middleware/withAuth";

// GET /api/users — Admin only
export const GET = withAuth(
  withRole("ADMIN", async (req: AuthedRequest) => {
    const limited = dataLimiter(req);
    if (limited) return limited;

    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "25")));

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { organizationId: req.user.orgId, deletedAt: null },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "asc" },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
      }),
      prisma.user.count({ where: { organizationId: req.user.orgId, deletedAt: null } }),
    ]);

    return NextResponse.json({ users, total, page, limit });
  })
);

const inviteSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).default("EDITOR"),
  password: z.string().min(8),
});

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

    const passwordHash = await hashPassword(parsed.data.password);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name,
        role: parsed.data.role,
        passwordHash,
        organizationId: req.user.orgId,
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    await auditLog(req.user.sub, "user.invite", user.id, { email: user.email });

    return NextResponse.json({ user }, { status: 201 });
  })
);
