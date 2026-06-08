/**
 * Test Utilities & Helpers
 * 
 * Shared utilities for extension testing across all test suites.
 */

import { Page, BrowserContext } from '@playwright/test';

/**
 * Navigate to the extension's new-tab UI (newtab.html)
 */
export async function openExtensionUI(page: Page, extensionId: string): Promise<void> {
  await page.goto(`chrome-extension://${extensionId}/newtab.html`, {
    waitUntil: 'networkidle',
  });
}

/**
 * Wait for the app to be fully initialized
 */
export async function waitForAppReady(page: Page, timeout: number = 5000): Promise<void> {
  await page.waitForFunction(
    () => {
      const app = document.querySelector('.app');
      const frame = document.querySelector('#app-frame');
      return app && frame ? true : false;
    },
    { timeout }
  );
}

/**
 * Get the sandboxed iframe (app.html)
 */
export function getAppFrame(page: Page): Promise<Page | null> {
  const frames = page.frames();
  return Promise.resolve(
    frames.find((f) => f.name() === 'app-frame') || frames[frames.length - 1] || null
  );
}

/**
 * Execute JavaScript in the app's iframe context
 */
export async function evalInApp(page: Page, script: string): Promise<any> {
  const frame = await getAppFrame(page);
  if (!frame) throw new Error('App frame not found');
  return frame.evaluate(script);
}

/**
 * Clear all extension storage
 */
export async function clearExtensionStorage(context: BrowserContext): Promise<void> {
  const pages = context.pages();
  if (pages.length === 0) return;

  await pages[0].evaluate(() => {
    return new Promise<void>((resolve) => {
      if (chrome?.storage?.local?.clear) {
        chrome.storage.local.clear(() => resolve());
      } else {
        resolve();
      }
    });
  });
}

/**
 * Set a user role in the app's state (for testing RBAC)
 */
export async function setUserRole(
  page: Page,
  role: 'admin' | 'editor' | 'viewer'
): Promise<void> {
  await page.evaluate((r) => {
    window.localStorage.setItem('__test_user_role', r);
  }, role);

  // Trigger app re-render
  await page.reload({ waitUntil: 'domcontentloaded' });
}

/**
 * Create a test form with sample fields
 */
export async function createTestForm(page: Page): Promise<{ formId: string; fieldCount: number }> {
  const result = await page.evaluate(() => {
    const formId = `test_form_${Date.now()}`;
    const form = {
      id: formId,
      title: 'Test Form',
      description: 'Auto-generated test form',
      rows: [
        {
          id: `row_1`,
          fields: [
            {
              id: 'f1',
              type: 'text',
              label: 'Name',
              span: 6,
            },
            {
              id: 'f2',
              type: 'email',
              label: 'Email',
              span: 6,
            },
          ],
        },
        {
          id: `row_2`,
          fields: [
            {
              id: 'f3',
              type: 'textarea',
              label: 'Comments',
              span: 12,
            },
          ],
        },
      ],
    };

    window.localStorage.setItem(formId, JSON.stringify(form));
    return {
      formId,
      fieldCount: form.rows.reduce((sum, r) => sum + r.fields.length, 0),
    };
  });

  return result;
}

/**
 * Simulate dragging an element over a target
 */
export async function dragElementToTarget(
  page: Page,
  sourceSelector: string,
  targetSelector: string
): Promise<void> {
  const source = page.locator(sourceSelector).first();
  const target = page.locator(targetSelector).first();

  if ((await source.count()) === 0 || (await target.count()) === 0) {
    throw new Error('Source or target element not found');
  }

  await source.dragTo(target);
}

/**
 * Get all form data from localStorage
 */
export async function getAllForms(page: Page): Promise<any[]> {
  return page.evaluate(() => {
    const forms: any[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('f_')) {
        const data = window.localStorage.getItem(key);
        if (data) {
          try {
            forms.push(JSON.parse(data));
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }
    return forms;
  });
}

/**
 * Check if the app is in read-only mode
 */
export async function isAppReadOnly(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const appElement = document.querySelector('.app');
    return appElement?.classList.contains('readonly') || false;
  });
}

/**
 * Wait for sync to complete
 */
export async function waitForSync(page: Page, timeout: number = 5000): Promise<void> {
  await page.waitForFunction(
    () => {
      const status = window.localStorage.getItem('__sync_status');
      return status === 'synced' || status === 'idle';
    },
    { timeout }
  );
}

/**
 * Get pending writes queue
 */
export async function getPendingWrites(page: Page): Promise<any[]> {
  return page.evaluate(() => {
    const raw = window.localStorage.getItem('__write_queue');
    return raw ? JSON.parse(raw) : [];
  });
}

/**
 * Simulate offline state using CDP
 */
export async function goOffline(page: Page): Promise<void> {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: true,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0,
  });
}

/**
 * Simulate online state using CDP
 */
export async function goOnline(page: Page): Promise<void> {
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0,
  });
}

/**
 * Get extension manifest
 */
export async function getManifest(page: Page): Promise<any> {
  return page.evaluate(() => {
    return (chrome as any)?.runtime?.getManifest?.() || null;
  });
}

/**
 * Listen for console messages (errors, warnings, logs)
 */
export function captureConsoleLogs(page: Page): Promise<string[]> {
  const logs: string[] = [];
  page.on('console', (msg) => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  return Promise.resolve(logs);
}

/**
 * Wait for a specific localStorage key to be set
 */
export async function waitForStorageKey(
  page: Page,
  key: string,
  timeout: number = 5000
): Promise<string | null> {
  return page.waitForFunction(
    ({ searchKey }) => {
      return window.localStorage.getItem(searchKey);
    },
    { key },
    { timeout }
  );
}
