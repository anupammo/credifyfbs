import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function auditLog(
  userId: string,
  action: string,
  entityId?: string,
  meta?: Record<string, unknown>,
  formId?: string
) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entityId: entityId ?? null,
      meta: meta ? (meta as Prisma.InputJsonValue) : Prisma.JsonNull,
      formId: formId ?? null,
    },
  });
}
