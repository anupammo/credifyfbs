-- Manual migration: NotificationLog table (submission-notification delivery audit).
-- Applied by hand because the pinned Prisma CLI can't `migrate` against this
-- datasource url (see README §Prisma / builder-backend-deploy notes). `prisma
-- generate` (run during the container build) picks up the model for the client;
-- this SQL creates the actual table. Idempotent via IF NOT EXISTS.
--
-- Run on the VM:
--   sudo docker exec -i docker-postgres-1 psql -U credify -d credify < backend/prisma/migrations-manual/notification_log.sql

CREATE TABLE IF NOT EXISTS "NotificationLog" (
  "id"             TEXT NOT NULL,
  "submissionId"   TEXT,
  "formId"         TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "channel"        TEXT NOT NULL,
  "recipient"      TEXT NOT NULL,
  "status"         TEXT NOT NULL,
  "error"          TEXT,
  "createdAt"      TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "NotificationLog_formId_idx" ON "NotificationLog" ("formId");
CREATE INDEX IF NOT EXISTS "NotificationLog_submissionId_idx" ON "NotificationLog" ("submissionId");
