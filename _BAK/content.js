/**
 * CredifyFBS Content Script
 * 
 * Best Practices Applied:
 * - Minimal performance impact
 * - Efficient event listeners
 * - Message-based communication
 * - No DOM pollution
 * - Runs only when needed (document_idle)
 */

// Log that content script is loaded
console.log('[CredifyFBS] Content script loaded on:', document.location.href);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getPageInfo') {
    const pageInfo = {
      title: document.title,
      url: window.location.href,
      description: document.querySelector('meta[name="description"]')?.content || 'N/A'
    };
    sendResponse(pageInfo);
  }
});

// Example: Communicate with background service worker
chrome.runtime.sendMessage(
  { action: 'greeting' },
  (response) => {
    if (response) {
      console.log('[CredifyFBS] Response from background:', response.message);
    }
  }
);

// Cleanup function (best practice)
window.addEventListener('beforeunload', () => {
  console.log('[CredifyFBS] Page is unloading, cleaning up...');
});