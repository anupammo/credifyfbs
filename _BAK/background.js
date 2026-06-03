/**
 * CredifyFBS Background Service Worker
 * 
 * Best Practices Applied:
 * - Service worker (not persistent background page)
 * - Only runs when needed
 * - Efficient resource usage
 * - Proper error handling
 * - No remote code execution
 */

// Install event - runs when extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Log installation
    console.log('CredifyFBS Demo extension installed successfully');
    
    // Optional: Open welcome page or perform initialization
    // chrome.tabs.create({ url: 'popup.html' });
  } else if (details.reason === 'update') {
    console.log('CredifyFBS Demo extension updated to version:', chrome.runtime.getManifest().version);
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'greeting') {
    sendResponse({
      message: 'Hello World!',
      sender: 'Background Service Worker',
      timestamp: new Date().toISOString()
    });
  }
  return true; // Keep channel open for async response
});

// Handle extension button click
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked on tab:', tab.id);
});

// Alarm example (best practice for periodic tasks)
// chrome.alarms.create('example-alarm', { periodInMinutes: 60 });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'example-alarm') {
//     console.log('Periodic task executed');
//   }
// });