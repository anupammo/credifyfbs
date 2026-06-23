-- AlterTable: add Manage-Users profile fields
ALTER TABLE "User"
  ADD COLUMN "firstName" TEXT,
  ADD COLUMN "lastName" TEXT,
  ADD COLUMN "preferredName" TEXT,
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "mobile" TEXT,
  ADD COLUMN "title" TEXT,
  ADD COLUMN "company" TEXT,
  ADD COLUMN "division" TEXT,
  ADD COLUMN "employeeNumber" TEXT,
  ADD COLUMN "costCenter" TEXT,
  ADD COLUMN "timeZone" TEXT,
  ADD COLUMN "language" TEXT,
  ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable: Contact Directory
CREATE TABLE "Contact" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "preferredName" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "mobile" TEXT,
  "title" TEXT,
  "company" TEXT,
  "dob" TEXT,
  "mrn" TEXT,
  "timeZone" TEXT,
  "language" TEXT,
  "notify" TEXT NOT NULL DEFAULT 'email',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),

  CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_organizationId_idx" ON "Contact"("organizationId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
