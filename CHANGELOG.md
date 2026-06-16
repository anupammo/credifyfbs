# Changelog

All notable changes to Credify · Form Builder Studio are recorded here.
Format follows [Keep a Changelog](https://keepachangelog.com/); newest first.

---

## [Unreleased] — v3.0 · UI/UX Overhaul & Modular Build  *(branch `v3.1`)*

Migrating the new prototype (`credify-fbs-ui-ux-v2.html`) into production as the
builder UI, while preserving all existing functionality, extending the backend,
and refactoring the monolith behind a build step. Tracked in
[`docs/V3-MIGRATION-PLAN.md`](docs/V3-MIGRATION-PLAN.md).

### Added — Phase 0 · Modular build pipeline ✅
- Root Node build tooling (no new dependencies): `package.json`,
  `build/extract.mjs` (one-shot splitter), `build/build.mjs` (reassembler).
  - `npm run build` — assemble `src/` → `app.html`
  - `npm run build:check` — fail if `app.html` drifts from `src/`
  - `npm run watch` — rebuild on change
- Modular source tree under `src/`, assembled via `@include` markers:
  - `src/index.html` — HTML shell (topbar, canvas, all modals)
  - `src/styles/app.css` — design system + component styles
  - `src/js/preboot.js` — web-runtime cloud pre-seed
  - `src/js/app.main.js` — main builder application
  - `src/js/cloud-sync.js` — web-runtime server mirror + account bar
- **Verified:** the build reproduces the prototype **byte-identically**; all JS
  modules pass `node --check`.

### Added — Phase 1 · Dual-runtime boot/auth layer 🟡 mostly done
- `src/js/runtime.js` — detects **extension (MV3 sandbox)** vs **hosted web**:
  - installs the in-memory `localStorage` shim + postMessage seed handshake when
    sandboxed (ported from the v1.2 extension build);
  - exposes a unified `CredifyNet` transport — cookie session on web, JWT Bearer
    in the extension — plus `CredifyAPI` auth helpers.
- Seed-gated boot: the data-boot is wrapped in `__credifyMainBoot()` and runs
  immediately on web, but waits for `credify:seeded` in the extension.
- Web-only bridges (`preboot.js`, `cloud-sync.js`) now no-op in the extension.
- **Verified:** new UI renders in web mode with the full design system and new
  field types — zero console errors.

### Changed
- `app.html` is now a **build artifact** generated from `src/` — edit the modules
  under `src/`, never `app.html` directly. (Previous hand-edited v1.2 `app.html`
  remains in git history.)

### Pending (next phases)
- **Phase 2** — backend models + routes for Contacts, Roles, Submissions,
  Notifications, extended Users; reconcile the prototype's expected web endpoints
  (`/api/me`, `/api/forms/sync`, `/api/alerts/count`, `/api/logout`) with the
  existing `/api/auth/*` + REST surface.
- **Phase 3** — wire new modules to the backend; restore extension↔server sync via
  `CredifyNet`/JWT (extension currently persists local-only).
- **Phase 0b / 4 / 5** — finer module carving, full regression pass, docs/deploy.

---

## [v1.2] — GCP Deployment Ready ✅
- Next.js 16 App Router `params` typing fix for `withAuth`; Prisma `binaryTargets`
  for Alpine; Docker Compose v2 spec; `package-lock.json` synced; deploy-ready.
- Multi-window/instance UI fix.

## [v1.1] — Backend Foundation ✅
- Next.js 16 + Prisma 5 + PostgreSQL 16 backend: auth (`login`/`logout`/`refresh`/`me`),
  Forms CRUD with AES-256-GCM schema encryption, sharing, Users/Groups/Blocks APIs,
  RBAC middleware, HMAC payload signing, rate limiting, audit log, Docker + CI/CD.

## [v1.0] — Local Extension ✅
- MV3 Chrome Extension with sandboxed `app.html` builder; `chrome.storage.local`
  persistence via `postMessage` bridge; full builder UI (drag-and-drop, scoring,
  skip logic, seeded RBAC).
