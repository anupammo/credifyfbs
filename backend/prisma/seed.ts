import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organization.upsert({
    where: { slug: "credify" },
    update: {},
    create: {
      name: "Credify",
      slug: "credify",
    },
  });

  const adminHash = await bcrypt.hash("admin1234!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@credify.internal" },
    update: {},
    create: {
      email: "admin@credify.internal",
      name: "Admin User",
      passwordHash: adminHash,
      role: Role.ADMIN,
      organizationId: org.id,
    },
  });

  const editorHash = await bcrypt.hash("editor1234!", 12);
  await prisma.user.upsert({
    where: { email: "editor@credify.internal" },
    update: {},
    create: {
      email: "editor@credify.internal",
      name: "Editor User",
      passwordHash: editorHash,
      role: Role.EDITOR,
      organizationId: org.id,
    },
  });

  console.log("Seed complete.");
  console.log(`  Org:   ${org.name} (${org.id})`);
  console.log(`  Admin: ${admin.email} / admin1234!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
