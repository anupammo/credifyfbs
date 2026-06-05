# Credify · Form Builder Studio

> **Internal Team Tool** — Behavioral health intake form builder with weights, scoring sections, conditional logic, and multi-user access control.

[![Version](https://img.shields.io/badge/Extension-v1.2.0-green)](./manifest.json)
[![Backend](https://img.shields.io/badge/Backend-Next.js_16-black)](./backend)
[![DB](https://img.shields.io/badge/Database-PostgreSQL_16-blue)](./backend/prisma)
[![Deploy](https://img.shields.io/badge/Deploy-GCP_Cloud_Run-orange)](./infra)
[![License](https://img.shields.io/badge/License-Internal--Use--Only-red)](#)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current State — v1.0 Extension](#2-current-state--v10-extension)
3. [Target Architecture — v1.1 Full Stack](#3-target-architecture--v11-full-stack)
4. [Tech Stack & Rationale](#4-tech-stack--rationale)
5. [Repository Structure](#5-repository-structure)
6. [Data Model](#6-data-model)
7. [API Design](#7-api-design)
8. [Security & Encryption Strategy](#8-security--encryption-strategy)
9. [Authentication Flow](#9-authentication-flow)
10. [Extension ↔ Backend Integration](#10-extension--backend-integration)
11. [Docker & GCP Deployment](#11-docker--gcp-deployment)
12. [Development Quickstart](#12-development-quickstart)
13. [Environment Variables](#13-environment-variables)
14. [Roadmap](#14-roadmap)

---

## 1. Project Overview

**Credify Form Builder Studio** is an internal Chrome Extension used by the Credify team to design, version, and distribute behavioral health intake forms (e.g., PHQ-9, GAD-7, custom intake sheets). It supports:

- **Drag-and-drop form building** with 12-column grid layout
- **Multi-page forms** with page-level skip logic
- **Weighted scoring sections** and severity band definitions
- **Conditional field visibility** (branching / skip logic)
- **Role-based access control** — Admin, Editor, Viewer
- **Form sharing** within the team
- **Export** to JSON, HTML, and PDF

**v1.0** stores all data locally in `chrome.storage.local`. **v1.1** migrates to a centralised PostgreSQL backend with real authentication, end-to-end encryption, and GCP deployment — enabling true team collaboration, audit logging, and data governance compliance.

---

## 2. Current State — v1.0 Extension

### How it works

The extension is a **Manifest V3** Chrome Extension that opens in a popup window. The form builder (`app.html`) is loaded as a **sandboxed page** to preserve its 157+ inline event handlers — which MV3 blocks on regular extension pages.

```
Chrome Action click
      │
      ▼
background.js (service worker)
  chrome.windows.create → newtab.html
      │
      ▼
newtab.html  (non-sandboxed host)
  newtab.js  ─── chrome.storage.local ──▶ seed data
      │               ▲
      │  postMessage  │ persist writes
      ▼               │
app.html  (sandboxed) ── localStorage shim
  full form builder UI
```

**localStorage bridge:** A tiny shim injected into `app.html` provides a synchronous `localStorage` API. On load, the shim is seeded with data passed via the iframe URL hash. Every `setItem` / `removeItem` is forwarded to `newtab.js` via `postMessage`, which debounces and persists to `chrome.storage.local`.

### v1.0 File Map

| File | Role |
|------|------|
| `manifest.json` | MV3 config — popup, sandbox page, `storage` permission |
| `background.js` | Service worker — opens app window, sized to 90 % of screen |
| `newtab.html` | Host page — frames `app.html` in a 90 vw/vh rounded card |
| `newtab.js` | Host logic — storage bridge, seed/persist cycle |
| `app.html` | Complete form builder UI — styles + HTML + JavaScript (~7 000 lines) |
| `icons/` | Extension toolbar icons (16 / 48 / 128 px) |

### v1.0 Data model (localStorage keys)

| Key | Value |
|-----|-------|
| `credify_ls` | Outer envelope written by `newtab.js` to `chrome.storage.local` |
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
│   │   Chrome Extension   │     │    Cloud Run Service       │  │
│   │   (MV3 · v1.2)       │────▶│    Next.js 16 App Router   │  │
│   │                      │HTTPS│    (API Routes only)       │  │
│   │  background.js       │     │                            │  │
│   │  └─ ApiClient        │     │  /api/auth/**              │  │
│   │  └─ TokenStore       │◀────│  /api/forms/**             │  │
│   │                      │JWT  │  /api/users/**             │  │
│   │  app.html            │     │  /api/groups/**            │  │
│   │  └─ StorageBridge    │     │  /api/blocks/**            │  │
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
│  Layer 1 · Chrome Extension (Presentation)                      │
│  app.html builder UI — unchanged visual; API-backed persistence  │
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

### Decision Matrix

| Concern | Choice | Why |
|---------|--------|-----|
| **Backend framework** | **Next.js 16** (App Router, API routes only) | Zero config, TypeScript first, edge-ready, easy Docker packaging, no extra Express boilerplate |
| **Database** | **PostgreSQL 16** | Native `JSONB` for form schemas, `pgcrypto` for at-rest field encryption, robust ACID guarantees, Cloud SQL managed |
| **ORM** | **Prisma** | Type-safe client, auto-migrations, JSONB support, excellent TS DX |
| **Authentication** | **NextAuth.js v5** (Credentials + JWT) | Handles session lifecycle, CSRF, token rotation; extensible to SSO later |
| **Transport security** | **TLS 1.3** (GCP-managed) | Industry standard; no manual cert management with Cloud Run |
| **Payload encryption** | **AES-256-GCM** (Node.js `crypto`) | Symmetric authenticated encryption; form JSON encrypted before DB write |
| **At-rest encryption** | **pgcrypto** + **GCP CMEK** | Column-level encryption for PII; GCP KMS for key management |
| **Containerisation** | **Docker** (multi-stage) | Minimal final image (~150 MB), reproducible builds |
| **Container registry** | **GCP Artifact Registry** | Native GCP integration, IAM-controlled, vulnerability scanning |
| **Compute** | **GCP Cloud Run** | Serverless containers, auto-scaling to zero, pay-per-request |
| **Database hosting** | **GCP Cloud SQL** | Managed PostgreSQL, automated backups, private VPC connectivity |
| **Secrets** | **GCP Secret Manager** | Centralised secret rotation, IAM-scoped access, audit trail |
| **CI/CD** | **GitHub Actions** | Build → test → push image → deploy to Cloud Run |
| **Schema validation** | **Zod** | Runtime type safety at API boundary, pairs with Prisma types |

---

## 5. Repository Structure

```
credifyfbs/
│
├── manifest.json                # v1.0 MV3 extension root (current branch)
├── background.js                # Service worker — opens app window
├── newtab.html / newtab.js      # Host page + storage bridge
├── app.html                     # Full form builder UI (~7 000 lines)
├── icons/                       # Extension toolbar icons
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
│   │   └── blocks/
│   │       ├── route.ts         # GET, POST
│   │       └── [id]/route.ts    # PUT, DELETE
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

```
organizations ──< users ──< forms ──< form_shares
                                 └──< scoring_sections
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

## 10. Extension ↔ Backend Integration

### Strategy

The extension operates in a **hybrid mode** in v1.1:

1. **Online mode** — API is reachable → all reads/writes go to the backend. Local `chrome.storage.local` acts as a write-through cache for offline resilience.
2. **Offline mode** — API unreachable → continue with cached data; queue writes and sync on reconnect.

### ApiClient (background.js)

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

### localStorage Bridge (app.html shim — v1.1)

The existing `postMessage` bridge is extended: writes go to `newtab.js`, which forwards them to the service worker, which calls the backend API.

```
app.html setItem() → postMessage → newtab.js → chrome.runtime.sendMessage
                                                → background.js ApiClient.put('/forms/:id')
```

---

## 11. Docker & GCP Deployment

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

### v1.0 — Local Extension ✅ Complete

- [x] MV3 Chrome Extension with sandboxed `app.html` builder
- [x] `chrome.storage.local` persistence via `postMessage` bridge
- [x] Full form builder UI — drag-and-drop, scoring, skip logic, RBAC (seeded, no real auth)

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

### v1.2 — GCP Deployment Ready ✅ Complete

- [x] Next.js 16 App Router `params` type fix (`Promise<Record<string, string>>`) for `withAuth` middleware
- [x] Prisma `binaryTargets` set to `["native", "linux-musl-openssl-3.0.x"]` for Alpine Linux Docker builds
- [x] Docker Compose `version` field removed (Compose v2 spec)
- [x] `package-lock.json` synced — `@types/uuid` upgraded to v11
- [x] Full codebase verified and ready to deploy on GCP Cloud Run
- [ ] Extension ApiClient + hybrid online/offline mode
- [ ] GCP infrastructure provisioning (Terraform)
- [ ] Real-time form share notifications (Server-Sent Events)
- [ ] Full audit log UI in extension
- [ ] Form version history (snapshot on every save)
- [ ] Email invitations for new users

### v1.3 — Submission Pipeline

- [ ] Form submission endpoint (`POST /api/forms/:id/submissions`)
- [ ] Submission storage and export (CSV, PDF batch)
- [ ] Webhook delivery to EHR / third-party systems
- [ ] Submission scoring engine (server-side, matches client preview logic)

### v2.0 — Platform

- [ ] Multi-organization support
- [ ] SSO / SAML integration
- [ ] HIPAA BAA compliance review
- [ ] Admin dashboard (Next.js pages)
- [ ] Form analytics (completion rates, average scores)

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

**Version** 1.2.0 (Full Stack — GCP Deployment Ready)  
**Maintainer** Credify Internal Engineering  
**Branch** `v1.2` · MV3 · Chrome / Edge / Brave / Opera
