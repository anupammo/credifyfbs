# SSO wiring for credify-login (`login.credifyfast.com`)

Changes the credify-login app so its session works as single sign-on for the Form
Builder (`forms.credifyfast.com`) and the data backend (`chrome.credifyfast.com`).
The Form-Builder side (this repo) is already done; this is the matching change for
the **separate** `anupammo/credify-login` repo.

## What the patch does
- Scopes the `credify_token` session cookie to **`.credifyfast.com`** in production
  (host-only on localhost) so sibling subdomains receive it — see `cookieOptions()`
  in `lib/auth.ts`, applied in `login`, `signup`, and the OAuth `callback` routes.
- Clears the cookie with the **same domain** on `logout` (otherwise the browser
  won't remove a parent-domain cookie).
- Adds **credentialed CORS** (`lib/cors.ts`) to `/api/auth/me` and `/api/auth/logout`
  so `forms.credifyfast.com` can read the session and sign out cross-origin.

## Apply
```bash
git clone https://github.com/anupammo/credify-login.git
cd credify-login
git checkout -b sso
git apply /path/to/credify-login-sso.patch    # or: git am < ...
git add -A && git commit -m "SSO: parent-domain cookie + credentialed CORS for forms"
# push and deploy login.credifyfast.com
```

## Required env (credify-login)
- `JWT_SECRET` — **must be identical** to the form-builder backend's
  `CREDIFY_LOGIN_JWT_SECRET` (that backend validates this app's cookie with it).
- `NODE_ENV=production` — enables `secure` + the `.credifyfast.com` cookie domain.
- `COOKIE_DOMAIN` *(optional)* — override the cookie domain (default
  `.credifyfast.com` in prod).
- `SSO_ALLOWED_ORIGINS` *(optional)* — extra browser origins allowed for
  credentialed CORS (comma-separated). `forms.`/`chrome.credifyfast.com` + localhost
  are allowed by default.

## Matching change already in THIS repo (form-builder backend)
- `backend/lib/auth/sso.ts` validates the `credify_token` cookie with
  `CREDIFY_LOGIN_JWT_SECRET` and provisions/maps the user by email.
- `backend/lib/middleware/withAuth.ts` accepts the cookie (in addition to Bearer).
- `backend/middleware.ts` does credentialed CORS for the data API.
- Set `CREDIFY_LOGIN_JWT_SECRET` on the backend (= this app's `JWT_SECRET`).

## Deploy order
1. Deploy **credify-login** (this patch) — cookie now spans `.credifyfast.com`.
2. Deploy the **form-builder backend** with `CREDIFY_LOGIN_JWT_SECRET` set.
3. Publish the new **`app.html`** to `forms.credifyfast.com`.

After all three: log in at `login.credifyfast.com` → open Form Builder → already
signed in, data loads; Sign out returns to login. Existing host-only login
sessions are invalidated by the domain change (users log in once more).
