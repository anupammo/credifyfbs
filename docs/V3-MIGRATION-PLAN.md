# Credify Form Builder — v3 UI/UX Migration Plan

Implements the new prototype `credify-fbs-ui-ux-v2.html` as the production app while
preserving all existing functionality, extending the backend, and modularizing the
codebase behind a build step.

**Decisions (locked with product owner, 2026-06-16):**
1. **Runtime/Auth:** Support BOTH the MV3 sandboxed Chrome extension (JWT + postMessage
   localStorage bridge) AND the hosted web app (cookie session, `/api/me`, `/login`).
   A context-detecting boot layer chooses the right path.
2. **Backend:** Add real backend in this pass for the new entities — Contacts, Roles,
   Submissions (Reports), Notifications queue, extended User profiles. Schema-embedded
   features (Show-Fields rules, autopopulation links, page rules, scoring, instruments,
   styling) ride inside the encrypted form schema JSON — no DB change.
3. **Modularity:** Modular source under `src/`, concatenated into `app.html` by a Node
   build step. Single deployed file (required by MV3 sandbox inline-handler constraint),
   modular source for scalable development.

---

## Phase 0 — Build pipeline & modular extraction  ✅ DONE (verified)
> Build reproduces the prototype **byte-identically**; all JS modules pass `node --check`;
> integrated build renders cleanly in web mode with **zero console errors**.
- Root tooling: `package.json`, `build/extract.mjs` (one-shot), `build/build.mjs` (reassemble), npm scripts.
- Extract the 4 true top-level blocks of the prototype into modules:
  - `src/js/preboot.js`        — cloud-bridge pre-seed
  - `src/styles/app.css`       — full design system + component CSS
  - `src/js/app.main.js`       — main builder application (carved finer in 0b)
  - `src/js/cloud-sync.js`     — localStorage→server mirror + account bar
  - `src/index.html`           — HTML shell (topbar, canvas, all modals) + `@include` markers
- `npm run build` reproduces a byte-faithful `app.html`. **Gate:** built file ≡ prototype (modulo include boundaries).

## Phase 0b — Finer carving of app.main.js (incremental, validated each cut)
- Carve by logical module (icons/state, builder/canvas, inspector, scoring, show-fields,
  autopopulation, reports, users/contacts/roles, share, export, instruments, forms-manager,
  preview, persistence). Rebuild + diff after every cut.

## Phase 1 — Dual-runtime boot/auth layer  🟡 MOSTLY DONE
- ✅ `src/js/runtime.js`: detects extension vs web; installs MV3 localStorage shim +
  seed handshake when sandboxed; exposes unified `CredifyNet` transport (cookie on web,
  JWT Bearer in extension) + `CredifyAPI` auth.
- ✅ Seed-gated boot: `__credifyMainBoot()` runs immediately on web, waits for
  `credify:seeded` in the extension (mirrors the proven v1.2 deferral).
- ✅ Web bridges guarded: `preboot.js` / `cloud-sync.js` no-op in the extension.
- ✅ Web-mode render verified (preview), no console errors.
- ⬜ REMAINING: wire the extension's server sync through `CredifyNet`/JWT (the new
  app.main.js currently persists local-only in the extension — see Phase 3); restore an
  extension login path; re-confirm `newtab.js`/`background.js`/manifest CSP against the
  new app.html in a real MV3 load.

## Phase 2 — Backend extension (Prisma + API)
- New models: `Contact`, `Role` (custom roles + permissions), `Submission`, `Notification`;
  extend `User` profile fields; extend `FormShare` for role/contact grants.
- Migrations + seed updates. Preserve JWT, AES schema encryption, HMAC, rate limit, audit log.
- Routes: `/api/contacts`, `/api/roles`, `/api/submissions`, `/api/notifications`,
  extend `/api/users`, extend `/api/forms/[id]/share`.
- **API-shape reconciliation (discovered during Phase 1):** the prototype's WEB bridges
  call endpoints this backend does not yet expose —
  `/api/me`, `/api/forms` (returning `{forms}`), `/api/forms/sync`, `/api/logout`,
  `/api/alerts/count`, and pages `/login`, `/alerts`, `/responses`, `/admin`.
  The current backend exposes `/api/auth/{login,me,refresh,logout}` and REST `/api/forms`.
  Decide per endpoint: add a thin alias route, or adapt the bridge to the REST shape.
  (Submissions/alerts are net-new and land with the Phase 2 tables.)

## Phase 3 — Wire new modules to backend
- Replace mockup localStorage/seed with the unified data API in each new module.
- Verify schema-embedded features round-trip through encrypted `/api/forms`.

## Phase 4 — Preserve & verify existing functionality
- Regression pass: build/preview, drag-drop, export JSON/HTML/PDF, groups, blocks, sharing,
  export runtime (autopop bridge, scoring, cross-form conditions).

## Phase 5 — QA, docs, deploy
- README architecture refresh, manifest version bump, CSP review, docker/nginx for web path,
  run test suite, manual smoke via preview.

---

## Safety invariants
- The current production `app.html` keeps working until the built replacement is validated;
  the build writes to `app.html` only after Phase 0 gate passes (prototype reproduced exactly).
- No existing API route/security control is weakened; new tables are additive.
