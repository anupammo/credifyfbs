# Credify · Form Builder Studio

> **Internal Team Tool** — Behavioral health intake form builder with weights, scoring sections, conditional logic, and multi-user access control.

[![Branch](https://img.shields.io/badge/branch-v4.4-2ea44f)](./app.html)
[![Frontend](https://img.shields.io/badge/frontend-Single--file_HTML%2FJS-f7df1e)](./app.html)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](./backend)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6)](./backend)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748)](./backend/prisma)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](./backend/prisma)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ed)](./docker)
[![nginx](https://img.shields.io/badge/nginx-1.24-009639)](./docker/nginx)
[![Deploy](https://img.shields.io/badge/deploy-GCP_VM-4285f4)](#11-docker--gcp-deployment)
[![Auth](https://img.shields.io/badge/auth-JWT_%2B_cookie_SSO-orange)](#9-authentication-flow)
[![License](https://img.shields.io/badge/license-Internal_Use_Only-red)](#)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current State — Webapp](#2-current-state--webapp)
3. [Target Architecture — v1.1 Full Stack](#3-target-architecture--v11-full-stack)
4. [Tech Stack & Rationale](#4-tech-stack--rationale)
5. [Repository Structure](#5-repository-structure)
6. [Data Model](#6-data-model)
7. [API Design](#7-api-design)
8. [Security & Encryption Strategy](#8-security--encryption-strategy)
9. [Authentication Flow](#9-authentication-flow)
10. [Webapp ↔ Backend Integration](#10-webapp--backend-integration)
11. [Docker & GCP Deployment](#11-docker--gcp-deployment)
12. [Development Quickstart](#12-development-quickstart)
13. [Environment Variables](#13-environment-variables)
14. [Roadmap](#14-roadmap)

---

## 1. Project Overview

**Credify Form Builder Studio** is an internal **webapp** used by the Credify team to design, version, and distribute behavioral health intake forms (e.g., PHQ-9, GAD-7, custom intake sheets). It runs standalone at **forms.credifyfast.com** (nginx → `app.html`). It supports:

- **Drag-and-drop form building** with 12-column grid layout
- **Multi-page forms** with page-level skip logic
- **Weighted scoring sections** and severity band definitions
- **Conditional field visibility** (branching / skip logic)
- **Role-based access control** — Admin, Editor, Viewer
- **Form sharing** within the team
- **Export** to JSON, HTML, and PDF

The builder ships as a **webapp**: `app.html` is served standalone over HTTPS and runs on `localStorage` + the backend API. The original v1.0 **Chrome-extension packaging** (a popup-window launcher that hosted `app.html`) is **retired and archived under [`legacy/chrome-extension/`](./legacy/chrome-extension/)**; a separate *external* extension may be added later to enhance — not host — the webapp. **v1.1** added a centralised PostgreSQL backend with real authentication, end-to-end encryption, and GCP deployment — enabling true team collaboration, audit logging, and data governance compliance.

> ### 🆕 v4 (current branch) — New Prototype UI + Live Backend Wiring
> The builder has been rebuilt on the new **merged design prototype** — a superset of the
> previous builder (System Forms library, bundles/packets, reports, contacts directory,
> delivery channels, cross-form autofill, expanded field types, filled-PDF export, undo/redo,
> field numbering, device-adaptive date/time & searchable pickers) — and the production
> backend is now **wired directly into `app.html`** through `window.CredifyAPI` (JWT auth,
> offline-first sync). A top-right **account bar** (Alerts · Responses · Admin · Sign out) was
> added. See [§10 Integration](#10-webapp--backend-integration) and the
> **v4** entry in [§14 Roadmap](#14-roadmap) for the full change log.

---

## 2. Current State — Webapp

### How it works

The builder is a **webapp**: nginx serves the single-file `app.html` standalone over
HTTPS at `forms.credifyfast.com`. It boots offline-first against `localStorage` and
syncs through the backend API when signed in. There is **no extension host, no
sandbox, and no storage bridge** — `app.html` detects its environment via
`isWebApp()` and uses `localStorage` + `fetch` directly.

```
Browser → https://forms.credifyfast.com/
      │
      ▼
nginx (static)  →  app.html
      │
      ├─ localStorage  (working store, offline cache)
      └─ fetch → https://chrome.credifyfast.com/api  (sync when signed in)
```

**Auth:** on the web, an unauthenticated load redirects to `login.credifyfast.com`
(SSO), which redirects back with a JWT. See [§9](#9-authentication-flow).

### File Map

| File | Role |
|------|------|
| `app.html` | Complete form builder UI — styles + HTML + JavaScript (~22 000 lines); served standalone |
| `fill.html` | Public patient fill page (`/f/<token>`) |
| `errors/` | Branded 404 / 403 / 50x pages (nginx `error_page`) |
| `favicon.ico`, `icon.png`, `apple-icon.png` | Webapp icons |
| `deploy.sh` | One-command VM deploy (publishes `app.html`, refreshes the `index.html` symlink) |

> **Legacy:** the original v1.0 **Chrome-extension launcher** (`manifest.json`,
> `background.js`, `newtab.html`, `newtab.js`, `icons/`) is archived under
> [`legacy/chrome-extension/`](./legacy/chrome-extension/). It is no longer shipped.

### v1.0 Data model (localStorage keys)

| Key | Value |
|-----|-------|
| `credify_ls` | _(legacy)_ outer envelope the old extension's `newtab.js` wrote to `chrome.storage.local`; unused by the webapp |
| `credify_forms_v2` | `Form[]` — full form definitions with JSONB-style schemas |
| `credify_users_v1` | `User[]` — team roster with roles (seeded; no real auth) |
| `credify_current_user_v1` | Active user ID string |
| `credify_form_blocks_v1` | `Block[]` — saved reusable field groups |
| `credify_groups_v1` | `Group[]` — form folder/grouping metadata |
| `credify_last_form_v2` | Last opened form ID |

---

## 3. Target Architecture — v1.1 Full Stack

### High-level diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       GCP Project                               │
│                                                                 │
│   ┌──────────────────────┐     ┌────────────────────────────┐  │
│   │   Webapp (browser)   │     │    Cloud Run Service       │  │
│   │   forms.credifyfast  │────▶│    Next.js 16 App Router   │  │
│   │                      │HTTPS│    (API Routes only)       │  │
│   │  app.html            │     │                            │  │
│   │  └─ CredifyAPI       │     │  /api/auth/**              │  │
│   │  └─ TokenStore       │◀────│  /api/forms/**             │  │
│   │                      │JWT  │  /api/users/**             │  │
│   │  localStorage        │     │  /api/groups/**            │  │
│   │  (offline cache)     │     │  /api/blocks/**            │  │
│   └──────────────────────┘     └────────────┬───────────────┘  │
│                                             │ Prisma ORM        │
│                                             ▼                   │
│                                ┌────────────────────────────┐  │
│                                │   Cloud SQL (PostgreSQL 16) │  │
│                                │   + pgcrypto extension      │  │
│                                └────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────┐     ┌────────────────────────────┐  │
│   │  Artifact Registry   │     │   Secret Manager           │  │
│   │  (Docker images)     │     │   (DB URL, JWT secret,     │  │
│   └──────────────────────┘     │    AES master key, etc.)   │  │
│                                └────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Layered architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 1 · Webapp (Presentation)                                │
│  app.html builder UI — served standalone; API-backed persistence │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2 · API Gateway (Next.js App Router)                     │
│  REST routes, request validation (Zod), rate limiting           │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3 · Business Logic                                       │
│  Auth, RBAC enforcement, form schema validation, scoring rules  │
├─────────────────────────────────────────────────────────────────┤
│  Layer 4 · Data Access (Prisma ORM)                             │
│  Type-safe queries, migrations, connection pooling (PgBouncer)  │
├─────────────────────────────────────────────────────────────────┤
│  Layer 5 · Storage (PostgreSQL 16 + pgcrypto)                   │
│  Relational tables, JSONB form schemas, encrypted sensitive data │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Tech Stack & Rationale

> This reflects **what is actually running today**. The original design targeted managed
> GCP services (Cloud Run / Cloud SQL / Secret Manager / CMEK); current production instead
> runs on a single **GCP Compute Engine VM** with Docker + nginx — those managed services
> are listed under **Planned** below and in [§11](#11-docker--gcp-deployment).

### Frontend — builder & patient fill

| Tech | Used for |
|------|----------|
| **Vanilla HTML / CSS / JS** — single-file `app.html` (~22k lines, no framework) | The entire Form Builder UI; inline `<style>` + `<script>`, stable `id`/`name` hooks for backend mapping |
| **`fill.html`** | Lightweight **public patient fill page** (`/f/<token>`) — renders the form in an isolated iframe, no SSO gate |
| **Branded error pages** — `errors/404|403|50x.html` | nginx `error_page` targets (forest-green theme) |
| **Instrument Serif + Sora** (Google Fonts) | Brand typography — serif headings / sans body |
| **html2pdf.bundle** | Filled-PDF export |
| **qrcodejs** (cdnjs) | QR codes for patient share links |
| **MV3 Chrome Extension** _(legacy)_ — archived in `legacy/chrome-extension/` | Original v1.0 packaging (sandboxed `app.html`); retired — the webapp now serves the same file standalone |

### Backend API

| Tech | Version | Why |
|------|---------|-----|
| **Next.js** (App Router, API routes only) | 16.2 | TypeScript-first, easy Docker packaging, no Express boilerplate |
| **TypeScript** | 5.4 | End-to-end type safety |
| **Prisma ORM** (+ `@prisma/client`) | 5.22 | Type-safe queries, migrations, `binaryTargets` for Alpine. ⚠️ A stray `npx prisma` pulls Prisma **7**, which rejects the `datasource url` in `schema.prisma` — run the pinned 5.22 (or move the url to `prisma.config.ts`) |
| **Zod** | 3.23 | Runtime request validation at the API boundary |
| **ESLint 9 · Jest 29 · ts-node** | — | Lint · tests · `db:seed` runner |

### Auth, security & crypto

| Tech | Used for |
|------|----------|
| **JWT** (`jsonwebtoken` 9) | Builder-API access tokens (HS256) + rotating refresh tokens — **custom, not NextAuth** |
| **bcryptjs** | Password hashing |
| **credify-login** — separate Next.js app (`login.credifyfast.com`, repo `anupammo/credify-login`) | The **SSO authority** — NextAuth + Google OAuth; issues the shared `.credifyfast.com` `credify_token` cookie |
| **Shared-cookie SSO + credentialed CORS** | `forms` / `chrome` / `login` subdomains trust one session; backend `withAuth` validates the cookie (`CREDIFY_LOGIN_JWT_SECRET`) and provisions users by email |
| **AES-256-GCM** (Node `crypto`) | **App-level at-rest encryption** of form schemas, share-link HTML, and submission answers (`encryptSchema`) — not pgcrypto |
| **HMAC-SHA256** | Payload signing on write endpoints |
| **RBAC** (`withAuth` + `withRole`) | ADMIN / EDITOR / VIEWER enforcement |
| **Sliding-window rate limiting** | 100 req/min auth · 500 req/min data |

### Data

| Tech | Used for |
|------|----------|
| **PostgreSQL 16** (`postgres:16-alpine`) | Primary store — `JSONB` for scoring/blocks, `BYTEA` for AES ciphertext |
| **Models** | Organization, User, Form, Group, Block, FormShare, AuditLog, RefreshToken, **ShareLink**, **Submission** |

### Infrastructure — current production (GCP VM)

| Tech | Used for |
|------|----------|
| **GCP Compute Engine VM** (Ubuntu) | Single host running everything |
| **Docker + Docker Compose** | `docker-backend-1` (Next.js API → `:3000`) and `docker-postgres-1` (Postgres) |
| **nginx 1.24** | TLS termination · reverse proxy (`chrome.` → `:3000`) · static hosting (`forms.`) · error pages · `/f/` routing |
| **pm2** | Runs `credify-login` (`login.credifyfast.com`) |
| **Certbot / Let's Encrypt** | Wildcard `*.credifyfast.com` TLS (1.2 / 1.3) |
| **`.env` files on host** | Secrets — `DATABASE_URL`, JWT / AES / HMAC keys, `CREDIFY_LOGIN_JWT_SECRET` |

### Infrastructure — planned (managed GCP, see [§11](#11-docker--gcp-deployment))

Cloud Run (serverless compute) · Cloud SQL (managed Postgres) · Artifact Registry · Secret Manager · CMEK · GitHub Actions CI/CD (`deploy.yml`).

### Domains

| Host | Serves | Runs on |
|------|--------|---------|
| `forms.credifyfast.com` | Builder (`app.html`/`index.html`) + patient fill (`fill.html`) | nginx static |
| `chrome.credifyfast.com` | Builder REST API (`/api/**`) | nginx → Docker `:3000` |
| `login.credifyfast.com` | SSO — login / Google OAuth / session | pm2 (credify-login) |

### Local dev

Git / GitHub (`anupammo/credifyfbs`, `anupammo/credify-login`) · **XAMPP** (Windows — serves `app.html` locally) · Node 20 · PostgreSQL 16.

---

## 5. Repository Structure

```
credifyfbs/
│
├── app.html                     # Full form builder UI (~22 000 lines) — the webapp, served standalone
├── fill.html                    # v4.1 public patient fill page (/f/<token>)
├── errors/                      # v4.1 branded 404 / 403 / 50x pages (nginx error_page)
├── deploy.sh                    # one-command VM deploy + status/logs/db helpers
├── .gitattributes               # force LF on *.sh so deploy.sh runs on the Linux VM
├── favicon.ico / icon.png / apple-icon.png   # webapp icons
│
├── legacy/
│   └── chrome-extension/        # ARCHIVED v1.0 MV3 launcher (retired — not shipped)
│       ├── manifest.json        #   MV3 config
│       ├── background.js        #   service worker — opened the app popup
│       ├── newtab.html / newtab.js  #   host page + chrome.storage↔localStorage bridge
│       ├── icons/               #   extension toolbar icons (16/48/128)
│       └── README.md            #   what it was + how it worked
│
├── backend/                     # ✅ v1.1 Next.js 16 API backend (scaffolded)
│   ├── app/api/
│   │   ├── auth/
│   │   │   ├── login/route.ts   # POST — email + password → JWT tokens
│   │   │   ├── logout/route.ts  # POST — revoke refresh token
│   │   │   ├── refresh/route.ts # POST — rotate access + refresh tokens
│   │   │   └── me/route.ts      # GET  — current user profile
│   │   ├── forms/
│   │   │   ├── route.ts         # GET list (paginated), POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts     # GET, PUT, DELETE (soft)
│   │   │       └── share/route.ts # GET/POST/DELETE shares
│   │   ├── users/
│   │   │   ├── route.ts         # GET list (admin), POST invite
│   │   │   └── [id]/route.ts    # PUT role/name, DELETE (soft)
│   │   ├── groups/
│   │   │   ├── route.ts         # GET, POST
│   │   │   └── [id]/route.ts    # PUT, DELETE
│   │   ├── blocks/
│   │   │   ├── route.ts         # GET, POST
│   │   │   └── [id]/route.ts    # PUT, DELETE
│   │   ├── contacts/            # v4.1 Contact Directory (DB-backed)
│   │   │   ├── route.ts         # GET, POST
│   │   │   └── [id]/route.ts    # PUT, DELETE (soft)
│   │   └── links/               # v4.1 public form share links
│   │       └── [token]/
│   │           ├── route.ts        # GET (public: resolve token → form)
│   │           ├── submit/route.ts # POST (public: store encrypted submission)
│   │           └── revoke/route.ts # POST (auth: revoke)
│   ├── lib/
│   │   ├── db.ts                # Prisma singleton (dev hot-reload safe)
│   │   ├── audit.ts             # auditLog() helper
│   │   ├── rateLimit.ts         # Sliding-window rate limiter
│   │   ├── auth/
│   │   │   ├── jwt.ts           # signAccessToken / rotateRefreshToken
│   │   │   └── password.ts      # bcrypt hash / verify (cost 12)
│   │   ├── crypto/
│   │   │   ├── aes.ts           # AES-256-GCM encrypt / decrypt
│   │   │   └── hmac.ts          # HMAC-SHA256 payload signing
│   │   └── middleware/
│   │       ├── withAuth.ts      # JWT Bearer verification
│   │       └── withRole.ts      # RBAC guard (VIEWER / EDITOR / ADMIN)
│   ├── prisma/
│   │   ├── schema.prisma        # Full DB schema (all models + enums)
│   │   ├── seed.ts              # Seeds org + admin + editor users
│   │   ├── migrations/          # ✅ 20260603215510_init applied
│   │   └── tsconfig.seed.json   # ts-node config for seed script
│   ├── .env                     # ✅ Generated secrets (gitignored)
│   ├── .env.example             # Template for new devs
│   ├── .gitignore
│   ├── Dockerfile               # Multi-stage: deps → build → runner
│   ├── .dockerignore
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json             # Next.js 16, Prisma 5, bcryptjs, zod
│
├── docker/
│   ├── docker-compose.dev.yml   # Postgres 16 + backend (Docker optional)
│   └── docker-compose.prod.yml  # Production-parity smoke-test
│
├── infra/                       # GCP provisioning (optional Terraform)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD: test → build → push → Cloud Run
│
└── README.md                    # ← you are here
```

---

## 6. Data Model

### Entity Relationship Overview

> Generated from [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma) — GitHub renders the Mermaid diagram below automatically. Multi-tenant: every table is scoped by `organizationId`.

```mermaid
erDiagram
    Organization ||--o{ User         : "has"
    Organization ||--o{ Form         : "has"
    Organization ||--o{ Group        : "has"
    Organization ||--o{ Block        : "has"
    User         ||--o{ Form         : "owns (ownerId)"
    User         ||--o{ FormShare    : "granted"
    User         ||--o{ RefreshToken : "issued"
    User         ||--o{ AuditLog     : "performs"
    Group        |o--o{ Form         : "groups"
    Form         ||--o{ FormShare    : "shared via"
    Form         |o--o{ AuditLog     : "references"
    Form         ||--o{ ShareLink    : "shared as (v4.1)"
    Form         ||--o{ Submission   : "receives (v4.1)"
    ShareLink    |o--o{ Submission   : "collected via"

    Organization {
        string   id PK
        string   name
        string   slug UK
        datetime createdAt
        datetime updatedAt
    }
    User {
        string   id PK
        string   email UK
        string   name
        string   passwordHash
        enum     role "ADMIN|EDITOR|VIEWER"
        string   organizationId FK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt "nullable (soft delete)"
    }
    RefreshToken {
        string   id PK
        string   tokenHash UK
        string   userId FK
        datetime expiresAt
        datetime revokedAt "nullable"
        datetime createdAt
    }
    Form {
        string   id PK
        string   title
        string   description "nullable"
        bytes    schemaEnc "AES-256-GCM JSON"
        string   schemaIv
        string   schemaTag
        string   ownerId FK
        string   organizationId FK
        string   groupId FK "nullable"
        json     scoringSections
        datetime createdAt
        datetime updatedAt
        datetime deletedAt "nullable (soft delete)"
    }
    FormShare {
        string id PK
        string formId FK
        string userId FK
        enum   access "EDIT|VIEW"
    }
    Group {
        string   id PK
        string   name
        string   color "nullable"
        string   organizationId FK
        datetime createdAt
        datetime updatedAt
    }
    Block {
        string   id PK
        string   name
        json     fieldsJson
        string   organizationId FK
        datetime createdAt
        datetime updatedAt
    }
    AuditLog {
        string   id PK
        string   userId FK
        string   action
        string   entityId "nullable"
        json     meta "nullable"
        string   formId FK "nullable"
        datetime createdAt
    }
    ShareLink {
        string   id PK
        string   token UK "random, in /f/<token>"
        string   formId FK
        string   organizationId
        string   kind "public|single"
        string   label "nullable"
        bytes    htmlEnc "AES-256-GCM form HTML"
        string   htmlIv
        string   htmlTag
        datetime expiresAt "nullable"
        datetime revokedAt "nullable"
        datetime usedAt "nullable (single-use)"
        string   createdById
        datetime createdAt
    }
    Submission {
        string   id PK
        string   formId FK
        string   shareLinkId FK "nullable"
        string   organizationId
        bytes    dataEnc "AES-256-GCM answers (PHI)"
        string   dataIv
        string   dataTag
        datetime createdAt
    }
```

**Notes:** `User`↔`Form` is many-to-many resolved through `FormShare` (`@@unique([formId, userId])`). `Form.schemaEnc` holds the AES-256-GCM-encrypted builder JSON (`rows` / `weightGroups` / `style`); `scoringSections`, `Block.fieldsJson`, and `AuditLog.meta` are plaintext `jsonb`. `RefreshToken`, `FormShare`, `ShareLink`, and `Submission` cascade-delete with their parent `Form`. **v4.1 — public form sharing:** `ShareLink.htmlEnc` is the snapshotted fillable-form HTML and `Submission.dataEnc` is the patient's answers (PHI) — both AES-256-GCM encrypted at rest, exactly like `Form.schemaEnc`. `organizationId` on these two is a scalar (no FK) for lighter writes from the public endpoints.

A plain-text view of the same relationships:

```
organizations ──< users ──< forms ──< form_shares
                                 └──< scoring_sections
                                 └──< share_links ──< submissions   (v4.1)
                                 └──< submissions                   (v4.1)
                              └──< blocks
                         └──< groups ──< form_groups
                              └──< audit_logs
```

### Prisma Schema (key tables)

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  users     User[]
  forms     Form[]
  groups    Group[]
}

model User {
  id             String       @id @default(cuid())
  email          String       @unique
  name           String
  passwordHash   String       // bcrypt, never returned in API
  role           Role         @default(EDITOR)
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  ownedForms     Form[]       @relation("owner")
  sharedForms    FormShare[]
  auditLogs      AuditLog[]
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

model Form {
  id             String          @id @default(cuid())
  title          String
  description    String?
  // Schema is stored as encrypted JSONB — the raw builder JSON
  schemaEnc      Bytes           // AES-256-GCM encrypted JSON blob
  schemaIv       String          // GCM initialisation vector (hex)
  schemaTag      String          // GCM auth tag (hex)
  ownerId        String
  owner          User            @relation("owner", fields: [ownerId], references: [id])
  organizationId String
  organization   Organization    @relation(fields: [organizationId], references: [id])
  groupId        String?
  group          Group?          @relation(fields: [groupId], references: [id])
  shares         FormShare[]
  shareLinks     ShareLink[]     // v4.1 public links
  submissions    Submission[]    // v4.1 patient responses
  scoringSections Json           // lightweight metadata (non-sensitive)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  deletedAt      DateTime?       // soft delete
}

model FormShare {
  id     String      @id @default(cuid())
  formId String
  form   Form        @relation(fields: [formId], references: [id])
  userId String
  user   User        @relation(fields: [userId], references: [id])
  access ShareAccess

  @@unique([formId, userId])
}

enum ShareAccess {
  EDIT
  VIEW
}

// v4.1 — public form sharing. token lives in /f/<token>; htmlEnc is the
// AES-256-GCM-encrypted fillable-form HTML snapshot served to the patient.
model ShareLink {
  id             String       @id @default(cuid())
  token          String       @unique
  formId         String
  form           Form         @relation(fields: [formId], references: [id], onDelete: Cascade)
  organizationId String
  kind           String       @default("public") // "public" | "single"
  label          String?
  htmlEnc        Bytes
  htmlIv         String
  htmlTag        String
  expiresAt      DateTime?
  revokedAt      DateTime?
  usedAt         DateTime?
  createdById    String
  createdAt      DateTime     @default(now())
  submissions    Submission[]

  @@index([formId])
  @@index([organizationId])
}

// v4.1 — a filled response. dataEnc is the AES-256-GCM-encrypted answers (PHI).
model Submission {
  id             String     @id @default(cuid())
  formId         String
  form           Form       @relation(fields: [formId], references: [id], onDelete: Cascade)
  shareLinkId    String?
  shareLink      ShareLink? @relation(fields: [shareLinkId], references: [id])
  organizationId String
  dataEnc        Bytes
  dataIv         String
  dataTag        String
  createdAt      DateTime   @default(now())

  @@index([formId])
  @@index([shareLinkId])
}

model Group {
  id             String       @id @default(cuid())
  name           String
  color          String?
  organizationId String
  organization   Organization @relation(fields: [organizationId], references: [id])
  forms          Form[]
  createdAt      DateTime     @default(now())
}

model Block {
  id             String   @id @default(cuid())
  name           String
  fieldsJson     Json     // reusable field group schema
  organizationId String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  action    String   // e.g. "form.create", "form.delete", "user.invite"
  entityId  String?
  meta      Json?
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([entityId])
}
```

### PostgreSQL Database Structure

**Connection Details (Production)**
```
Host: 35.255.131.130   (container: docker-postgres-1)
Port: 5434 on the host → 5432 in the container
Database: credify
User: credify
```

**Tables Overview**

| Table | Description | Row Count |
|-------|-------------|-----------|
| `Organization` | Multi-tenant org/workspace | 1+ |
| `User` | Team members with roles | 2+ |
| `RefreshToken` | JWT refresh token hashes | varies |
| `Form` | Encrypted form definitions | varies |
| `FormShare` | User-form access grants | varies |
| `Group` | Form folders/categories | varies |
| `Block` | Reusable field templates | varies |
| `AuditLog` | Activity tracking | varies |
| `ShareLink` | Public form-share tokens + encrypted HTML snapshot (v4.1) | varies |
| `Submission` | Encrypted patient form responses / PHI (v4.1) | varies |
| `_prisma_migrations` | Schema version tracking | 1+ |

**Table Schemas**

```sql
-- Enums
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');
CREATE TYPE "ShareAccess" AS ENUM ('EDIT', 'VIEW');

-- Organization (multi-tenant root)
CREATE TABLE "Organization" (
    "id"        TEXT PRIMARY KEY,      -- cuid
    "name"      TEXT NOT NULL,
    "slug"      TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) DEFAULT now(),
    "updatedAt" TIMESTAMP(3)
);

-- User (team members)
CREATE TABLE "User" (
    "id"             TEXT PRIMARY KEY,
    "email"          TEXT NOT NULL UNIQUE,
    "name"           TEXT NOT NULL,
    "passwordHash"   TEXT NOT NULL,      -- bcrypt hash
    "role"           "Role" DEFAULT 'EDITOR',
    "organizationId" TEXT NOT NULL REFERENCES "Organization"("id"),
    "createdAt"      TIMESTAMP(3) DEFAULT now(),
    "updatedAt"      TIMESTAMP(3),
    "deletedAt"      TIMESTAMP(3)        -- soft delete
);

-- RefreshToken (JWT session management)
CREATE TABLE "RefreshToken" (
    "id"        TEXT PRIMARY KEY,
    "tokenHash" TEXT NOT NULL UNIQUE,    -- SHA-256 hash
    "userId"    TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT now()
);

-- Form (encrypted form definitions)
CREATE TABLE "Form" (
    "id"             TEXT PRIMARY KEY,
    "title"          TEXT NOT NULL,
    "description"    TEXT,
    "schemaEnc"      BYTEA NOT NULL,     -- AES-256-GCM encrypted JSON
    "schemaIv"       TEXT NOT NULL,      -- Initialization vector (hex)
    "schemaTag"      TEXT NOT NULL,      -- Auth tag (hex)
    "ownerId"        TEXT NOT NULL REFERENCES "User"("id"),
    "organizationId" TEXT NOT NULL REFERENCES "Organization"("id"),
    "groupId"        TEXT REFERENCES "Group"("id"),
    "scoringSections" JSONB DEFAULT '[]',
    "createdAt"      TIMESTAMP(3) DEFAULT now(),
    "updatedAt"      TIMESTAMP(3),
    "deletedAt"      TIMESTAMP(3)
);

-- FormShare (access control)
CREATE TABLE "FormShare" (
    "id"     TEXT PRIMARY KEY,
    "formId" TEXT NOT NULL REFERENCES "Form"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "access" "ShareAccess" NOT NULL,
    UNIQUE ("formId", "userId")
);

-- Group (form folders)
CREATE TABLE "Group" (
    "id"             TEXT PRIMARY KEY,
    "name"           TEXT NOT NULL,
    "color"          TEXT,
    "organizationId" TEXT NOT NULL REFERENCES "Organization"("id"),
    "createdAt"      TIMESTAMP(3) DEFAULT now(),
    "updatedAt"      TIMESTAMP(3)
);

-- Block (reusable field templates)
CREATE TABLE "Block" (
    "id"             TEXT PRIMARY KEY,
    "name"           TEXT NOT NULL,
    "fieldsJson"     JSONB NOT NULL,
    "organizationId" TEXT NOT NULL REFERENCES "Organization"("id"),
    "createdAt"      TIMESTAMP(3) DEFAULT now(),
    "updatedAt"      TIMESTAMP(3)
);

-- AuditLog (activity tracking)
CREATE TABLE "AuditLog" (
    "id"        TEXT PRIMARY KEY,
    "userId"    TEXT NOT NULL REFERENCES "User"("id"),
    "action"    TEXT NOT NULL,           -- e.g. "form.create"
    "entityId"  TEXT,
    "meta"      JSONB,
    "formId"    TEXT REFERENCES "Form"("id"),
    "createdAt" TIMESTAMP(3) DEFAULT now()
);

-- ShareLink (v4.1 — public form-share tokens; htmlEnc = AES-256-GCM form HTML)
CREATE TABLE "ShareLink" (
    "id"             TEXT PRIMARY KEY,
    "token"          TEXT NOT NULL UNIQUE,   -- the value in /f/<token>
    "formId"         TEXT NOT NULL REFERENCES "Form"("id") ON DELETE CASCADE,
    "organizationId" TEXT NOT NULL,          -- scalar (no FK)
    "kind"           TEXT NOT NULL DEFAULT 'public',  -- 'public' | 'single'
    "label"          TEXT,
    "htmlEnc"        BYTEA NOT NULL,
    "htmlIv"         TEXT NOT NULL,
    "htmlTag"        TEXT NOT NULL,
    "expiresAt"      TIMESTAMP(3),
    "revokedAt"      TIMESTAMP(3),
    "usedAt"         TIMESTAMP(3),           -- set when a single-use link is filled
    "createdById"    TEXT NOT NULL,
    "createdAt"      TIMESTAMP(3) DEFAULT now()
);

-- Submission (v4.1 — patient responses; dataEnc = AES-256-GCM answers, PHI)
CREATE TABLE "Submission" (
    "id"             TEXT PRIMARY KEY,
    "formId"         TEXT NOT NULL REFERENCES "Form"("id") ON DELETE CASCADE,
    "shareLinkId"    TEXT REFERENCES "ShareLink"("id") ON DELETE SET NULL,
    "organizationId" TEXT NOT NULL,          -- scalar (no FK)
    "dataEnc"        BYTEA NOT NULL,
    "dataIv"         TEXT NOT NULL,
    "dataTag"        TEXT NOT NULL,
    "createdAt"      TIMESTAMP(3) DEFAULT now()
);
```

**Indexes**

```sql
CREATE INDEX ON "User"("organizationId");
CREATE INDEX ON "User"("email");
CREATE INDEX ON "RefreshToken"("userId");
CREATE INDEX ON "Form"("organizationId");
CREATE INDEX ON "Form"("ownerId");
CREATE INDEX ON "Form"("groupId");
CREATE INDEX ON "FormShare"("userId");
CREATE INDEX ON "Group"("organizationId");
CREATE INDEX ON "Block"("organizationId");
CREATE INDEX ON "AuditLog"("userId");
CREATE INDEX ON "AuditLog"("entityId");
CREATE UNIQUE INDEX ON "ShareLink"("token");
CREATE INDEX ON "ShareLink"("formId");
CREATE INDEX ON "ShareLink"("organizationId");
CREATE INDEX ON "Submission"("formId");
CREATE INDEX ON "Submission"("shareLinkId");
```

**Useful Queries**

```bash
# Connect via Docker
docker exec docker-postgres-1 psql -U credify -d credify

# List all tables
\dt

# View table structure
\d "User"

# Count rows in all tables
SELECT schemaname, relname, n_live_tup FROM pg_stat_user_tables;

# View all users
SELECT id, email, name, role FROM "User";

# View all forms
SELECT id, title, "ownerId", "createdAt" FROM "Form" WHERE "deletedAt" IS NULL;
```

---

## 7. API Design

### Conventions

- All endpoints under `/api/`
- JSON request/response bodies
- Authentication via `Authorization: Bearer <access_token>` header
- Error responses follow `{ error: string, code: string }` shape
- Pagination: `?page=1&limit=25` query params

### Endpoint Reference

#### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/auth/login` | — | Email + password → `{ accessToken, refreshToken, user }` |
| `POST` | `/api/auth/logout` | ✓ | Revoke refresh token |
| `POST` | `/api/auth/refresh` | refresh token | Rotate access + refresh tokens |
| `GET` | `/api/auth/me` | ✓ | Current user profile |

#### Forms

| Method | Path | Role | Description |
|--------|------|------|-------------|
| `GET` | `/api/forms` | Editor+ | List accessible forms (paginated, searchable) |
| `POST` | `/api/forms` | Editor+ | Create form — body: `{ title, description, schema }` |
| `GET` | `/api/forms/:id` | shared view | Get form (schema decrypted server-side) |
| `PUT` | `/api/forms/:id` | owner / editor share / admin | Full update |
| `DELETE` | `/api/forms/:id` | owner / admin | Soft delete |
| `GET` | `/api/forms/:id/share` | owner / admin | List shares |
| `POST` | `/api/forms/:id/share` | owner / admin | Add / update share |
| `DELETE` | `/api/forms/:id/share/:userId` | owner / admin | Revoke share |

#### Share links & submissions (v4.1)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/forms/:id/links` | owner / editor / admin | Create a share link — body `{ kind, html, label?, expiresInDays? }` → `{ token }` |
| `GET` | `/api/forms/:id/links` | owner / editor / admin | List a form's share links (with computed `status`) |
| `POST` | `/api/links/:token/revoke` | owner / editor / admin | Revoke a link (accepts the link id or token) |
| `GET` | `/api/links/:token` | **public** | Resolve a token → the fillable form HTML (revoke/expiry/single-use checked) |
| `POST` | `/api/links/:token/submit` | **public** | Store an AES-encrypted submission — body `{ answers }` |

#### Users (Admin only)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/users` | List org users |
| `POST` | `/api/users` | Invite user (creates account, sends email) |
| `PUT` | `/api/users/:id` | Update role |
| `DELETE` | `/api/users/:id` | Remove user (soft) |

#### Groups, Blocks

| Method | Path | Description |
|--------|------|-------------|
| `GET/POST` | `/api/groups` | List / create groups |
| `PUT/DELETE` | `/api/groups/:id` | Update / delete group |
| `GET/POST` | `/api/blocks` | List / save blocks |
| `PUT/DELETE` | `/api/blocks/:id` | Update / delete block |

---

## 8. Security & Encryption Strategy

### 8.1 Transport Security

All traffic flows over **TLS 1.3** enforced by GCP Cloud Run's managed HTTPS endpoint. HTTP-to-HTTPS redirects are applied at the load-balancer level. No plain-text communication is permitted.

### 8.2 Authentication Tokens

```
Access Token   — JWT, RS256 signed, 15-minute TTL
                 Payload: { sub, email, role, orgId, iat, exp }

Refresh Token  — Opaque 256-bit random token, stored as bcrypt hash in DB
                 TTL: 30 days, single-use (rotation on every refresh)
                 Revocation: delete row or set revokedAt timestamp
```

The Chrome Extension stores tokens in `chrome.storage.local` (not accessible to page scripts). The service worker intercepts API calls and attaches the `Authorization` header automatically, refreshing when the access token is within 60 seconds of expiry.

### 8.3 Form Schema Encryption (At-Rest)

Each form's JSON schema is encrypted **before** the Prisma write using AES-256-GCM:

```
Plaintext  ──▶  AES-256-GCM encrypt  ──▶  schemaEnc (BYTEA)
                  ↑ per-form random IV        schemaIv  (HEX)
                  ↑ master key from            schemaTag (HEX)
                    GCP Secret Manager
```

- The **master AES key** lives in GCP Secret Manager, accessed by the Cloud Run service account only.
- Each form uses a **fresh random 96-bit IV** (GCM recommendation) stored alongside the ciphertext.
- On read, the server decrypts and returns the plain schema; the client never receives raw ciphertext.
- This protects form data even if the Cloud SQL instance is compromised (e.g. a snapshot leak).

### 8.4 Password Storage

User passwords are hashed with **bcrypt** (cost factor 12). Passwords are never logged, returned in API responses, or stored in plain text anywhere in the system.

### 8.5 API Request Integrity (HMAC Signing)

Sensitive write operations (`POST /api/forms`, `PUT /api/forms/:id`) include an `X-Credify-Signature` header:

```
HMAC-SHA256(requestBody, hmacSecret)
```

The server verifies the signature before processing. This defends against body tampering by a compromised extension or MITM attack that somehow bypasses TLS.

### 8.6 RBAC Enforcement

Permissions are evaluated at the **API layer** on every request — never trusted from the client:

```
Request ──▶ withAuth middleware (verify JWT)
         ──▶ withRole guard (check role from DB, not token claim)
         ──▶ resource-level check (canEdit / canView / canDelete)
         ──▶ handler
```

| Role | Create forms | Edit own | Edit shared | Delete | Admin users |
|------|:-----------:|:--------:|:-----------:|:------:|:-----------:|
| Admin | ✓ | ✓ | ✓ | ✓ | ✓ |
| Editor | ✓ | ✓ | if granted | — | — |
| Viewer | — | — | — | — | — |

### 8.7 Additional Hardening

- **Rate limiting**: 100 req/min per IP on auth endpoints, 500 req/min on data endpoints (via `@upstash/ratelimit` or custom middleware)
- **Input validation**: All request bodies validated with **Zod** schemas before reaching business logic
- **SQL injection**: Impossible — all DB access via **Prisma** parameterised queries
- **CORS**: Restricted to the extension's `chrome-extension://` origin
- **Audit logging**: Every create / update / delete / share action recorded in `audit_logs` with actor, timestamp, and changed entity ID
- **Soft deletes**: Forms and users are never hard-deleted (compliance / accidental-delete recovery)
- **GCP CMEK**: Cloud SQL configured with customer-managed encryption keys

---

## 9. Authentication Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                        LOGIN FLOW                                    │
│                                                                      │
│  User enters credentials in extension UI                             │
│       │                                                              │
│       ▼                                                              │
│  background.js  ──POST /api/auth/login──▶  Next.js handler          │
│  { email, password }                         │                       │
│                                              ▼                       │
│                                         bcrypt.compare(pw, hash)    │
│                                              │                       │
│                                         sign accessToken (RS256)    │
│                                         generate refreshToken       │
│                                         store hashed refreshToken   │
│                                              │                       │
│       ◀─────────{ accessToken, refreshToken, user }─────────────   │
│       │                                                              │
│  chrome.storage.local.set({ tokens })                               │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                      AUTHENTICATED REQUEST                           │
│                                                                      │
│  app.html calls credifyApi.get('/forms')                             │
│       │                                                              │
│       ▼                                                              │
│  background.js intercepts → checks token TTL                        │
│  [if exp < now + 60s] → POST /api/auth/refresh → new tokens        │
│  add Authorization: Bearer <accessToken>                             │
│  forward request to backend                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 10. Webapp ↔ Backend Integration

### Strategy

The webapp operates in a **hybrid, offline-first mode**:

1. **Online mode** — signed in (valid JWT) → data is pulled from the backend into localStorage on load and every form/block change is mirrored back to the API. localStorage remains the working store (offline cache).
2. **Offline mode** — "Work Offline" or no session → the builder runs entirely on localStorage; API calls are inert until the next sign-in.

### v4 implementation — `window.CredifyAPI` inside `app.html` (current)

The backend client lives **directly in `app.html`** rather than being mediated by a service worker. The API responds with permissive CORS, so the webapp talks to the backend over HTTPS without any host-page relay.

**Boot & auth flow**
```
app.html loads
  ├─ CredifyAPI IIFE  → loads stored JWT from credify_auth_tokens
  ├─ builder boots offline-first against localStorage (instant render)
  └─ _credifyInit()
        ├─ signed in?  → loadDataFromAPI() → reloadFromLocalAndRender()  → "● Connected"
        └─ not signed? → show Login modal  → [Sign In]  or  [Work Offline] → "● Offline"
```

**Key bridge functions (in `app.html`)**

| Function | Role |
|----------|------|
| `window.CredifyAPI` | JWT client: `login/logout/me/refresh` + CRUD for `forms/users/groups/blocks` + `shareForm` |
| `loadDataFromAPI()` | Pulls users/forms/groups/blocks into localStorage; hydrates the rich form shape by spreading the decrypted `schema` back onto each form |
| `saveFormToAPI()` | Debounced (2 s) save; serializes the **whole** form into the encrypted `schema` blob (+ separate `scoringSections`) so new field types / page rules / numbering / autofill round-trip with **no DB migration** |
| `reloadFromLocalAndRender()` | Re-reads collections after an API sync and re-opens the last/visible form |
| `_credifyInit` / `doLogin` / `loginOffline` / `doLogout` | Login gate + offline mode + session controls (the top-right **Sign out**) |

**Sync scope (Phase 1)** — Forms (create/update/delete) and Blocks (create/delete) write through to the API, with localStorage fallback when offline. Users/Groups/Shares are **pulled read-only** on login; full write-sync (server-id reconciliation, password-collecting invite UI) and backend tables for the new entities (Contacts, Reports, Bundles, Delivery, System-form overrides) are deferred to a later phase.

### ApiClient (background.js) — _legacy_ host-mediated sketch (superseded by the in-app client above; see `legacy/chrome-extension/`)

```javascript
// background.js — conceptual sketch
class ApiClient {
  constructor(baseUrl) { this.baseUrl = baseUrl; }

  async fetch(path, options = {}) {
    let token = await this.#getValidToken();
    const res = await fetch(this.baseUrl + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      }
    });
    if (res.status === 401) {
      token = await this.#refreshToken();
      // retry once with new token
    }
    return res.json();
  }
}
```

### localStorage Bridge — _legacy_ (extension only)

> This `postMessage` bridge applied **only** to the old Chrome-extension packaging
> (now archived in `legacy/chrome-extension/`). The webapp writes to `localStorage`
> directly and syncs via `window.CredifyAPI` — there is no bridge.

```
(legacy extension path)
app.html setItem() → postMessage → newtab.js → chrome.runtime.sendMessage
                                                → background.js ApiClient.put('/forms/:id')
```

---

## 11. Docker & GCP Deployment

> **Current production reality:** the app runs on a single **GCP Compute Engine VM** —
> `docker compose` (`docker-backend-1` API on `:3000` + `docker-postgres-1`), **nginx**
> reverse-proxy/static host, **pm2** for `credify-login`, and **Certbot** for TLS. The
> **Cloud Run / Cloud SQL / Artifact Registry** pipeline below is the documented **target**,
> not what's live today. **One-command deploy:** [`./deploy.sh`](./deploy.sh) on the VM does it all — `git` sync → publish the frontend to the web root → rebuild the API container *only if `backend/` changed* → verify the live build. It also carries `status` / `logs` / `db` helpers and a full environment reference. (Manual equivalent: `git pull` → `docker compose -f docker-compose.prod.yml up -d --build backend` for the API + `cp app.html → /var/www/forms.credifyfast.com/index.html` for the builder; schema changes apply via SQL until the Prisma 7 `prisma.config.ts` datasource move is done.)

### Dockerfile (backend/)

```dockerfile
# Stage 1 — dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2 — build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3 — runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose (local dev)

```yaml
# docker/docker-compose.dev.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: credify
      POSTGRES_USER: credify
      POSTGRES_PASSWORD: dev_password
    ports: ['5432:5432']
    volumes: ['pgdata:/var/lib/postgresql/data']
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U credify']
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ../backend
      target: builder
    command: npm run dev
    environment:
      DATABASE_URL: postgresql://credify:dev_password@postgres:5432/credify
      JWT_ACCESS_SECRET: ${JWT_ACCESS_SECRET:-dev_access_secret_change_in_prod}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET:-dev_refresh_secret_change_in_prod}
      JWT_ACCESS_EXPIRY: 15m
      JWT_REFRESH_EXPIRY: 30d
      AES_MASTER_KEY: ${AES_MASTER_KEY:-0000000000000000000000000000000000000000000000000000000000000000}
      HMAC_SECRET: ${HMAC_SECRET:-0000000000000000000000000000000000000000000000000000000000000000}
      NODE_ENV: development
    ports: ['3000:3000']
    volumes:
      - ../backend:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  pgdata:
```

### GCP Deployment Pipeline

```
Developer push to main
        │
        ▼
GitHub Actions: deploy.yml
  ├── npm test + type-check
  ├── docker build --platform linux/amd64
  ├── docker push → Artifact Registry
  │        (us-central1-docker.pkg.dev/credify/images/backend)
  └── gcloud run deploy credify-backend
              --image ...
              --region us-central1
              --service-account credify-run@...
              --set-secrets DATABASE_URL=db-url:latest
              --set-secrets JWT_SECRET=jwt-secret:latest
              --set-secrets AES_MASTER_KEY=aes-key:latest
              --min-instances 0
              --max-instances 5
              --memory 512Mi
```

### GCP Resource Checklist

| Resource | Config |
|----------|--------|
| **Cloud Run** | `credify-backend`, region `us-central1`, min 0 / max 5 instances, 512 MB RAM |
| **Cloud SQL** | PostgreSQL 16, `db-g1-small`, private IP only, automated daily backups |
| **Artifact Registry** | `credify/images` repository, `us-central1` |
| **Secret Manager** | `db-url`, `jwt-secret`, `aes-key`, `hmac-secret` |
| **Service Account** | `credify-run@` — roles: `Cloud SQL Client`, `Secret Manager Accessor` |
| **VPC Connector** | Cloud Run → Cloud SQL private connectivity |

### Frontend hosting — `forms.credifyfast.com`

The builder runs as a **standalone web page** (no `chrome.*` APIs) served as a static file by
the **host nginx** on the VM, alongside the API vhost. The wildcard cert `*.credifyfast.com`
already covers it, and the API allows any origin (CORS `*`), so this origin needs **no cert,
DNS, CORS, or code change** beyond publishing the file.

- **Live now**, serving the builder. To ship a new build, copy `app.html` to the site's web
  root on the VM (see [docker/nginx/forms.conf](docker/nginx/forms.conf) for the exact
  discover-root + copy + verify steps). The HTML is served `no-cache`, so updates appear on the
  next load.
- `docker/nginx/forms.conf` documents the recommended server block if the vhost ever needs to
  be recreated. The page calls the API at `https://chrome.credifyfast.com/api`.

---

## 12. Development Quickstart

### Current local stack (no Docker required)

| Component | Version | Status |
|-----------|---------|--------|
| Node.js | 22.x | Required |
| PostgreSQL | 16.14 (EDB) | Running — `localhost:5432` |
| Next.js API | 16.2.7 | Running — `http://localhost:3000` |
| Prisma | 5.22.0 | Migrated + seeded |

### Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **PostgreSQL 16** — already installed via EDB at `C:\Program Files\PostgreSQL\16`
- `gcloud` CLI — for GCP deployment only

### 1. Clone and install

```bash
git clone https://github.com/credify/credifyfbs.git
cd credifyfbs/backend
npm install
```

### 2. PostgreSQL setup (first time only)

PostgreSQL 16 is installed at `C:\Program Files\PostgreSQL\16\bin\`. The service starts automatically with Windows.

```powershell
# Verify the service is running
Get-Service postgresql* | Select-Object Name, Status

# If stopped, start it
Start-Service postgresql*

# Create the credify user and database (one-time)
$env:PGPASSWORD = "postgres"
$psql = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
& $psql -U postgres -h 127.0.0.1 -c "CREATE USER credify WITH PASSWORD 'dev_password' CREATEDB;"
& $psql -U postgres -h 127.0.0.1 -c "CREATE DATABASE credify OWNER credify ENCODING 'UTF8';"
& $psql -U postgres -h 127.0.0.1 -d credify -c "GRANT ALL ON SCHEMA public TO credify;"
```

### 3. Configure environment

```bash
cd backend
# .env already exists with generated secrets.
# For a fresh machine, generate new secrets:
node -e "
const c=require('crypto'),f=require('fs');
const a=c.randomBytes(64).toString('base64');
const r=c.randomBytes(64).toString('base64');
const k=c.randomBytes(32).toString('hex');
const h=c.randomBytes(32).toString('hex');
f.writeFileSync('.env',[
  'DATABASE_URL=postgresql://credify:dev_password@localhost:5432/credify',
  'JWT_ACCESS_SECRET='+a,
  'JWT_REFRESH_SECRET='+r,
  'JWT_ACCESS_EXPIRY=15m',
  'JWT_REFRESH_EXPIRY=30d',
  'AES_MASTER_KEY='+k,
  'HMAC_SECRET='+h,
  'NEXT_PUBLIC_API_BASE_URL=http://localhost:3000',
  'NODE_ENV=development'
].join('\n')+'\n');
"
```

> ⚠️ **Note:** `.env` values must be unquoted (no surrounding `"` marks). Prisma reads them raw.

### 4. Run migrations and seed

```bash
cd backend
npx prisma migrate dev        # creates all tables
npm run db:seed               # seeds org + admin + editor users
```

Seeded credentials:

| Email | Password | Role |
|-------|----------|------|
| `admin@credify.internal` | `admin1234!` | ADMIN |
| `editor@credify.internal` | `editor1234!` | EDITOR |

### 5. Start the backend dev server

```powershell
cd backend
npx next dev
# → http://localhost:3000
```

### 6. Verify the API

```powershell
# Login and get tokens
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST -ContentType "application/json" `
  -Body '{"email":"admin@credify.internal","password":"admin1234!"}'
```

### 7. Load the v1.0 extension (current branch)

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the repo root (`credifyfbs/`)
4. Click the Credify icon — the form builder opens in a new window

### Optional: Docker Compose (recommended for clean local setup)

If Docker Desktop is installed, you can run the full stack without a local PostgreSQL install:

```powershell
# 1. Update the lock file (first time only)
cd backend
npm install

# 2. Start Postgres + backend
cd ..\docker
docker compose -f docker-compose.dev.yml up --build

# 3. In a second terminal — run migrations and seed
docker compose -f docker-compose.dev.yml exec backend npm run db:migrate
docker compose -f docker-compose.dev.yml exec backend npm run db:seed
```

> **Note:** Prisma requires `binaryTargets = ["native", "linux-musl-openssl-3.0.x"]` in `schema.prisma` for the Alpine Linux container — this is already set.

---

## 13. Environment Variables

### backend/.env (local dev — values must be unquoted)

```env
DATABASE_URL=postgresql://credify:dev_password@localhost:5432/credify
JWT_ACCESS_SECRET=<64-byte-base64 — node -e "require('crypto').randomBytes(64).toString('base64')">
JWT_REFRESH_SECRET=<64-byte-base64>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=30d
AES_MASTER_KEY=<32-byte-hex — node -e "require('crypto').randomBytes(32).toString('hex')">
HMAC_SECRET=<32-byte-hex>
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Notes on format

| Rule | Reason |
|------|--------|
| **No surrounding quotes** on values | Prisma's `env()` reads raw — `"postgres://..."` would include literal quote chars |
| **Never commit `.env`** | It's in `.gitignore`. Real secrets go to GCP Secret Manager in production |
| **Rotate secrets between environments** | Dev secrets in `.env` must never be reused in staging/prod |

### Production (GCP Secret Manager)

All secrets are injected at Cloud Run startup via `--set-secrets`. See [deploy.yml](.github/workflows/deploy.yml) for the full list:

```
db-url            → DATABASE_URL
jwt-access-secret → JWT_ACCESS_SECRET
jwt-refresh-secret→ JWT_REFRESH_SECRET
aes-key           → AES_MASTER_KEY
hmac-secret       → HMAC_SECRET
```

---

## 14. Roadmap

> Listed newest first — **planned** milestones at the top, **completed** below. Versions are monotonic: `v1.0 → v1.1 → v1.2 → v4 → v4.1` shipped (the jump to `v4` is the prototype-merge branch), with `v4.2`/`v5.0` next.

### v5.0 — Platform (planned)

- [ ] Multi-organization support
- [ ] Enterprise SSO / SAML (beyond the v4.1 credify-login cookie SSO)
- [ ] HIPAA BAA compliance review
- [ ] Admin dashboard (Next.js pages)
- [ ] Form analytics (completion rates, average scores)
- [ ] GCP infrastructure provisioning (Terraform)

### v4.2 — Persistence, Weighting & DevOps · Submission Pipeline 🚧 In progress (current branch)

A round of "make it real" fixes — wiring stubbed UI to the live database, correcting a
feature that never did what its label claimed, and removing per-deploy toil.

**Shipped**
- [x] **Save → database**: the toolbar **Save** button now persists through `CredifyAPI` (`updateForm`/`createForm`, encrypted `schema`) instead of the old `DB_SAVE` stub ("Saved — DB endpoint not wired yet"); offline shows an honest "Saved locally" message
- [x] **Weighted completion**: the **Weightage** feature now actually drives "Form completed %" — `previewProgressPct()` (in-app) and the exported form's runtime (`data-weight` + weighted `computeProgress`/`wholeForm`) sum field weights, with an equal-count fallback when no weights are set (it previously counted every field equally)
- [x] **Contact Directory** brought to parity with **Manage Users** — already DB write-through (`/api/contacts`); now also strips the `@example.com` demo contacts on the web build so real DB contacts are the source of truth
- [x] **Topbar unified** — `.topbar-actions` stays right-aligned in Build mode (matches Preview); dropped the All-pages left-shift
- [x] Inline brand **favicon** (data-URI SVG) across app / fill page / error pages (kills the `/favicon.ico` 404)
- [x] **`deploy.sh`** — one-command VM deploy (pull → publish frontend → rebuild API only if `backend/` changed → verify) with `status`/`logs`/`db` helpers and a full env reference baked in

**Submission Pipeline (planned)**
- [ ] Submissions retrieval/list API + in-app responses viewer (decrypt server-side) — **Reports currently runs on in-memory sample data only**, not the `Submission` table
- [ ] Export — CSV / PDF batch
- [ ] Webhook delivery to EHR / third-party systems
- [ ] Submission scoring engine (server-side, matches client preview logic)
- [ ] Real-time share/submission notifications (Server-Sent Events)
- [ ] Form version history (snapshot on every save) · email invitations for new users

### v4.1 — Public Form Sharing + SSO/UX hardening ✅ Complete

Builds on v4 with a real patient-facing form-fill flow and a round of production hardening
discovered while deploying to the GCP VM.

**Public form share links (token-based, end-to-end)**
- [x] Prisma models — **`ShareLink`** (random token, AES-encrypted HTML snapshot of the form, `expiresAt` / `revokedAt` / `usedAt`, `kind` = `public` | `single`) and **`Submission`** (AES-256-GCM-encrypted answers, like the form schema)
- [x] Routes — `POST`/`GET` `/api/forms/:id/links` (create/list, auth), `POST /api/links/:token/revoke` (auth), and **public** `GET /api/links/:token` + `POST /api/links/:token/submit` (no auth — gated only by the unguessable token plus revoke/expiry/single-use checks)
- [x] **`fill.html`** — a lightweight public fill page served at `/f/<token>`; renders the form in an isolated iframe and points its built-in submit (`window.CREDIFY_SUBMIT_URL`) at the token's submit endpoint
- [x] `shareApi` now targets `chrome.credifyfast.com/api` with `credentials:'include'` (was a relative `/api` that 404'd on the static host); Share → **Send tab** pre-creates a token on modal open (`buildFormHtmlFor` + `prepareShareSendUrl` + `SHARE_SEND_URL`) so Copy / Share / SMS / Email use `/f/<token>`, not the raw form id
- [x] nginx routes `/f/` → `fill.html`; tables created via SQL (Prisma 7 CLI can't `migrate`/`db push` until the datasource `url` moves to `prisma.config.ts`)
- [ ] Bundles (`/b/<id>`) reuse the same fill page — deferred

**Top header + real-account hardening**
- [x] Removed the Switch-User (impersonation) list — the user menu shows only the active/logged-in user ("Signed in"); removed the Alerts/Responses/Admin **account bar**; **Sign out** moved into the user dropdown
- [x] Web (SSO) build no longer seeds/keeps the bundled demo roster (`@credify.dev`); `currentUser()` no longer defaults to `USERS[0]`; an unresolved SSO session surfaces an error instead of silently showing a demo identity

**Resilience / fixes**
- [x] Sign-in gate can no longer freeze on "Checking your sign-in…": `checkLoginSession()` has a 7 s timeout and shows a recoverable "Sign in" link on failure
- [x] Fixed three boot crashes (on profiles with stale `localStorage`) that halted the script before `_credifyInit()` ran — `firstAdmin.id` when `USERS` empty, missing `FORM.rows`, and an unguarded boot form-load
- [x] Branded **404 / 403 / 50x** error pages (`errors/`), wired via nginx `error_page`

**Infra notes (forms.credifyfast.com)** — the host nginx serves **`index.html`** (not `app.html`) at `/`, so deploys copy `app.html → index.html`; added `Cache-Control: no-cache` on `/` so redeploys appear without cache-busting. The builder backend runs as the Docker container `docker-backend-1` (`proxy_pass 127.0.0.1:3000`); Postgres is `docker-postgres-1`.

### v4 — New Prototype UI + Live Backend Integration ✅ Complete

Merges the new design prototype with the existing Next.js / Prisma / PostgreSQL backend.
**No builder feature was lost** — the prototype is a superset of the previous builder.

**UI / UX**
- [x] Rebuilt `app.html` on the new merged design prototype (forest-green design system unchanged)
- [x] New builder capabilities: System Forms library (PHQ-9, GAD-7, PCL-5, AUDIT, DAST-10, C-SSRS…), bundles/packets, reports & analytics, contacts directory, delivery channels (link / SMS / email / fax / portal), cross-form autofill, expanded field types (address, date-time, matrix/scale, signature, progress…), filled-PDF export (html2pdf), undo/redo, field numbering, device-adaptive date/time & searchable dropdowns
- [x] Top-right **account bar** — Alerts · Responses · Admin (admin-only) · Sign out

**Backend integration (grafted into `app.html`)**
- [x] `window.CredifyAPI` JWT client (auth + forms/users/groups/blocks/share CRUD; access + rotating refresh tokens)
- [x] Removed the broken stub pre-boot (sync `/api/me` redirect) and the dead `/api/forms/sync` cloud bridge
- [x] Offline-first boot + JWT **login gate** with a "Work Offline" mode; online/offline status pill
- [x] `loadDataFromAPI()` — pulls users/forms/groups/blocks into localStorage and hydrates the rich form shape
- [x] `saveFormToAPI()` — debounced; serializes the **whole** form schema into the encrypted `schema` blob, so all new fields round-trip with **no DB migration**
- [x] Forms (create/update/delete) and Blocks (create/delete) synced to the API; localStorage fallback offline
- [x] Verified live against production: `login` + `/auth/me` + `forms/users/groups/blocks` return real DB data; CORS open

**Deferred to a later phase**
- [ ] Full write-sync for Users (needs a password-collecting invite UI) and Groups/Shares server-id reconciliation — currently pulled read-only on login, local-first for writes
- [ ] Backend tables + routes for the new entities (Contacts, Reports, Bundles, Delivery, System-form overrides) — currently localStorage-only

### v1.2 — GCP Deployment Ready ✅ Complete

- [x] Next.js 16 App Router `params` type fix (`Promise<Record<string, string>>`) for `withAuth` middleware
- [x] Prisma `binaryTargets` set to `["native", "linux-musl-openssl-3.0.x"]` for Alpine Linux Docker builds
- [x] Docker Compose `version` field removed (Compose v2 spec)
- [x] `package-lock.json` synced — `@types/uuid` upgraded to v11
- [x] Full codebase verified and ready to deploy on GCP Cloud Run

> Open TODOs once parked here (Terraform, SSE notifications, audit-log UI, version history, email invitations) have been moved to **v4.2 / v5.0** above.

### v1.1 — Backend Foundation ✅ Complete

- [x] Next.js 16 backend scaffold with Prisma 5 + PostgreSQL 16
- [x] Prisma schema — Organization, User, Form, Group, Block, AuditLog, RefreshToken
- [x] Database migrations applied (`20260603215510_init`)
- [x] Database seeded — org + admin + editor users
- [x] Auth endpoints — `login`, `logout`, `refresh`, `me`
- [x] JWT access tokens (HS256, 15 min) + rotating refresh tokens (30 day)
- [x] Forms CRUD API with AES-256-GCM schema encryption
- [x] Form sharing (`GET/POST/DELETE /api/forms/:id/share`)
- [x] Users API (Admin only — invite, update role, soft delete)
- [x] Groups + Blocks CRUD API
- [x] RBAC middleware (`withAuth` + `withRole`)
- [x] HMAC-SHA256 payload signing on write endpoints
- [x] Sliding-window rate limiting (100 req/min auth, 500 req/min data)
- [x] Audit log on all create/update/delete/share actions
- [x] Dockerfile (multi-stage) + `.dockerignore`
- [x] `docker-compose.dev.yml` + `docker-compose.prod.yml`
- [x] GitHub Actions CI/CD → GCP Cloud Run (`deploy.yml`)
- [x] Multiple instance UI fix

### v1.0 — Local Extension ✅ Complete

- [x] MV3 Chrome Extension with sandboxed `app.html` builder
- [x] `chrome.storage.local` persistence via `postMessage` bridge
- [x] Full form builder UI — drag-and-drop, scoring, skip logic, RBAC (seeded, no real auth)

---

## v1.0 Extension — Technical Notes

### Sandbox architecture (preserved in v1.1)

The inline-handler and `localStorage` constraints of MV3 remain in v1.1. The sandbox approach is kept intact:

- **Inline handlers** (`onclick="..."`, `onchange="..."`) — only work inside a sandboxed page; this is non-negotiable in MV3 without a full rewrite.
- **localStorage shim** — extended in v1.1 to forward writes both to the service worker (for API sync) and to `chrome.storage.local` (for offline cache).

### Sandbox permissions (manifest.json)

| Token | Enables |
|-------|---------|
| `allow-scripts` | JavaScript execution |
| `allow-forms` | HTML form submission |
| `allow-popups` | Export → PDF print dialog |
| `allow-popups-to-escape-sandbox` | PDF window opens independently |
| `allow-modals` | `confirm()` / `prompt()` dialogs |
| `allow-downloads` | Export → JSON/HTML file download |

### Fonts

Instrument Serif + Sora load from Google Fonts. The sandbox CSP allows `https://fonts.googleapis.com` and `https://fonts.gstatic.com`. If offline, the app falls back to system serif/sans-serif.

---

**Version** v4 (New Prototype UI + Live Backend Integration)  
**Maintainer** Credify Internal Engineering  
**Branch** `v4` · MV3 · Chrome / Edge / Brave / Opera 

---

The new merged-prototype builder is wired to the live Next.js/Prisma/PostgreSQL backend via
`window.CredifyAPI` (JWT, offline-first). Verified end-to-end against production with the seeded
`admin@credify.internal` account; offline mode works with no backend.
