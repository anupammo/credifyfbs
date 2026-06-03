/**
 * CredifyFBS Background Service Worker
 * Modular service worker ready for future backend messaging.
 */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[CredifyFBS] Extension installed');
  } else if (details.reason === 'update') {
    console.log('[CredifyFBS] Extension updated to', chrome.runtime.getManifest().version);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'greeting':
      sendResponse({
        message: 'CredifyFBS background is active',
        timestamp: new Date().toISOString()
      });
      break;
    case 'saveForm':
      // Placeholder for future backend sync or central state handling.
      sendResponse({ status: 'success', info: 'saveForm received' });
      break;
    default:
      sendResponse({ status: 'unknown_action' });
      break;
  }
  return true;
});

chrome.action.onClicked.addListener(async () => {
  const url = chrome.runtime.getURL('src/popup/index.html');
  const width = typeof screen !== 'undefined' && screen.availWidth ? Math.floor(screen.availWidth * 0.9) : 1200;
  const height = typeof screen !== 'undefined' && screen.availHeight ? Math.floor(screen.availHeight * 0.9) : 800;
  const left = typeof screen !== 'undefined' && screen.availWidth ? Math.floor((screen.availWidth - width) / 2) : undefined;
  const top = typeof screen !== 'undefined' && screen.availHeight ? Math.floor((screen.availHeight - height) / 2) : undefined;

  try {
    await chrome.windows.create({
      url,
      type: 'popup',
      width,
      height,
      left,
      top
    });
  } catch (error) {
    console.warn('[CredifyFBS] Could not open popup window, creating a new tab instead.', error);
    chrome.tabs.create({ url });
  }
});
