import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const EXTENSION_PATH = path.resolve(__dirname, '..');

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],

  projects: [
    // ── UI regression (drag-drop, conditional logic, role access) ──
    {
      name: 'ui-regression',
      testMatch: 'ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        // Launch with the extension loaded so chrome.* APIs are available.
        launchOptions: {
          args: [
            `--disable-extensions-except=${EXTENSION_PATH}`,
            `--load-extension=${EXTENSION_PATH}`,
            '--no-sandbox',
          ],
        },
        // Extensions require a headed channel.
        channel: 'chrome',
      },
    },

    // ── Cross-browser MV3 compatibility ──
    {
      name: 'cross-browser',
      testMatch: 'cross-browser/**/*.spec.ts',
      use: { headless: false },
    },

    // ── Offline / service-worker simulation ──
    {
      name: 'offline',
      testMatch: 'offline/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            `--disable-extensions-except=${EXTENSION_PATH}`,
            `--load-extension=${EXTENSION_PATH}`,
            '--no-sandbox',
          ],
        },
        channel: 'chrome',
      },
    },
  ],
});
