# Legacy — Chrome Extension wrapper (archived)

**Status: retired.** Credify Form Builder is now a **webapp**, served standalone
at <https://forms.credifyfast.com> (nginx → `app.html`). These files are the
original **Manifest V3 Chrome Extension launcher** that used to wrap `app.html`.
They are kept here for reference and as a starting point for a *future external
Chrome extension* that will enhance — not host — the webapp.

## What's here

| File | Role (in the old extension) |
|------|------------------------------|
| `manifest.json` | MV3 config — popup window, sandboxed `app.html` page, `storage` permission, CSP/host permissions |
| `background.js` | Service worker — single-instance launcher; opened `newtab.html` in a 90%-sized popup |
| `newtab.html` | Non-sandboxed host page — framed `app.html` in a 90 vw/vh card |
| `newtab.js` | Host logic — bridged `chrome.storage.local` ↔ the app's `localStorage` via a `postMessage` seed/persist handshake |
| `icons/` | Extension toolbar icons (16 / 48 / 128 px) |

## How it worked

`background.js` → `chrome.windows.create(newtab.html)` → `newtab.js` loaded the
saved snapshot from `chrome.storage.local`, mounted `app.html` in a sandboxed
iframe, seeded it via `postMessage`, and persisted writes back to
`chrome.storage.local`.

## Important

- These files reference `app.html` **at the repo root** (e.g. `newtab.js` mounts
  `app.html`, `manifest.json` sandboxes `app.html`). They will **not** load as an
  unpacked extension from this folder as-is — `app.html` is not here. To run the
  old extension for reference, copy `app.html` (and `fill.html` if needed) next to
  these files first.
- The webapp itself does **not** depend on anything in this folder. `app.html`
  detects its environment via `isWebApp()` and runs purely on `localStorage` +
  the backend API on the web. The dormant `!isWebApp()` branches inside `app.html`
  (in-app login modal, offline/bearer fallback) were the extension's code paths;
  they are intentionally left in place but never execute in a browser tab.

## Future external extension

The plan is a **separate** Chrome extension that talks to the live webapp to add
capabilities (e.g. autofill, cross-site capture) rather than hosting the builder.
When that's built, design its integration point against the deployed webapp — do
not revive this host-page wrapper.
