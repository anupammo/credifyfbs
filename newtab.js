/* ──────────────────────────────────────────────────────────────────────────
   Credify Extension · new-tab host
   ----------------------------------------------------------------------------
   Runs on the (non-sandboxed) new-tab page, so it can use chrome.storage.
   Job:
     1. Read the saved localStorage snapshot from chrome.storage.local.
     2. Mount app.html (sandboxed) in a 90 % iframe with NO URL hash.
        Passing large data in the hash triggers Chrome's security policy for
        null-origin (sandboxed) frames — so we deliver the seed via a
        postMessage handshake instead:
          a. app.html shim fires  { __credifyReady: true }
          b. We respond with      { __credifySeed: <data object> }
          c. Shim populates its in-memory localStorage and fires
             'credify:seeded', which unblocks the app's init code.
     3. Receive postMessage writes from the sandboxed app and persist them
        back to chrome.storage.local.
   ────────────────────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'credify_ls';

// Populated by the chrome.storage.local.get callback; guaranteed to be set
// before the frame can fire __credifyReady (the frame only exists after mount,
// and mount is only called from inside the callback).
let savedData = {};

function mount() {
  const frame = document.createElement('iframe');
  frame.id = 'app-frame';
  // No URL hash — seed is delivered via postMessage once the shim is ready.
  frame.src = 'app.html';
  document.getElementById('frame-wrap').appendChild(frame);
}

// 1 + 2: load saved data, then mount.
try {
  chrome.storage.local.get(STORAGE_KEY, function (res) {
    savedData = (res && res[STORAGE_KEY]) || {};
    mount();
  });
} catch (e) {
  // If chrome.storage is somehow unavailable, mount with empty data.
  mount();
}

// Message router: seed handshake (step 2) + write-through persistence (step 3).
let writeTimer = null;
let pending = null;
window.addEventListener('message', function (e) {
  const d = e && e.data;
  if (!d) return;

  // 2b: frame shim is ready — send the saved data as the seed.
  if (d.__credifyReady) {
    const frame = document.getElementById('app-frame');
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ __credifySeed: savedData }, '*');
    }
    return;
  }

  // 3: persist writes coming up from the sandboxed app (debounced).
  if (d.__credifyLS && typeof d.__credifyLS === 'object') {
    pending = d.__credifyLS;
    if (writeTimer) clearTimeout(writeTimer);
    writeTimer = setTimeout(function () {
      try {
        chrome.storage.local.set({ [STORAGE_KEY]: pending });
      } catch (err) { /* ignore */ }
    }, 80);
  }
});
