// Single-instance launcher for the Credify form builder.
//
// The id of the one allowed app window is kept in chrome.storage.session — NOT
// a module variable — because the MV3 service worker is torn down when idle and
// restarts fresh on the next click. An in-memory variable would reset to null
// every restart, which is why a brand-new window opened on every click. Session
// storage survives SW restarts (and is cleared when the browser closes, which
// matches the popup window's own lifetime).

const WIN_KEY = 'appWindowId';

// Guards against two windows being created by rapid double-clicks within a
// single service-worker lifetime (before the create callback records the id).
let creating = false;

function getTrackedId() {
  return new Promise((resolve) => {
    try {
      chrome.storage.session.get(WIN_KEY, (r) => {
        if (chrome.runtime.lastError) return resolve(null);
        const id = r && r[WIN_KEY];
        resolve(typeof id === 'number' ? id : null);
      });
    } catch (e) { resolve(null); }
  });
}

function setTrackedId(id) {
  return new Promise((resolve) => {
    try { chrome.storage.session.set({ [WIN_KEY]: id }, () => resolve()); }
    catch (e) { resolve(); }
  });
}

function clearTrackedId() {
  return new Promise((resolve) => {
    try { chrome.storage.session.remove(WIN_KEY, () => resolve()); }
    catch (e) { resolve(); }
  });
}

function windowExists(id) {
  return new Promise((resolve) => {
    chrome.windows.get(id, (win) => resolve(!chrome.runtime.lastError && !!win));
  });
}

function getBaseWindow() {
  return new Promise((resolve) => {
    if (chrome.windows && chrome.windows.getCurrent) {
      chrome.windows.getCurrent({}, (w) =>
        resolve(w || { width: 1200, height: 800, left: 0, top: 0 }));
    } else {
      resolve({ width: 1200, height: 800, left: 0, top: 0 });
    }
  });
}

async function openAppWindow() {
  // 1. If a tracked window is still open, just focus it.
  const trackedId = await getTrackedId();
  if (trackedId !== null && (await windowExists(trackedId))) {
    chrome.windows.update(trackedId, { focused: true, drawAttention: true });
    return;
  }

  // 2. Otherwise open a fresh one — unless a create is already in flight.
  if (creating) return;
  creating = true;

  const base = await getBaseWindow();
  const width = Math.max(640, Math.round((base.width || 1200) * 0.9));
  const height = Math.max(480, Math.round((base.height || 800) * 0.9));
  const left = typeof base.left === 'number'
    ? Math.max(0, base.left + Math.round(((base.width || width) - width) / 2))
    : undefined;
  const top = typeof base.top === 'number'
    ? Math.max(0, base.top + Math.round(((base.height || height) - height) / 2))
    : undefined;

  chrome.windows.create(
    { url: 'newtab.html', type: 'popup', width, height, left, top },
    async (win) => {
      if (win) await setTrackedId(win.id);
      creating = false;
    }
  );
}

// Clear the tracked id whenever the user closes the app window (the listener
// wakes the SW even if it was asleep, so the next click opens cleanly).
chrome.windows.onRemoved.addListener(async (closedId) => {
  const id = await getTrackedId();
  if (closedId === id) await clearTrackedId();
});

chrome.action.onClicked.addListener(() => { openAppWindow(); });
