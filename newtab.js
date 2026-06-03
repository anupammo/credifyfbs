/* ──────────────────────────────────────────────────────────────────────────
   Credify Extension · new-tab host
   ----------------------------------------------------------------------------
   Runs on the (non-sandboxed) new-tab page, so it can use chrome.storage.
   Job:
     1. Read the saved localStorage snapshot from chrome.storage.local.
     2. Mount app.html (the untouched original, sandboxed) in a 90% iframe,
        seeding it via the URL hash so the in-iframe shim has data
        synchronously at load.
     3. Receive postMessage writes from the sandboxed app and persist them
        back to chrome.storage.local.
   ────────────────────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'credify_ls';

function buildSeed(data) {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data || {}))));
  } catch (e) {
    return '';
  }
}

function mount(seed) {
  const frame = document.createElement('iframe');
  frame.id = 'app-frame';
  // The hash carries the seed; app.html's shim decodes it synchronously.
  frame.src = 'app.html' + (seed ? ('#' + seed) : '');
  document.getElementById('frame-wrap').appendChild(frame);
}

// 1 + 2: load saved data, then mount.
try {
  chrome.storage.local.get(STORAGE_KEY, function (res) {
    const data = (res && res[STORAGE_KEY]) || {};
    mount(buildSeed(data));
  });
} catch (e) {
  // If chrome.storage is somehow unavailable, still mount (in-memory only).
  mount('');
}

// 3: persist writes coming up from the sandboxed app (debounced).
let writeTimer = null;
let pending = null;
window.addEventListener('message', function (e) {
  const d = e && e.data;
  if (d && d.__credifyLS && typeof d.__credifyLS === 'object') {
    pending = d.__credifyLS;
    if (writeTimer) clearTimeout(writeTimer);
    writeTimer = setTimeout(function () {
      try {
        chrome.storage.local.set({ [STORAGE_KEY]: pending });
      } catch (err) { /* ignore */ }
    }, 80);
  }
});
