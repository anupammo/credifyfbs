/**
 * CredifyFBS Popup Script
 * 
 * Best Practices Applied:
 * - Event-driven architecture
 * - Proper error handling
 * - No eval() or remote code
 * - Accessibility support
 * - Clean DOM manipulation
 */

// DOM Elements
const statusMessage = document.getElementById('statusMessage');
const statusIndicator = document.getElementById('statusIndicator');
const pageTitle = document.getElementById('pageTitle');
const pageUrl = document.getElementById('pageUrl');
const currentTime = document.getElementById('currentTime');
const refreshButton = document.getElementById('refreshButton');
const helloButton = document.getElementById('helloButton');
const messageSection = document.getElementById('messageSection');
const helloMessage = document.getElementById('helloMessage');
const messageTime = document.getElementById('messageTime');

/**
 * Update the current time display
 */
function updateTime() {
  const now = new Date();
  currentTime.textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Fetch and display current page information
 */
async function refreshPageInfo() {
  try {
    refreshButton.disabled = true;
    refreshButton.textContent = 'Loading...';
    
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      pageTitle.textContent = 'No active tab';
      pageUrl.textContent = 'N/A';
      return;
    }
    
    // Update with tab information
    pageTitle.textContent = tab.title || 'Untitled';
    pageUrl.textContent = tab.url || 'N/A';
    
    // Update status
    statusMessage.textContent = '✓ Extension Active';
    statusIndicator.classList.add('active');
    
  } catch (error) {
    console.error('[CredifyFBS] Error fetching page info:', error);
    pageTitle.textContent = 'Error loading info';
    pageUrl.textContent = error.message;
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = 'Refresh Info';
  }
}

/**
 * Display Hello World message
 */
function showHelloMessage() {
  messageSection.style.display = 'block';
  
  // Animate the message
  helloMessage.style.animation = 'none';
  // Trigger reflow to restart animation
  void helloMessage.offsetWidth;
  helloMessage.style.animation = 'fadeInScale 0.5s ease-out';
  
  const now = new Date();
  messageTime.textContent = `Displayed at ${now.toLocaleTimeString()}`;
  
  // Log to console
  console.log('[CredifyFBS] Hello World message displayed');
}

/**
 * Handle refresh button click
 */
refreshButton.addEventListener('click', refreshPageInfo);

/**
 * Handle hello button click
 */
helloButton.addEventListener('click', showHelloMessage);

/**
 * Initialize popup on load
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('[CredifyFBS] Popup initialized');
  
  // Update time immediately and every second
  updateTime();
  setInterval(updateTime, 1000);
  
  // Load page info on open
  refreshPageInfo();
  
  // Request greeting from background service worker
  chrome.runtime.sendMessage(
    { action: 'greeting' },
    (response) => {
      if (response && response.message) {
        console.log('[CredifyFBS] Background says:', response.message);
      }
    }
  );
});

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target === helloButton) {
    event.preventDefault();
    showHelloMessage();
  }
});

/**
 * Error handling for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('[CredifyFBS] Unhandled promise rejection:', event.reason);
  statusMessage.textContent = '⚠ An error occurred';
});