// Tracks the single allowed app window ID across service-worker restarts.
let appWindowId = null;

function openAppWindow() {
  // If we already have a tracked window, verify it still exists then focus it.
  if (appWindowId !== null) {
    chrome.windows.get(appWindowId, function (win) {
      if (!chrome.runtime.lastError && win) {
        // Window is still open — just bring it to the front.
        chrome.windows.update(appWindowId, { focused: true });
        return;
      }
      // Window was closed externally; clear the stale id and open a fresh one.
      appWindowId = null;
      openAppWindow();
    });
    return;
  }

  function createWindow(baseWindow) {
    const width = Math.max(640, Math.round((baseWindow.width || 1200) * 0.9));
    const height = Math.max(480, Math.round((baseWindow.height || 800) * 0.9));
    const left = typeof baseWindow.left === 'number'
      ? Math.max(0, baseWindow.left + Math.round(((baseWindow.width || width) - width) / 2))
      : undefined;
    const top = typeof baseWindow.top === 'number'
      ? Math.max(0, baseWindow.top + Math.round(((baseWindow.height || height) - height) / 2))
      : undefined;

    chrome.windows.create(
      { url: 'newtab.html', type: 'popup', width, height, left, top },
      function (win) { if (win) appWindowId = win.id; }
    );
  }

  if (chrome.windows && chrome.windows.getCurrent) {
    chrome.windows.getCurrent({}, createWindow);
  } else {
    createWindow({ width: 1200, height: 800, left: 0, top: 0 });
  }
}

// Clear the tracked id whenever the user closes the app window.
chrome.windows.onRemoved.addListener(function (closedId) {
  if (closedId === appWindowId) appWindowId = null;
});

chrome.action.onClicked.addListener(openAppWindow);
