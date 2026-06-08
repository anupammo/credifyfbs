# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cross-browser\cross-browser.spec.ts >> Cross-Browser Storage Persistence >> should sync storage across multiple windows
- Location: cross-browser\cross-browser.spec.ts:106:7

# Error details

```
Error: page.goto: net::ERR_BLOCKED_BY_CLIENT at chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html
Call log:
  - navigating to "chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "oemikpjlfbdofmlpjcfpklaglpfgakjf is blocked" [level=1] [ref=e7]:
      - generic [ref=e8]: oemikpjlfbdofmlpjcfpklaglpfgakjf is blocked
    - paragraph [ref=e9]: This page has been blocked by Chromium
    - generic [ref=e10]: ERR_BLOCKED_BY_CLIENT
  - button "Reload" [ref=e13] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect, BrowserContext, Page } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Cross-Browser Validation Tests: Chrome, Edge, Brave
  5   |  * 
  6   |  * Ensures the MV3 extension behaves consistently across Chromium-based browsers.
  7   |  * Tests storage, messaging, service-worker lifecycle, and manifest compliance.
  8   |  */
  9   | 
  10  | const EXTENSION_ID = 'oemikpjlfbdofmlpjcfpklaglpfgakjf'; // Replace after install
  11  | 
  12  | const BROWSER_CONFIGS = [
  13  |   { name: 'chrome', channel: 'chrome', executable: undefined },
  14  |   { name: 'edge', channel: 'msedge', executable: undefined },
  15  |   { name: 'brave', channel: 'chrome', executable: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe' }, // Update path as needed
  16  | ];
  17  | 
  18  | // Helper: Open extension in given browser context
  19  | async function openExtensionInBrowser(context: BrowserContext): Promise<Page> {
  20  |   const page = await context.newPage();
> 21  |   await page.goto(`chrome-extension://${EXTENSION_ID}/newtab.html`, {
      |              ^ Error: page.goto: net::ERR_BLOCKED_BY_CLIENT at chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html
  22  |     waitUntil: 'networkidle',
  23  |   });
  24  |   return page;
  25  | }
  26  | 
  27  | // Helper: Clear extension storage
  28  | async function clearExtensionStorage(context: BrowserContext): Promise<void> {
  29  |   const backgroundPage = await context.pages()[0]; // Service worker or background
  30  |   await backgroundPage.evaluate(() => {
  31  |     return new Promise<void>((resolve) => {
  32  |       if (chrome && chrome.storage && chrome.storage.local) {
  33  |         chrome.storage.local.clear(() => resolve());
  34  |       } else {
  35  |         resolve();
  36  |       }
  37  |     });
  38  |   });
  39  | }
  40  | 
  41  | // ──────────────────────────────────────────────────────────────────────────
  42  | // Test Group: Storage Persistence
  43  | // ──────────────────────────────────────────────────────────────────────────
  44  | 
  45  | test.describe('Cross-Browser Storage Persistence', () => {
  46  |   test('should persist form data to chrome.storage.local', async ({ context }) => {
  47  |     const page = await openExtensionInBrowser(context);
  48  | 
  49  |     // Inject test data via the iframe postMessage handshake
  50  |     const testData = {
  51  |       title: 'Test Form',
  52  |       description: 'Cross-browser test',
  53  |       rows: [{ id: 'r1', fields: [{ id: 'f1', type: 'text', label: 'Name' }] }],
  54  |     };
  55  | 
  56  |     // Simulate writing to localStorage (which the app does)
  57  |     await page.evaluate((data) => {
  58  |       // The app's localStorage shim will postMessage this to parent (newtab.js)
  59  |       window.localStorage.setItem('credify_form_1', JSON.stringify(data));
  60  |     }, testData);
  61  | 
  62  |     // Wait a moment for debounced persist
  63  |     await page.waitForTimeout(150);
  64  | 
  65  |     // Read back from chrome.storage.local
  66  |     const retrieved = await page.evaluate(() => {
  67  |       return new Promise<any>((resolve) => {
  68  |         if (chrome && chrome.storage && chrome.storage.local) {
  69  |           chrome.storage.local.get('credify_ls', (result: any) => {
  70  |             resolve(result.credify_ls || null);
  71  |           });
  72  |         } else {
  73  |           resolve(null);
  74  |         }
  75  |       });
  76  |     });
  77  | 
  78  |     expect(retrieved).toBeTruthy();
  79  |     expect(JSON.stringify(retrieved)).toContain('Test Form');
  80  |   });
  81  | 
  82  |   test('should survive service-worker restart in all browsers', async ({ context }) => {
  83  |     const page = await openExtensionInBrowser(context);
  84  | 
  85  |     // Write test data
  86  |     const key = `test_key_${Date.now()}`;
  87  |     const value = `test_value_${Math.random()}`;
  88  | 
  89  |     await page.evaluate(({ k, v }) => {
  90  |       window.localStorage.setItem(k, v);
  91  |     }, { k: key, v: value });
  92  | 
  93  |     await page.waitForTimeout(150);
  94  | 
  95  |     // Reload the page (simulates service-worker termination + restart)
  96  |     await page.reload({ waitUntil: 'networkidle' });
  97  | 
  98  |     // Data should be restored
  99  |     const retrieved = await page.evaluate(({ k }) => {
  100 |       return window.localStorage.getItem(k);
  101 |     }, { k: key });
  102 | 
  103 |     expect(retrieved).toBe(value);
  104 |   });
  105 | 
  106 |   test('should sync storage across multiple windows', async ({ context }) => {
  107 |     const page1 = await openExtensionInBrowser(context);
  108 |     const page2 = await openExtensionInBrowser(context);
  109 | 
  110 |     const testKey = `sync_test_${Date.now()}`;
  111 |     const testValue = 'synced_value';
  112 | 
  113 |     // Write from first window
  114 |     await page1.evaluate(({ k, v }) => {
  115 |       window.localStorage.setItem(k, v);
  116 |     }, { k: testKey, v: testValue });
  117 | 
  118 |     await page1.waitForTimeout(150);
  119 | 
  120 |     // Read from second window
  121 |     const retrieved = await page2.evaluate(({ k }) => {
```