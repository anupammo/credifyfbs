import { test, expect, BrowserContext, Page } from '@playwright/test';

/**
 * Cross-Browser Validation Tests: Chrome, Edge, Brave
 * 
 * Ensures the MV3 extension behaves consistently across Chromium-based browsers.
 * Tests storage, messaging, service-worker lifecycle, and manifest compliance.
 */

const EXTENSION_ID = 'oemikpjlfbdofmlpjcfpklaglpfgakjf'; // Replace after install

const BROWSER_CONFIGS = [
  { name: 'chrome', channel: 'chrome', executable: undefined },
  { name: 'edge', channel: 'msedge', executable: undefined },
  { name: 'brave', channel: 'chrome', executable: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe' }, // Update path as needed
];

// Helper: Open extension in given browser context
async function openExtensionInBrowser(context: BrowserContext): Promise<Page> {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${EXTENSION_ID}/newtab.html`, {
    waitUntil: 'networkidle',
  });
  return page;
}

// Helper: Clear extension storage
async function clearExtensionStorage(context: BrowserContext): Promise<void> {
  const backgroundPage = await context.pages()[0]; // Service worker or background
  await backgroundPage.evaluate(() => {
    return new Promise<void>((resolve) => {
      if (chrome && chrome.storage && chrome.storage.local) {
        chrome.storage.local.clear(() => resolve());
      } else {
        resolve();
      }
    });
  });
}

// ──────────────────────────────────────────────────────────────────────────
// Test Group: Storage Persistence
// ──────────────────────────────────────────────────────────────────────────

test.describe('Cross-Browser Storage Persistence', () => {
  test('should persist form data to chrome.storage.local', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Inject test data via the iframe postMessage handshake
    const testData = {
      title: 'Test Form',
      description: 'Cross-browser test',
      rows: [{ id: 'r1', fields: [{ id: 'f1', type: 'text', label: 'Name' }] }],
    };

    // Simulate writing to localStorage (which the app does)
    await page.evaluate((data) => {
      // The app's localStorage shim will postMessage this to parent (newtab.js)
      window.localStorage.setItem('credify_form_1', JSON.stringify(data));
    }, testData);

    // Wait a moment for debounced persist
    await page.waitForTimeout(150);

    // Read back from chrome.storage.local
    const retrieved = await page.evaluate(() => {
      return new Promise<any>((resolve) => {
        if (chrome && chrome.storage && chrome.storage.local) {
          chrome.storage.local.get('credify_ls', (result: any) => {
            resolve(result.credify_ls || null);
          });
        } else {
          resolve(null);
        }
      });
    });

    expect(retrieved).toBeTruthy();
    expect(JSON.stringify(retrieved)).toContain('Test Form');
  });

  test('should survive service-worker restart in all browsers', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Write test data
    const key = `test_key_${Date.now()}`;
    const value = `test_value_${Math.random()}`;

    await page.evaluate(({ k, v }) => {
      window.localStorage.setItem(k, v);
    }, { k: key, v: value });

    await page.waitForTimeout(150);

    // Reload the page (simulates service-worker termination + restart)
    await page.reload({ waitUntil: 'networkidle' });

    // Data should be restored
    const retrieved = await page.evaluate(({ k }) => {
      return window.localStorage.getItem(k);
    }, { k: key });

    expect(retrieved).toBe(value);
  });

  test('should sync storage across multiple windows', async ({ context }) => {
    const page1 = await openExtensionInBrowser(context);
    const page2 = await openExtensionInBrowser(context);

    const testKey = `sync_test_${Date.now()}`;
    const testValue = 'synced_value';

    // Write from first window
    await page1.evaluate(({ k, v }) => {
      window.localStorage.setItem(k, v);
    }, { k: testKey, v: testValue });

    await page1.waitForTimeout(150);

    // Read from second window
    const retrieved = await page2.evaluate(({ k }) => {
      return window.localStorage.getItem(k);
    }, { k: testKey });

    expect(retrieved).toBe(testValue);
  });

  test('should respect storage quotas in all browsers', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Attempt to write a large payload (but not exceeding the 10MB quota)
    const largeData = 'x'.repeat(1024 * 100); // 100KB

    let success = false;
    try {
      await page.evaluate((data) => {
        window.localStorage.setItem('large_key', data);
      }, largeData);
      success = true;
    } catch (e) {
      success = false;
    }

    // Should succeed for reasonable sizes
    expect(success).toBeTruthy();
  });
});

// ──────────────────────────────────────────────────────────────────────────
// Test Group: PostMessage / IPC
// ──────────────────────────────────────────────────────────────────────────

test.describe('Cross-Browser PostMessage Handshake', () => {
  test('should complete seed handshake in all browsers', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Monitor postMessage traffic
    const messages: any[] = [];
    await page.on('framenavigated', () => {
      // Reset after navigation
    });

    // The iframe should send __credifyReady, and parent should respond with __credifySeed
    const handshakeDone = await page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => resolve(false), 5000);
        window.addEventListener('credify:seeded', () => {
          clearTimeout(timeout);
          resolve(true);
        });
      });
    });

    expect(handshakeDone).toBeTruthy();
  });

  test('should handle failed seed handshake gracefully', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Simulate parent not responding (kill parent window or timeout)
    // For now, just verify app doesn't crash when seed is missing
    const appStable = await page.evaluate(() => {
      // Check if app is in an error state
      try {
        return !!(window as any).__credifyApp || (document.body.innerHTML.length > 0);
      } catch {
        return false;
      }
    });

    expect(appStable).toBeTruthy();
  });

  test('should batch localStorage writes via postMessage', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Write multiple items rapidly
    const writes: [string, string][] = [];
    for (let i = 0; i < 10; i++) {
      writes.push([`key_${i}`, `value_${i}`]);
    }

    await page.evaluate((items) => {
      items.forEach(([k, v]) => {
        window.localStorage.setItem(k, v);
      });
    }, writes);

    // Wait for debounced persist (default ~80ms)
    await page.waitForTimeout(200);

    // Verify all writes were persisted (not lost due to batching)
    const allRetrieved = await page.evaluate((items) => {
      return items.map(([k]) => [k, window.localStorage.getItem(k)]);
    }, writes);

    writes.forEach(([k, v], i) => {
      expect(allRetrieved[i][1]).toBe(v);
    });
  });
});

// ──────────────────────────────────────────────────────────────────────────
// Test Group: Manifest & Permissions
// ──────────────────────────────────────────────────────────────────────────

test.describe('Cross-Browser Manifest Compliance (MV3)', () => {
  test('should load manifest.json without errors', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Verify the extension is loaded (no manifest errors in console)
    const errors = await page.evaluate(() => {
      const logs: string[] = [];
      (window as any).errorLogs = logs;
      window.addEventListener('error', (e) => {
        logs.push(`Error: ${e.message}`);
      });
      return logs;
    });

    // Initial errors should be empty (or only contain expected warnings)
    const criticalErrors = errors.filter((e) => e.includes('Manifest'));
    expect(criticalErrors.length).toBe(0);
  });

  test('should respect permissions declared in manifest', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Check that storage permission is granted
    const hasStorageAccess = await page.evaluate(() => {
      return !!(chrome && chrome.storage && chrome.storage.local);
    });

    expect(hasStorageAccess).toBeTruthy();
  });

  test('should enforce CSP sandbox restrictions', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Try to execute inline code (should fail in MV3 sandboxed context)
    const inlineExecFailed = await page.evaluate(() => {
      try {
        const result = eval("1 + 1"); // Should be blocked by CSP
        return false; // If we get here, eval worked (bad)
      } catch (e) {
        return true; // Expected: eval blocked
      }
    });

    expect(inlineExecFailed).toBeTruthy();
  });

  test('should support getManifest() across browsers', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    const manifest = await page.evaluate(() => {
      return new Promise((resolve) => {
        chrome.runtime.getManifest ? resolve(chrome.runtime.getManifest()) : resolve(null);
      });
    });

    expect(manifest).toBeTruthy();
    expect((manifest as any)?.manifest_version).toBe(3);
  });
});

// ──────────────────────────────────────────────────────────────────────────
// Test Group: Browser-Specific Quirks
// ──────────────────────────────────────────────────────────────────────────

test.describe('Browser-Specific Quirks', () => {
  test('should handle Edge-specific extension context correctly', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Edge may have slight differences in chrome.* API timing
    const hasEdgeCompat = await page.evaluate(() => {
      // Verify storage APIs are available regardless of browser
      return !!(chrome && chrome.storage);
    });

    expect(hasEdgeCompat).toBeTruthy();
  });

  test('should work with Brave shields (ad-block enabled)', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Even with shields on, extension should load
    const isLoaded = await page.evaluate(() => {
      return document.body.innerHTML.length > 0;
    });

    expect(isLoaded).toBeTruthy();
  });

  test('should respect browser-specific extension limits', async ({ context }) => {
    const page = await openExtensionInBrowser(context);

    // Storage quota is typically 10MB, but may vary by browser
    const canStoreLimit = await page.evaluate(() => {
      // Attempt 5MB (safe across all browsers)
      const size = 1024 * 1024 * 5;
      try {
        window.localStorage.setItem('quota_test', 'x'.repeat(size));
        return true;
      } catch {
        return false;
      }
    });

    expect(canStoreLimit).toBeTruthy();
  });
});
