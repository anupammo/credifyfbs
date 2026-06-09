-- Seed Organization
INSERT INTO "Organization" (id, name, slug, "createdAt", "updatedAt")
VALUES ('org_credify', 'Credify', 'credify', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Seed Admin User
INSERT INTO "User" (id, email, name, "passwordHash", role, "organizationId", "createdAt", "updatedAt")
VALUES (
  'user_admin',
  'admin@credify.internal',
  'Admin User',
  '$2a$12$U51BmZ6hWgeCyAnVcfaaI.b2BmRH9YCczEFgDxrB5TZzNQ06f3.7G',
  'ADMIN',
  'org_credify',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Seed Editor User
INSERT INTO "User" (id, email, name, "passwordHash", role, "organizationId", "createdAt", "updatedAt")
VALUES (
  'user_editor',
  'editor@credify.internal',
  'Editor User',
  '$2a$12$U51BmZ6hWgeCyAnVcfaaI.b2BmRH9YCczEFgDxrB5TZzNQ06f3.7G',
  'EDITOR',
  'org_credify',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
