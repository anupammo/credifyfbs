# Credify · Form Builder Studio

> **Internal Team Tool** — Behavioral health intake form builder with weights, scoring sections, conditional logic, and multi-user access control.

[![Version](https://img.shields.io/badge/Extension-v1.0.0-green)](./manifest.json)
[![Backend](https://img.shields.io/badge/Backend-Next.js_14-black)](./backend)
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
│   │   (MV3 · v1.1)       │────▶│    Next.js 14 App Router   │  │
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
| **Backend framework** | **Next.js 14** (App Router, API routes only) | Zero config, TypeScript first, edge-ready, easy Docker packaging, no extra Express boilerplate |
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
├── extension/                   # Chrome Extension (v1.1 — API-backed)
│   ├── manifest.json            # MV3, adds host_permissions for API
│   ├── background.js            # Service worker + ApiClient + TokenRefresh
│   ├── newtab.html              # Unchanged host shell
│   ├── newtab.js                # Hybrid: local fallback + API sync
│   ├── app.html                 # Builder UI (API-aware storage bridge)
│   └── icons/
│
├── backend/                     # Next.js application
│   ├── app/
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   ├── logout/route.ts
│   │       │   ├── refresh/route.ts
│   │       │   └── me/route.ts
│   │       ├── forms/
│   │       │   ├── route.ts          # GET list, POST create
│   │       │   └── [id]/
│   │       │       ├── route.ts      # GET, PUT, DELETE
│   │       │       └── share/route.ts
│   │       ├── users/
│   │       │   ├── route.ts          # GET list (admin), POST invite
│   │       │   └── [id]/route.ts     # PUT role, DELETE
│   │       ├── groups/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       └── blocks/
│   │           ├── route.ts
│   │           └── [id]/route.ts
│   ├── lib/
│   │   ├── db.ts                # Prisma client singleton
│   │   ├── auth/
│   │   │   ├── jwt.ts           # sign / verify / refresh
│   │   │   └── password.ts      # bcrypt helpers
│   │   ├── crypto/
│   │   │   ├── aes.ts           # AES-256-GCM encrypt/decrypt
│   │   │   └── hmac.ts          # request payload signing
│   │   └── middleware/
│   │       ├── withAuth.ts      # JWT verification middleware
│   │       └── withRole.ts      # RBAC guard factory
│   ├── prisma/
│   │   ├── schema.prisma        # DB schema
│   │   └── migrations/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── docker/
│   ├── docker-compose.dev.yml   # Local dev: Next.js + PostgreSQL
│   └── docker-compose.prod.yml  # Production-parity smoke-test
│
├── infra/                       # GCP provisioning (optional Terraform)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD: build → push → deploy
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
version: '3.9'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: credify
      POSTGRES_USER: credify
      POSTGRES_PASSWORD: dev_password
    ports: ['5432:5432']
    volumes: ['pgdata:/var/lib/postgresql/data']

  backend:
    build: ../backend
    environment:
      DATABASE_URL: postgresql://credify:dev_password@postgres:5432/credify
      JWT_SECRET: ${JWT_SECRET}
      AES_MASTER_KEY: ${AES_MASTER_KEY}
    ports: ['3000:3000']
    depends_on: [postgres]

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

### Prerequisites

- Node.js 20+
- Docker + Docker Compose
- `gcloud` CLI (for deployment only)

### 1. Clone and install

```bash
git clone https://github.com/credify/credifyfbs.git
cd credifyfbs/backend
npm install
```

### 2. Start local services

```bash
cd docker
docker compose -f docker-compose.dev.yml up -d
```

### 3. Set up the database

```bash
cd backend
cp .env.example .env          # fill in values
npx prisma migrate dev        # run migrations
npx prisma db seed            # seed org + admin user
```

### 4. Run the backend

```bash
npm run dev                   # Next.js dev server on :3000
```

### 5. Load the extension

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → select `extension/`
4. Click the Credify icon → sign in with seeded admin credentials

---

## 13. Environment Variables

### backend/.env.example

```env
# Database
DATABASE_URL="postgresql://credify:password@localhost:5432/credify"

# JWT — generate with: openssl rand -base64 64
JWT_ACCESS_SECRET="<64-byte-base64-string>"
JWT_REFRESH_SECRET="<64-byte-base64-string>"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="30d"

# AES master key — generate with: openssl rand -hex 32
AES_MASTER_KEY="<32-byte-hex-string>"

# HMAC signing key
HMAC_SECRET="<32-byte-hex-string>"

# App
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
NODE_ENV="development"
```

> **Never commit `.env` or real secrets.** In production all secrets are injected at runtime from GCP Secret Manager.

---

## 14. Roadmap

### v1.1 — Backend Foundation *(current sprint)*

- [ ] Next.js backend scaffold with Prisma + PostgreSQL
- [ ] Auth endpoints (login / logout / refresh / me)
- [ ] Forms CRUD API with AES-256-GCM encryption
- [ ] Users and groups API
- [ ] Docker + `docker-compose.dev.yml`
- [ ] Extension ApiClient + hybrid online/offline mode
- [ ] GitHub Actions CI/CD → GCP Cloud Run
- [ ] GCP infrastructure provisioning

### v1.2 — Collaboration & Audit

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

**Version** 1.0.0 (Extension) · 1.1.0 (Full Stack, in development)  
**Maintainer** Credify Internal Engineering  
**Branch** `v1.1` · MV3 · Chrome / Edge / Brave / Opera
