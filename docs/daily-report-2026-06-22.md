*Daily Work Report — 22 June 2026*
_Anupam Mondal · Credify Form Builder (v4.1)_
_Last 12 hours_

*Summary*
Shipped real share-link tokens for form sharing, made the "Form completed %" weightage actually weighted, refreshed the README/changelog and tech-stack docs for v4.1, plus several UI fixes (favicon 404, topbar alignment).

*Work Completed*
- Share Send tab — create a real ShareLink token when the modal opens; copy/share now use /f/<token> instead of the raw form id.
- Weightage — "Form completed %" is now genuinely weighted in both preview and exported form, with an equal-count fallback when no weights are set.
- Docs — README + changelog updated for v4.1 (public share links, header/SSO hardening, error pages, infra notes) and an accurate tech-stack section with badges (GCP VM, Docker, nginx, custom JWT, AES).
- Favicon — added an inline brand favicon (data-URI SVG) across app, fill page, and error pages, killing the /favicon.ico 404.
- Topbar — keep top-bar actions right-aligned in Build mode (unified with Preview).
- Version bumps for the day's builds.

*Status*
All changes committed to v4.1.

*Next (per Taras's priority)*
1. Save custom forms to the DB and retrieve them into the web builder UI.
2. Begin merging the auth DB into a single Credify database.
