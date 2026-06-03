/**
 * CredifyFBS Content Script
 * Lightweight page interaction and page info provider.
 */

console.log('[CredifyFBS] Content script loaded:', window.location.href);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getPageInfo') {
    sendResponse({
      title: document.title,
      url: window.location.href,
      description: document.querySelector('meta[name="description"]')?.content || ''
    });
  }
});
