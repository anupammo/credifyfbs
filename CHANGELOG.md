# Changelog — Credify Form Builder Studio

All notable changes to this project are documented here, ordered from newest to oldest.
Branch tags map 1-to-1 to git branch names.

---

## [v2.1] — 2026-06-06  *(current)*

> **Note:** `v2.1` is identical in content to `v2`; the branch was cut to create a clean named release tag.

Commits: `c72d1f9`, `a6705b8`

### Fixed
- **Dockerfile — missing `public/` directory** (`c72d1f9`)
  - Next.js standalone output requires a `public/` directory in the builder stage.
  - Added `RUN mkdir -p /app/public` after `npm run build` to prevent Cloud Run crash on cold start.
- **Dockerfile — missing `openssl` in Alpine runner** (`a6705b8`)
  - Prisma Client requires OpenSSL at runtime when using `linux-musl-openssl-3.0.x` binary target.
  - Added `RUN apk add --no-cache openssl` to the `runner` stage.
  - Without this, the backend would fail to start inside the Cloud Run container with a dynamic linker error.

### Files changed
| File | Change |
|------|--------|
| `backend/Dockerfile` | +2 lines — `mkdir -p /app/public` in builder; `apk add openssl` in runner |

---

## [v2] — 2026-06-06

Commit: `9004081` — *Stable release*

> Branch cut from `v1.2` after confirming the codebase passed local dry-run testing.
> Contains the same Dockerfile fixes as `v2.1` (commits cherry-picked forward).
> This is the first branch tagged as production-deployment-ready.

### Summary
- All v1.2 changes included (see below)
- Docker image confirmed buildable end-to-end
- `POST /api/auth/login` smoke-tested and returning JWT tokens
- Prisma migrations and seed verified against local PostgreSQL 16

---

## [v1.2] — 2026-06-05

Commits: `cd50cb1` (code), `ce8f75e` (README)

### Fixed
- **`withAuth` middleware — Next.js 16 App Router `params` type** (`cd50cb1`)
  - Next.js 16 changed route segment `params` from `Record<string, string>` to `Promise<Record<string, string>>`.
  - Updated `withAuth` to accept `ctx: { params: Promise<Record<string, string>> }` and `await ctx.params` before passing to handler.
  - Without this fix, dynamic route params (`[id]`, `[userId]`) would be `Promise` objects at runtime.

- **Prisma schema — Alpine Linux binary targets** (`cd50cb1`)
  - Added `binaryTargets = ["native", "linux-musl-openssl-3.0.x"]` to `generator client` block.
  - Required for the multi-stage Docker build that uses `node:20-alpine` as the runner.

- **Docker Compose — removed deprecated `version` field** (`cd50cb1`)
  - Removed top-level `version: '3.9'` from `docker-compose.dev.yml`.
  - Compose v2 spec does not require (and warns on) the `version` key.

- **`package-lock.json` — `@types/uuid` upgraded to v11** (`cd50cb1`)
  - Aligned with `uuid@11.1.1` runtime dependency installed in v1.1.

### Documentation
- README sections 5, 12, 13, 14 rewritten with accurate local dev setup (`ce8f75e`)
- PostgreSQL EDB setup commands documented for Windows (no Docker path)
- `.env` format notes added (unquoted values required by Prisma)

### Files changed
| File | Change |
|------|--------|
| `backend/lib/middleware/withAuth.ts` | Async params unwrap for Next.js 16 App Router |
| `backend/prisma/schema.prisma` | Added `binaryTargets` for Alpine builds |
| `docker/docker-compose.dev.yml` | Removed `version: '3.9'` |
| `backend/package-lock.json` | `@types/uuid` v10 → v11 |
| `README.md` | Sections 5, 12, 13, 14 rewritten |

---

## [v1.1] — 2026-06-03 to 2026-06-04

Commits: `9b948b8` (backend scaffold), `ee4ba38` (cleanup), `4ce0852` (UI fix), `1ff71a6` (README)

### Added — Backend (commit `9b948b8`)

#### API Routes
- `POST /api/auth/login` — email + password → `{ accessToken, refreshToken, user }`
- `POST /api/auth/logout` — revoke refresh token
- `POST /api/auth/refresh` — rotate access + refresh token pair
- `GET  /api/auth/me` — current user profile
- `GET/POST /api/forms` — list (paginated, searchable) + create
- `GET/PUT/DELETE /api/forms/:id` — single form CRUD (soft delete)
- `GET/POST/DELETE /api/forms/:id/share` — manage per-user form shares
- `GET/POST /api/users` — list org users + invite (Admin only)
- `PUT/DELETE /api/users/:id` — update role, soft delete (Admin only)
- `GET/POST /api/groups` — list + create groups
- `PUT/DELETE /api/groups/:id` — update + delete groups
- `GET/POST /api/blocks` — list + save reusable field blocks
- `PUT/DELETE /api/blocks/:id` — update + delete blocks

#### Security & Middleware
- `withAuth` middleware — JWT Bearer token verification on every protected route
- `withRole` guard factory — RBAC enforcement (VIEWER / EDITOR / ADMIN rank hierarchy)
- AES-256-GCM encryption of form schemas at rest (`lib/crypto/aes.ts`)
- HMAC-SHA256 payload signing on write operations (`lib/crypto/hmac.ts`)
- Sliding-window in-process rate limiter — 100 req/min (auth), 500 req/min (data)
- Audit log on all create / update / delete / share actions

#### Auth
- JWT access tokens — HS256, 15-minute TTL
- Refresh tokens — 256-bit random, hashed with SHA-256 before DB storage, 30-day TTL, single-use rotation
- bcrypt password hashing (cost factor 12)
- Constant-time credential comparison (prevents timing attacks on login)

#### Database
- Full Prisma schema: `Organization`, `User`, `Form`, `Group`, `Block`, `FormShare`, `RefreshToken`, `AuditLog`
- Migration `20260603215510_init` applied
- Seed script: Credify org + `admin@credify.internal` (ADMIN) + `editor@credify.internal` (EDITOR)

#### Infrastructure
- `backend/Dockerfile` — multi-stage build (deps → builder → runner on `node:20-alpine`)
- `docker/docker-compose.dev.yml` — Postgres 16 + backend with healthcheck
- `docker/docker-compose.prod.yml` — production-parity smoke-test compose
- `.github/workflows/deploy.yml` — GitHub Actions CI/CD: type-check → test → Docker build → push to Artifact Registry → `gcloud run deploy`

#### Dev tooling
- `backend/tsconfig.seed.json` — ts-node config for seed script (CommonJS module resolution)
- `backend/.vscode/tasks.json` — VS Code task for `npx next dev`
- Generated `next-env.d.ts`, `tsconfig.tsbuildinfo`

### Fixed — Extension (commit `4ce0852`)
- **Multiple instance fix** — `background.js` now tracks open window IDs and focuses existing window instead of opening a duplicate
- `newtab.js` storage bridge debounce improved
- `newtab.html` viewport meta tag fix
- `manifest.json` version bump

### Removed
- `credify-form-builder-v1.0.zip` binary removed from repo (`ee4ba38`)

### Files changed
42 files — 11,485 insertions

---

## [v1.0] — 2026-06-03

Commit: `6953a48`

### Fixed
- `background.js` — rewritten from scratch for MV3 service worker pattern
- Icons replaced with correct 16/48/128px PNG assets
- `manifest.json` — corrected extension permissions and action config

### Removed
- Entire `_BAK/` directory (old v0.x popup-based extension source) cleaned from working tree

---

## [v0.1] — 2026-06-03

Commits: `892e57b` (complete UI), `1ff71a6` (README)

### Added
- **Complete MV3 Chrome Extension** — full form builder UI in `app.html` (~6,600 lines)
- **Sandboxed page architecture** — `app.html` runs in `sandbox` CSP context to allow inline scripts; `newtab.html` acts as the non-sandboxed host
- **`postMessage` localStorage bridge** — `newtab.js` shims `localStorage` API for the sandboxed page, debounces writes, persists to `chrome.storage.local`
- **`background.js`** — MV3 service worker opens `newtab.html` in a sized window on toolbar click
- **Form builder features:**
  - Drag-and-drop field ordering
  - 12-column grid layout
  - Multi-page forms with page-level navigation
  - Weighted scoring sections and severity bands
  - Conditional field visibility (skip logic)
  - Role-based access (Admin / Editor / Viewer — seeded locally, no real auth)
  - Form sharing (local, in-memory)
  - Export to JSON / HTML / PDF
  - Reusable field blocks
  - Form groups / folders
- **localStorage data model:**
  - `credify_forms_v2` — full form definitions
  - `credify_users_v1` — seeded team roster
  - `credify_current_user_v1` — active user
  - `credify_form_blocks_v1` — saved reusable blocks
  - `credify_groups_v1` — folder metadata
  - `credify_last_form_v2` — last opened form ID
- Archived old popup-based source to `_BAK/`
- Full README with architecture, data model, and quickstart

---

## [main] — 2026-06-02 to 2026-06-03  *(initial bootstrap)*

Commits: `ec16c67`, `1641fd4`, `a6d2ed3`

- Repository initialised
- Demo content and structure placeholder added
- Initial project scaffolding
