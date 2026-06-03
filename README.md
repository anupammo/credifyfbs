# Credify · Form Builder — Chrome Extension

This packages your **entire `credify-form-builder-06_01_26.html` unchanged** as a
Chrome extension that opens in the **new tab page** at **90% of the window** size.

## Install (local testing)

1. Open `chrome://extensions/`
2. Turn on **Developer mode** (top-right)
3. Click **Load unpacked**
4. Select this `credify-extension` folder
5. Open a new tab (Ctrl/Cmd+T) → the builder appears, centered at 90% width/height

## What's in here

| File | Role |
|------|------|
| `app.html` | **Your original file, byte-for-byte**, with one small `<script>` added in the `<head>` (the storage bridge). Nothing else changed. |
| `newtab.html` | The new-tab page. Frames `app.html` in a 90%-sized, rounded card. |
| `newtab.js` | Host logic: loads saved data and persists changes. |
| `manifest.json` | MV3 config: new-tab override + sandbox page + `storage` permission. |
| `icons/` | Toolbar / extension icons. |

## Why it's built this way (the important part)

Your app relies on two things that Chrome's Manifest V3 **blocks on a normal
extension page**:

- **157 inline event handlers** (`onclick="..."`, `onchange="..."`, …)
- **synchronous `localStorage`**

There is no way to re-enable inline handlers on a regular MV3 page. So instead of
rewriting 157 handlers (which would change your code), `app.html` is loaded as a
**sandboxed page**, where inline handlers are allowed. That keeps your HTML 100%
intact and fully working.

A sandboxed page runs on an opaque origin where real `localStorage` is unavailable,
so a tiny **bridge** (the injected `<head>` script) gives the app a normal,
synchronous `localStorage`:

- On load it's **seeded** from data the host passes in (so your forms are there
  immediately).
- Every write is **forwarded to the host**, which saves it to
  `chrome.storage.local` — so forms persist across new tabs and restarts.

Your code calls `localStorage` exactly as before and never knows the difference.

## Data & persistence

- Forms/users/groups are stored in `chrome.storage.local` (per-profile, ~unlimited
  for this use, stays on your machine).
- Refreshing the tab reloads the latest saved data.
- To back up: use the app's **Export** (JSON/HTML) as usual.

## Notes on a few features inside the sandbox

All of these are enabled via the sandbox tokens in `manifest.json` and work:

- **Export → Download** (JSON/HTML files) — `allow-downloads`
- **Export → PDF** (opens print dialog) — `allow-popups` + `allow-popups-to-escape-sandbox`
- **Confirm / prompt dialogs** (delete, rename, etc.) — `allow-modals`
- **Fonts** (Instrument Serif + Sora from Google Fonts) — allowed in the sandbox CSP;
  if offline, the app falls back to system serif/sans, exactly like the original.
- **Copy to clipboard** uses `navigator.clipboard` with a built-in fallback toast,
  same as your original code.

## Verify it's unmodified

`app.html` minus the injected `<head>` shim is **identical** to your uploaded file
(confirmed by a byte-for-byte diff during packaging). If you ever want to update the
app, just replace the body of `app.html` with a new export — keep the shim `<script>`
that sits right after the `<title>`.

---

**Version** 1.0.0 · MV3 · Chrome / Edge / Brave / Opera
