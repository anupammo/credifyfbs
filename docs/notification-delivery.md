# Notification Delivery — design spec

Status: **proposed** (nothing built yet). Author: support. Scope: turn the
currently-stubbed form notifications into real, deliverable email (and later SMS),
with one platform-wide sending identity.

---

## 1. Problem / current state

- Form notifications ("🔔 Notify when this fires" — Email/SMS + recipients) are
  **not delivered**. The builder only pushes entries to a browser `localStorage`
  queue: `SHARE_NOTIF_KEY = 'credify_share_notifications_v1'` (`app.html`), for
  "a connected service to drain." Nothing drains it.
- The backend has **no mail infrastructure** — no nodemailer/SendGrid/SES/SMTP, no
  `EMAIL_FROM`, no notify route.
- Password reset is **not** in this repo; it lives in `credify-login`
  (login.credifyfast.com) and needs its own verified sender too.
- `support@credifyfast.com` today is only a human contact address (docs, error
  pages) — not a system sender.

**Consequence:** a client-side queue can't reliably send email, and it must never
carry PHI. Submission notifications have to be triggered and sent **server-side**.

## 2. Goal

When a form is submitted, notify the configured recipients by email — reliably,
from a verified sender, **without putting PHI in the email**. Reuse the same
sending identity/service for `credify-login` password-reset mail.

Scope split:
- **Phase 1 (this spec):** *Notify on submission* — server-side, form-level
  recipients. This is the reliable, high-value case.
- **Phase 2 (later):** *rule-fired* notifications ("when this condition is met"),
  which require the server to decrypt the schema and evaluate rules. More complex;
  out of scope here.

## 3. Architecture

Trigger at the authoritative server event — the submit endpoint — **after** the
submission row commits:

```
POST /api/links/:token/submit           (backend/app/api/links/[token]/submit/route.ts)
  └─ tx: create Submission (answers AES-encrypted)   ← unchanged
  └─ AFTER commit (non-blocking):
       notifyOnSubmission(form, submissionId)
         ├─ load the form's notify config (recipients + channels)
         ├─ resolve recipients → email addresses (roles→users, userIds, contact)
         ├─ build a PHI-SAFE message (no answers; form name + secure deep link)
         └─ mailer.sendEmail({from, to, subject, html, text})
```

New modules (mirror existing `backend/lib/*` style):
- `backend/lib/mail/mailer.ts` — provider-agnostic `sendEmail(msg)`; the actual
  provider call sits behind one function, selected by env (swap in one line).
- `backend/lib/notify/onSubmission.ts` — recipient resolution + message build +
  send; wrapped in try/catch so a mail failure never fails the submission.

Delivery is **fire-and-forget** relative to the HTTP response: the submitter's
`{success:true}` must not depend on mail succeeding. Log failures; optionally
persist a `NotificationLog` row for ret/audit.

## 4. Sender identity + domain auth (required before anything sends)

- Sender: **`notifications@credifyfast.com`** (recommended) or `support@…`.
  Using a dedicated `notifications@`/`no-reply@` keeps the human `support@`
  inbox clean; set `Reply-To: support@credifyfast.com`.
- **DNS on `credifyfast.com` is mandatory** or mail is spam/rejected:
  - **SPF** — include the provider.
  - **DKIM** — provider-issued CNAME/TXT keys.
  - **DMARC** — a `_dmarc` policy (start `p=none`, tighten later).
- One verified domain/sender should serve **both** this app's notifications and
  `credify-login` reset mail — pick the identity once, platform-wide.

## 5. Provider options

| Provider | Why | Notes |
|----------|-----|-------|
| **Resend** (recommended) | Simplest DX, clean API, easy DKIM/domain verify, generous free tier | `resend` npm SDK; one API key |
| SendGrid | Mature, high volume, templates | More setup/console overhead |
| AWS SES | Cheapest at scale; fits if infra moves to AWS | Sandbox until production access granted; more IAM/DNS work |
| Raw SMTP (nodemailer) | No vendor lock-in; works with any mailbox | You operate deliverability/reputation yourself |

Recommendation: **Resend** for speed to production; the `mailer.ts` abstraction
means the provider can change later without touching call sites.

## 6. Data model additions

**Form-level notify config** (simpler + server-readable than per-rule):
add to the form schema a `submitNotify` object —
```jsonc
submitNotify: {
  enabled: true,
  channels: { email: true, sms: false },
  roles:   ["admin"],        // resolve to those users' emails
  userIds: ["u_..."],        // specific team members
  contact: false             // notify the submitter (contact/patient) if we hold an email
}
```
Authored in the builder (a "Notify on submission" panel at the form level, reusing
the existing recipient picker). Round-trips inside the encrypted `schema` blob —
**no DB migration** (same pattern as scoring/page-rules).

Optional: a `NotificationLog` table (`id, submissionId, to, channel, status,
error, createdAt`) for delivery audit + retry. Recommended for a clinical product.

## 7. PHI safety (non-negotiable)

- **Never put answers/PHI in the email.** Body = "A new response to *{Form name}*
  was submitted at {time}" + a **secure link** into the app to view it
  (behind SSO). This keeps PHI out of email and out of provider logs.
- Recipient emails are the only PII in the payload; send per-recipient (no shared
  To/CC that leaks the recipient list).

## 8. Secrets / env (you provide)

Backend `.env` (`/home/support/credifyfbs/backend/.env`):
```
MAIL_PROVIDER=resend
MAIL_API_KEY=<provider key>
MAIL_FROM="Credify <notifications@credifyfast.com>"
MAIL_REPLY_TO=support@credifyfast.com
APP_BASE_URL=https://forms.credifyfast.com
```
Plus the DNS records (SPF/DKIM/DMARC) on `credifyfast.com`.

## 9. Phasing

1. **Identity + DNS** — pick sender, verify domain with the provider (you).
2. **`mailer.ts`** — provider-agnostic send + env wiring; a `/api/dev/test-email`
   (admin-only) to verify delivery end-to-end.
3. **Form-level `submitNotify`** — builder UI (recipient picker) + schema round-trip.
4. **Hook `onSubmission`** into the submit route; PHI-safe message + secure link.
5. **`NotificationLog`** + basic retry/observability.
6. Retire the client `SHARE_NOTIF` localStorage queue (or keep only as an
   offline-preview stub).
7. **Phase 2:** rule-fired notifications (server-side schema decrypt + eval).

## 10. Decisions needed from you

1. **Provider** — Resend (recommended) / SendGrid / SES / SMTP?
2. **Sender identity** — `notifications@credifyfast.com` (recommended) or
   `support@credifyfast.com`?
3. **Who can be notified on submission** — team recipients only, or also the
   submitting contact/patient (if we hold their email)?
4. **Delivery audit** — add the `NotificationLog` table (recommended) or skip for v1?

Once 1–2 are chosen and the domain is verified, I can build phases 2–4.
