# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offline\offline.spec.ts >> Offline: UI Feedback & Error Handling >> should show offline indicator when network is lost
- Location: offline\offline.spec.ts:323:7

# Error details

```
Error: page.goto: net::ERR_BLOCKED_BY_CLIENT at chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html
Call log:
  - navigating to "chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html", waiting until "domcontentloaded"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "oemikpjlfbdofmlpjcfpklaglpfgakjf is blocked" [level=1] [ref=e7]:
      - generic [ref=e8]: oemikpjlfbdofmlpjcfpklaglpfgakjf is blocked
    - paragraph [ref=e9]: This page has been blocked by Chrome
    - generic [ref=e10]: ERR_BLOCKED_BY_CLIENT
  - button "Reload" [ref=e13] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect, Page, BrowserContext } from '@playwright/test';
  2   | import type { CDPSession } from '@playwright/test';
  3   | 
  4   | /**
  5   |  * Offline Mode Simulation Tests
  6   |  * 
  7   |  * Tests that the extension gracefully handles network unavailability, maintains
  8   |  * queued writes, syncs when reconnected, and shows proper UI feedback.
  9   |  */
  10  | 
  11  | const EXTENSION_ID = 'oemikpjlfbdofmlpjcfpklaglpfgakjf';
  12  | 
  13  | interface StoredWrite {
  14  |   timestamp: number;
  15  |   key: string;
  16  |   value: string;
  17  |   synced: boolean;
  18  | }
  19  | 
  20  | // Helper: Get a CDP session for network throttling
  21  | async function getNetworkCDP(page: Page): Promise<CDPSession> {
  22  |   return await page.context().newCDPSession(page);
  23  | }
  24  | 
  25  | // Helper: Simulate offline by blocking all network requests
  26  | async function goOffline(page: Page): Promise<void> {
  27  |   const client = await getNetworkCDP(page);
  28  |   await client.send('Network.emulateNetworkConditions', {
  29  |     offline: true,
  30  |     downloadThroughput: -1,
  31  |     uploadThroughput: -1,
  32  |     latency: 0,
  33  |   });
  34  | }
  35  | 
  36  | // Helper: Simulate online
  37  | async function goOnline(page: Page): Promise<void> {
  38  |   const client = await getNetworkCDP(page);
  39  |   await client.send('Network.emulateNetworkConditions', {
  40  |     offline: false,
  41  |     downloadThroughput: -1,
  42  |     uploadThroughput: -1,
  43  |     latency: 0,
  44  |   });
  45  | }
  46  | 
  47  | // Helper: Open extension and simulate backend API
  48  | async function openExtensionWithMockedAPI(context: BrowserContext): Promise<Page> {
  49  |   const page = await context.newPage();
  50  | 
  51  |   // Setup response interception for API calls (mock backend)
  52  |   await page.route('**/api/**', (route) => {
  53  |     // Simulate that API is unavailable (offline)
  54  |     route.abort('failed');
  55  |   });
  56  | 
> 57  |   await page.goto(`chrome-extension://${EXTENSION_ID}/newtab.html`, {
      |              ^ Error: page.goto: net::ERR_BLOCKED_BY_CLIENT at chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html
  58  |     waitUntil: 'domcontentloaded', // Don't wait for network
  59  |   });
  60  | 
  61  |   return page;
  62  | }
  63  | 
  64  | // ──────────────────────────────────────────────────────────────────────────
  65  | // Test Group: Write Queue & Buffering
  66  | // ──────────────────────────────────────────────────────────────────────────
  67  | 
  68  | test.describe('Offline: Write Queue & Buffering', () => {
  69  |   test('should queue writes when offline', async ({ context }) => {
  70  |     const page = await openExtensionWithMockedAPI(context);
  71  | 
  72  |     // Go offline first
  73  |     await goOffline(page);
  74  | 
  75  |     const writes: [string, string][] = [];
  76  |     for (let i = 0; i < 5; i++) {
  77  |       const key = `offline_key_${i}`;
  78  |       const value = `offline_value_${i}`;
  79  |       writes.push([key, value]);
  80  |     }
  81  | 
  82  |     // Perform writes while offline
  83  |     await page.evaluate((items) => {
  84  |       items.forEach(([k, v]) => {
  85  |         window.localStorage.setItem(k, v);
  86  |       });
  87  |     }, writes);
  88  | 
  89  |     // Verify writes are in-memory (localStorage)
  90  |     const queued = await page.evaluate((items) => {
  91  |       return items.map(([k]) => [k, window.localStorage.getItem(k)]);
  92  |     }, writes);
  93  | 
  94  |     writes.forEach(([k, v], i) => {
  95  |       expect(queued[i][1]).toBe(v);
  96  |     });
  97  | 
  98  |     // Back online
  99  |     await goOnline(page);
  100 |   });
  101 | 
  102 |   test('should persist queue metadata during offline session', async ({ context }) => {
  103 |     const page = await openExtensionWithMockedAPI(context);
  104 | 
  105 |     await goOffline(page);
  106 | 
  107 |     // Write a marker to track offline status
  108 |     const offlineMarker = '__offline_queue_marker';
  109 |     await page.evaluate((marker) => {
  110 |       window.localStorage.setItem(marker, JSON.stringify({
  111 |         queueStart: Date.now(),
  112 |         itemCount: 5,
  113 |       }));
  114 |     }, offlineMarker);
  115 | 
  116 |     // Reload page (simulates crash/restart while offline)
  117 |     await page.reload({ waitUntil: 'domcontentloaded' });
  118 | 
  119 |     // Queue metadata should survive reload
  120 |     const metadata = await page.evaluate((marker) => {
  121 |       const raw = window.localStorage.getItem(marker);
  122 |       return raw ? JSON.parse(raw) : null;
  123 |     }, offlineMarker);
  124 | 
  125 |     expect(metadata).toBeTruthy();
  126 |     expect(metadata.itemCount).toBe(5);
  127 | 
  128 |     await goOnline(page);
  129 |   });
  130 | 
  131 |   test('should not lose writes on page reload while offline', async ({ context }) => {
  132 |     const page = await openExtensionWithMockedAPI(context);
  133 | 
  134 |     await goOffline(page);
  135 | 
  136 |     const testKey = 'critical_data_offline';
  137 |     const testValue = JSON.stringify({ form: 'PHQ-9', score: 15 });
  138 | 
  139 |     // Write critical data
  140 |     await page.evaluate(({ k, v }) => {
  141 |       window.localStorage.setItem(k, v);
  142 |     }, { k: testKey, v: testValue });
  143 | 
  144 |     // Reload page
  145 |     await page.reload({ waitUntil: 'domcontentloaded' });
  146 | 
  147 |     // Data should still be there
  148 |     const retrieved = await page.evaluate(({ k }) => {
  149 |       return window.localStorage.getItem(k);
  150 |     }, { k: testKey });
  151 | 
  152 |     expect(retrieved).toBe(testValue);
  153 | 
  154 |     await goOnline(page);
  155 |   });
  156 | 
  157 |   test('should flag writes as pending vs. synced', async ({ context }) => {
```