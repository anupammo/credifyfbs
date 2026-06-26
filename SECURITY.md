@@ -0,0 +1,63 @@
# Security Policy

CredifyFBS handles form submissions that can include **personal and patient (PII/PHI) data**. We take security seriously and appreciate responsible disclosure.

## Reporting a vulnerability

**Please do not report security issues through public GitHub issues, discussions, or pull requests.**

Instead, report privately through one of:

- **GitHub Security Advisories** — [open a private advisory](https://github.com/anupammo/credifyfbs/security/advisories/new) (preferred), or
- **Email** — [support@credifyfast.com](mailto:support@credifyfast.com) with the subject line `SECURITY: <short summary>`.

Please include:

- A description of the vulnerability and its potential impact.
- Steps to reproduce (proof-of-concept, affected endpoint/file, or request/response).
- The affected component (Form Builder `app.html`, patient fill page, backend API, or extension) and version/branch.
- Any suggested remediation, if you have one.

**Do not include real patient data or third-party credentials** in your report — use redacted or synthetic examples.

## What to expect

- **Acknowledgement** within **3 business days**.
- An initial **assessment and severity** within **7 business days**.
- Regular updates as we work on a fix, and credit (if you wish) once it's resolved.
- We ask that you give us a reasonable window to remediate before any public disclosure.

## Scope

In scope:

- The backend API (`chrome.credifyfast.com/api`) and its auth, sharing, and submission handling.
- The Form Builder (`app.html`) and patient fill page (`fill.html`).
- The Chrome extension.
- Deployment/configuration issues that expose data (e.g. exposed secrets, misconfigured CORS, leaked PII).

Generally out of scope (report only if you can show real impact):

- Reports from automated scanners with no demonstrated exploit.
- Missing security headers or best-practice recommendations without a concrete attack.
- Denial of service via volumetric traffic.
- Social engineering of staff or users.

## Supported versions

Active development happens on the latest release line. Security fixes are applied to:

| Version | Supported |
|---------|-----------|
| Latest `v4.x` / `main` | ✅ |
| Older `v0`–`v3` lines | ❌ (please upgrade) |

## Good-faith research

We will not pursue or support legal action against researchers who:

- Make a good-faith effort to avoid privacy violations, data destruction, and service disruption.
- Only interact with accounts they own or have explicit permission to test.
- Report promptly and give us reasonable time to remediate before disclosure.

Thank you for helping keep Credify and its users safe.
