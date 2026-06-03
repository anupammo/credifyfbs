function openAppWindow() {
  function createWindow(baseWindow) {
    const width = Math.max(640, Math.round((baseWindow.width || 1200) * 0.9));
    const height = Math.max(480, Math.round((baseWindow.height || 800) * 0.9));
    const left = typeof baseWindow.left === 'number'
      ? Math.max(0, baseWindow.left + Math.round(((baseWindow.width || width) - width) / 2))
      : undefined;
    const top = typeof baseWindow.top === 'number'
      ? Math.max(0, baseWindow.top + Math.round(((baseWindow.height || height) - height) / 2))
      : undefined;

    chrome.windows.create({
      url: 'newtab.html',
      type: 'popup',
      width,
      height,
      left,
      top
    });
  }

  if (chrome.windows && chrome.windows.getCurrent) {
    chrome.windows.getCurrent({}, createWindow);
  } else {
    createWindow({ width: 1200, height: 800, left: 0, top: 0 });
  }
}

chrome.action.onClicked.addListener(openAppWindow);
