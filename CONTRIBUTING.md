# Contributing to CredifyFBS

Thanks for contributing to the **Credify Form Builder Studio**. This guide covers how the repo is laid out, how to run it locally, and the conventions we follow so changes stay safe to ship.

> New to the codebase? Read [README.md](README.md) first — especially **§4 Tech Stack**, **§5 Repository Structure**, and **§6 Data Model**. This file is the *how to work in it* companion to that *what it is* reference.

---

## Table of contents
1. [Ground rules](#ground-rules)
2. [Project shape (two halves)](#project-shape-two-halves)
3. [Prerequisites](#prerequisites)
4. [Local setup](#local-setup)
5. [Branching & commits](#branching--commits)
6. [Coding standards](#coding-standards)
7. [Database changes](#database-changes)
8. [Testing & verification](#testing--verification)
9. [Pull requests](#pull-requests)
10. [Deployment](#deployment)
11. [Security](#security)

---

## Ground rules

- **Be respectful and constructive.** Assume good intent in reviews.
- **Small, focused changes.** One concern per PR. If you spot an unrelated issue, note it separately rather than bundling it in.
- **Match the surrounding code.** This repo has a strong existing style; consistency beats personal preference.
- **Never commit secrets.** `docker/.env`, real credentials, tokens, and `index.html` are git-ignored — keep it that way.

---

## Project shape (two halves)

CredifyFBS is **not** a typical bundled SPA. It has two independently deployed halves:

| Half | What it is | Lives in | Served at |
|------|-----------|----------|-----------|
| **Frontend** | A single-file builder (`app.html`, ~22k lines, vanilla JS — **no build step**), the public patient form (`fill.html`), branded error pages, and a Chrome MV3 extension (`manifest.json`, `background.js`, `newtab.*`) | repo root | `forms.credifyfast.com` (static, nginx) |
| **Backend** | A Next.js 16 REST API with Prisma + PostgreSQL, in Docker | `backend/` | `chrome.credifyfast.com/api` (Docker, host nginx proxy) |

Auth is **SSO** via `credify-login` (a shared `credify_token` cookie scoped to `.credifyfast.com`), with JWT bearer tokens as a fallback for the extension. See `backend/lib/auth/`.

---

## Prerequisites

- **Node 20** (the backend Docker image is `node:20-alpine`)
- **PostgreSQL 16** (or use the Docker compose Postgres)
- **Git** + a GitHub account with access to `anupammo/credifyfbs`
- **A static file server** for the frontend — XAMPP on Windows, or anything (`npx http-server`, `python -m http.server`, VS Code Live Server)
- *(Optional)* **Docker + Docker Compose** to run the full stack the way production does

---

## Local setup

### Frontend (builder / fill page)

`app.html` is a standalone file — open it through any static server (not `file://`, which breaks some APIs):

```bash
npx --yes http-server -p 8099 -c-1 .
# open http://localhost:8099/app.html
```

With no backend reachable, the builder runs in **local-only mode** (data persists to `localStorage`). To exercise the API, point it at a running backend (see below) or the live API.

### Backend (API)

```bash
cd backend
cp .env.example .env          # then fill in the values (DB url, JWT secrets, etc.)
npm install
npm run db:generate           # generate the Prisma client
npm run dev                    # Next.js dev server on :3000
```

Required env vars (see `docker/docker-compose.prod.yml` for the full list): `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `AES_MASTER_KEY`, `HMAC_SECRET`, and `CREDIFY_LOGIN_JWT_SECRET` (**must equal** credify-login's `JWT_SECRET` for SSO to validate).

### Full stack via Docker (production parity)

```bash
cd docker
# create docker/.env with the secrets the compose file references, then:
docker compose -f docker-compose.prod.yml up -d --build
```

> ⚠️ After editing `docker/.env`, **recreate** the container — a plain `restart` keeps the old env:
> `docker compose -f docker-compose.prod.yml up -d --force-recreate backend`

---

## Branching & commits

- **Default / PR target branch:** `main`.
- **Work on a feature/version branch**, never directly on `main`. Release work uses `vX.Y` branches (e.g. `v4.3`); features use `fix/...` or `feat/...` (e.g. `fix/form-group-persistence`).
- **Commit messages** are short and imperative, prefixed by area when useful — matching the existing history:
  - `Fix per-user form share access not reflecting (...)`
  - `Add DB-backed role sharing (FormRoleShare) + combined myAccess`
  - `Docs: add v4.3 feature status report`
- Keep commits logically scoped; avoid "misc fixes" dumps.

---

## Coding standards

### Frontend — `app.html` / `fill.html`

- **Vanilla JS, no framework, no build.** Keep it that way — these files ship as-is.
- **Match the local style** of the function you're editing (naming, `var`/`const` usage, comment density). The file mixes idioms by era; follow the neighborhood, not a global rule.
- **Comment the *why*** for non-obvious logic. The codebase favors a short rationale comment above tricky blocks.
- **Server calls go through `CredifyAPI`** (defined near the top of `app.html`). Don't scatter raw `fetch` calls; add a method to the API client and call it.
- **Guard API calls** with the `API_MODE && window.CredifyAPI` pattern so the builder still works offline.
- **Never hardcode the favicon/icon, link, or API base inline** ad hoc — reuse the existing constants (`API_BASE`, etc.).

### Backend — `backend/`

- **TypeScript**, strict. Run `npm run type-check` (`tsc --noEmit`) before pushing — it must pass.
- **Validate all input with `zod`.** Prefer a permissive schema + a real DB/ownership check over brittle format validators (e.g. don't `.cuid()` an id when the membership lookup is the true guard).
- **Every protected route uses `withAuth`** (and `withRole` where admin-gated). Authorization lives in the handler, not the client.
- **Return structured errors:** `NextResponse.json({ error, code }, { status })` with a stable `code`.
- **Lint:** `npm run lint`.

---

## Database changes

This project syncs the Prisma schema with **`prisma db push`** — there is **no `migrations/` folder** and no auto-migrate on container start.

When you change `backend/prisma/schema.prisma`:

1. Update the schema and run `npm run db:generate` so the client + types match.
2. Apply it to your dev DB: `npx prisma db push`.
3. `npm run type-check` to confirm the generated client compiles against your code.
4. **In your PR, call out the schema change explicitly** and include the exact apply step for deploy (push, or the equivalent SQL if a manual path is needed). Schema changes must be applied to the server DB *before* the new backend code runs, or every query touching the new relation will fail.

Additive changes (new table/column) are low-risk; destructive ones need a reviewer sign-off.

---

## Testing & verification

- **Backend:** `npm test` (Jest; currently `--passWithNoTests`). Add tests alongside new logic where practical.
- **Type safety is the baseline gate:** `npm run type-check` must be clean.
- **Frontend has no unit harness** — verify changes by loading `app.html` in a browser and exercising the flow. For anything user-facing, check the console for errors and confirm the actual behavior, not just that it "looks right."
- **Manual UAT:** the team test sheet lives at [docs/UAT-Test-Sheet-v4.3.csv](docs/UAT-Test-Sheet-v4.3.csv); feature status at [docs/FEATURE-STATUS.md](docs/FEATURE-STATUS.md). Update these when you add or change a feature.

---

## Pull requests

Before opening a PR:

- [ ] Branched off `main` (or the active release branch), not committing to `main` directly.
- [ ] `npm run type-check` and `npm run lint` pass in `backend/`.
- [ ] Frontend change verified in a browser (note what you tested).
- [ ] Schema change (if any) documented with its apply step.
- [ ] No secrets, no `index.html`, no `docker/.env` in the diff.
- [ ] Docs updated if behavior or features changed.

In the PR description, include: **what** changed, **why**, **how you verified it**, and **any deploy steps** (rebuild backend? `prisma db push`? frontend republish?).

---

## Deployment

Deploys are operator-run (not automated). The canonical helper is [deploy.sh](deploy.sh).

- **Frontend:** `./deploy.sh` publishes `app.html` → `index.html` into the web root. nginx serves **`index.html`** — if you only update `app.html` without republishing, the site stays stale.
- **Backend:** rebuild the container so it picks up new code/schema:
  `cd docker && docker compose -f docker-compose.prod.yml up -d --build backend`
- **Schema change:** run `prisma db push` (or the documented SQL) against the DB **before** the rebuilt backend serves traffic.

---

## Security

- Treat `docker/.env` and all secrets as confidential — never commit them.
- Report security issues **privately** to the maintainer (`support@credifyfast.com`) — do **not** open a public issue for vulnerabilities.
- Patient/PII data flows through the fill page and submissions; be especially careful with logging, error messages, and anything that widens data exposure (e.g. who can read the user roster or submissions).

---

Questions? Open a discussion/issue or reach the maintainer. Thanks for helping make Credify better. 🟢
