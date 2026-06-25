# CredifyFBS — Feature Status

**Product:** Credify Form Builder Suite
**Version:** v4.3
**Last reviewed:** 25 June 2026
**Audience:** Everyone — written in plain language, with a technical appendix at the end.

---

## How to read this document

Every feature below is marked with one of three labels:

| Label | Meaning |
|:-----:|---------|
| 🟢 **Done** | Built, working, and ready to use. |
| 🟡 **Partial** | Usable, but part of it is missing or relies on something not yet connected. Read the note. |
| 🔴 **Pending** | Not built yet. Needs to be added. |

> **The one thing to know first:** the app can **collect** form responses from patients/clients, but it cannot yet **show those responses back to you** inside the app. That missing piece (the "Responses Inbox") is the single most important item to build next — see [Pending Work](#pending-work-what-to-build-next).

---

## At a glance

| # | Feature | Status |
|:-:|---------|:------:|
| 1 | Users (add, edit, roles) | 🟢 Done |
| 2 | Export (PDF / HTML / JSON) | 🟢 Done |
| 3 | Share a form (link / URL / QR code) | 🟢 Done |
| 4 | Send updates by email | 🟡 Partial |
| 5 | Forms (build, groups, styling) | 🟢 Done |
| 6 | Custom form blocks | 🟢 Done |
| 7 | External form submission | 🟡 Partial |
| 8 | Reports | 🟡 Partial |
| 9 | Scoring | 🟢 Done |
| 10 | Weightage | 🟢 Done |
| — | **Responses Inbox** (view submitted answers) | 🔴 Pending |
| — | **Automated email/SMS notifications** | 🔴 Pending |

---

## Completed features

### 1. Users — 🟢 Done
Add team members, edit their details, and assign each one a role (Administrator, Editor, or Viewer) that controls what they can do. People who sign in through Credify's single sign-on are added automatically as Editors.

### 2. Export — 🟢 Done
Any form can be exported in three formats:
- **PDF** — a printable, shareable document (works even with no internet).
- **HTML** — a standalone web version of the form.
- **JSON** — the form's underlying data, for backups or moving between systems.

### 3. Share a form — 🟢 Done
Share a form with a patient or client using a secure link, a copyable URL, or a scannable **QR code**. Each link is tracked individually.

### 5. Forms — 🟢 Done
Create and update forms, organise them into **groups**, assign forms to those groups, and style their appearance (colours, layout, branding).

### 6. Custom form blocks — 🟢 Done
Build reusable building blocks (sections, field sets) and create, add, or update them across your forms.

### 9. Scoring — 🟢 Done
Forms can calculate a score from the answers given, with a dedicated scoring setup screen.

### 10. Weightage — 🟢 Done
Individual questions can be given different weights, so more important answers count for more in the score and completion total.

---

## Partially complete features

### 4. Send updates by email — 🟡 Partial
**What works today:** you can share a form link by opening your own email or text-message app with the message pre-filled, ready to send.

**What's missing:** the app **cannot automatically send** emails or texts on its own (for example, "notify the care team whenever a form is submitted"). The on/off switches for these notifications exist in the interface, but there is no email/SMS sending service connected behind them yet, so nothing is actually delivered.

> See *Automated email/SMS notifications* under [Pending Work](#pending-work-what-to-build-next).

**Also note:** in the Share menu, the **Fax** and **Patient Portal** options are placeholders — the buttons exist but are not connected to a real fax or portal service.

### 7. External form submission — 🟡 Partial
**What works today:** patients and clients can open a shared link and submit their answers, and those answers **are saved** securely in the database.

**What's missing:** there is currently **no screen in the app to view the answers that have been submitted.** The data is captured but not yet visible to your team. This is addressed by the *Responses Inbox* below.

### 8. Reports — 🟡 Partial
**What works today:** a step-by-step report builder lets you choose one or more forms and select which fields to include in a report.

**What's missing:** because submitted responses can't yet be read back into the app (see above), reports can't yet be run against **real submitted data**. Once the Responses Inbox exists, Reports becomes fully functional.

---

## Pending work (what to build next)

### 🔴 Responses Inbox — **highest priority**
A place inside the app to **see, search, filter, and export the answers** people have submitted through shared forms. The answers are already being saved — this feature simply surfaces them. **Reports and external submissions both depend on this**, which is why it's the top priority.

### 🔴 Automated email/SMS notifications
A behind-the-scenes service that actually **sends** the emails and texts the notification switches promise (e.g. alerting a team member when a form is completed). This completes the "Send updates by email" feature.

### 🔴 Supporting items
- **Activity / audit history** — a record of who changed what is being stored, but there's no screen to view it yet.
- **Fax & Patient Portal sending** — connect the placeholder Share buttons to real services.

---

## Suggested priority order

1. **Responses Inbox** — unlocks the value of every form already being filled out, and makes Reports real.
2. **Automated email/SMS notifications** — turns the existing notification switches into something that works.
3. **Audit history view**, then **Fax / Portal** connections.

---

## Technical appendix

*For developers. Plain-language readers can stop here.*

**Stack:** static `app.html` builder (single file) + `fill.html` patient form, talking to a Next.js REST API (`chrome.credifyfast.com/api`) backed by Postgres via Prisma.

| Area | Backend | Frontend |
|------|---------|----------|
| Users | `/api/users`, `/api/users/[id]`, `Role` enum | roster + role assignment UI |
| Export | n/a (client-side) | `exportAs('pdf'\|'json'\|'html')`, bundled `html2pdf` |
| Share | `ShareLink` model, `/api/forms/[id]/share`, `/api/forms/[id]/links`, `/api/links/[token]` | `shareSendChannel()`, QR collect modal |
| Forms / Groups | `/api/forms`(+`[id]`), `/api/groups`(+`[id]`), `Form`/`Group`/`FormShare` | builder + styling + group assignment |
| Blocks | `/api/blocks`(+`[id]`), `Block` model | block editor |
| Contacts | `/api/contacts`(+`[id]`), `Contact` model | client directory |
| Scoring / Weightage | stored in form schema | `renderScoringModal()`, weighted completion |
| Reports | reads forms/fields | `renderReports()` multi-form wizard |
| Submissions | `Submission` model, write-only via `/api/links/[token]/submit` | `fill.html` POST |

**Confirmed gaps (technical):**
- **No submission read path.** `Submission` rows are created (`submit/route.ts`) but there is **no `GET` endpoint** (no `submission.findMany`) and **no UI** to list/view/export them.
- **No server-side mail/SMS.** Backend `package.json` has no email dependency (nodemailer / SendGrid / Resend / SMTP). The notify config (`field.notify`, alert/block notify) is persisted but never dispatched — delivery is explicitly deferred to "the connected CRM."
- **`AuditLog`** model is written to but not surfaced via API/UI.
- **Share channels `fax` / `portal`** are UI stubs with no backend.
