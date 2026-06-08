# Credify Form Builder — Test Suite

Comprehensive Playwright test suite for the Chrome MV3 extension, covering UI regression testing, cross-browser validation, and offline mode simulation.

## Test Structure

```
tests/
├── package.json              # Test dependencies
├── playwright.config.ts      # Global Playwright config
├── tsconfig.json             # TypeScript config for tests
├── ui/
│   └── ui-regression.spec.ts # Drag-drop, conditional logic, role-based access
├── cross-browser/
│   └── cross-browser.spec.ts # Chrome, Edge, Brave compatibility
└── offline/
    └── offline.spec.ts       # Offline mode, write queues, sync on reconnect
```

## Installation

```bash
cd tests
npm install
```

## Running Tests

### All Tests
```bash
npm test
```

### UI Regression Only
```bash
npm run test:ui
```

### Cross-Browser Validation
```bash
npm run test:cross-browser
```

### Offline Mode Simulation
```bash
npm run test:offline
```

### Debug Mode
```bash
npm run test:debug
```

### View HTML Report
```bash
npm run report
```

---

## Test Coverage

### 1. UI Regression (ui-regression.spec.ts)

#### Drag-and-Drop Form Building
- ✅ Drag field from palette onto canvas
- ✅ Drag saved block onto canvas
- ✅ Reorder rows via drag-and-drop
- ✅ Show drop-target indicators while dragging
- ✅ Prevent drag on read-only forms

#### Conditional Visibility & Skip Logic
- ✅ Mark a field as conditional
- ✅ Set a skip condition on a row
- ✅ Update field visibility in preview based on conditional
- ✅ Clear conditional when toggled off

#### Role-Based Access Control (RBAC)
- ✅ Admin has full edit access
- ✅ Editor sees edit tools but not user management
- ✅ Viewer sees read-only preview only
- ✅ Show role badge in user menu
- ✅ Prevent edit operations for non-editors
- ✅ Reflect access level in share modal

**Key Selectors Used:**
- `.canvas` — Main form editing area
- `.field-card, .field` — Form field elements
- `.pal-item` — Draggable field palette items
- `.block-card` — Reusable block templates
- `.field-conditional` — Fields with conditional logic
- `.role-badge` — Role display badges
- `[data-mode="preview"]` — Read-only/preview mode

---

### 2. Cross-Browser Validation (cross-browser.spec.ts)

#### Storage Persistence
- ✅ Persist form data to `chrome.storage.local`
- ✅ Survive service-worker restart in all browsers
- ✅ Sync storage across multiple windows
- ✅ Respect storage quotas in all browsers

#### PostMessage / IPC Handshake
- ✅ Complete seed handshake in all browsers
- ✅ Handle failed seed handshake gracefully
- ✅ Batch localStorage writes via postMessage

#### Manifest & Permissions (MV3)
- ✅ Load manifest.json without errors
- ✅ Respect permissions declared in manifest
- ✅ Enforce CSP sandbox restrictions
- ✅ Support getManifest() across browsers

#### Browser-Specific Quirks
- ✅ Handle Edge-specific extension context
- ✅ Work with Brave shields (ad-block enabled)
- ✅ Respect browser-specific extension limits

**Browsers Tested:**
- Chrome (Chromium)
- Microsoft Edge (Edgium)
- Brave (Chromium variant)

---

### 3. Offline Mode Simulation (offline.spec.ts)

#### Write Queue & Buffering
- ✅ Queue writes when offline
- ✅ Persist queue metadata during offline session
- ✅ Not lose writes on page reload while offline
- ✅ Flag writes as pending vs. synced

#### Sync on Reconnect
- ✅ Attempt to sync queued writes when coming online
- ✅ Update synced flag after successful reconnect
- ✅ Retry failed sync with exponential backoff

#### UI Feedback & Error Handling
- ✅ Show offline indicator when network is lost
- ✅ Display sync status (syncing, synced, error)
- ✅ Prevent user confusion with clear offline messaging
- ✅ Handle sync errors gracefully (no data loss)
- ✅ Show toast/notification when sync completes

#### Cache Coherency
- ✅ Maintain cache consistency during offline period
- ✅ Prevent concurrent write conflicts
- ✅ Validate data integrity on reconnect

**Network Simulation:**
- Uses Playwright's CDP (Chrome DevTools Protocol) to emulate offline state
- Simulates both temporary network loss and extended offline periods
- Validates queued write persistence and sync ordering

---

## Configuration Details

### playwright.config.ts

```typescript
projects: [
  {
    name: 'ui-regression',
    testMatch: 'ui/**/*.spec.ts',
    use: {
      launchOptions: {
        args: [
          `--disable-extensions-except=${EXTENSION_PATH}`,
          `--load-extension=${EXTENSION_PATH}`,
        ]
      },
      channel: 'chrome',
    },
  },
  // ... cross-browser and offline projects
]
```

**Key Settings:**
- `headless: false` — Required for extension APIs
- `channel: 'chrome'` — Ensures Chromium-based browser
- `--load-extension` — Loads the extension into the test browser
- `timeout: 30_000` — 30-second test timeout
- `retries: 1` — Retry flaky tests once

### Extension Loading

The extension is loaded via the `--load-extension` flag in the browser launch args. The `EXTENSION_PATH` should point to the root of the extension directory (containing `manifest.json`).

**Finding Extension ID:**
After installation, you can find the extension ID by:
1. Running a test and capturing browser logs
2. Checking `chrome://extensions` and enabling Developer Mode
3. Using `chrome://system` → Extensions section

Replace `oemikpjlfbdofmlpjcfpklaglpfgakjf` with the actual ID after first run.

---

## Debugging

### Run Single Test
```bash
npx playwright test ui/ui-regression.spec.ts -g "should drag a field from palette"
```

### Debug Mode with Inspector
```bash
npx playwright test --debug
```

### View Trace
```bash
npx playwright show-trace trace.zip
```

### Screenshot on Failure
Tests automatically capture screenshots on failure (saved in `test-results/`).

---

## Common Issues

### Extension Not Loading
- Verify `EXTENSION_PATH` points to the manifest.json directory
- Ensure manifest.json has `"manifest_version": 3`
- Check that the extension is not already loaded in another browser instance

### "chrome.storage is undefined"
- Tests must run in `headless: false` mode
- The extension needs to be loaded with `--load-extension` flag
- Service worker must have completed initialization

### Network Simulation Not Working
- CDP (Chrome DevTools Protocol) requires headless: false
- Only works with Chromium-based browsers (Chrome, Edge, Brave)
- Firefox is not supported for network emulation in this config

### Timeouts
- Increase timeout in test or global config if your machine is slow
- Check that newtab.html loads without errors
- Verify app.html iframe is being mounted and seeded

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Extension Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd tests && npm install
      - run: cd tests && npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: tests/playwright-report/
```

---

## Performance Considerations

- **Parallel Execution:** Tests run in parallel by default (use `--workers=1` to serialize)
- **Browser Launch:** Each project launches a separate browser instance
- **Storage Cleanup:** Tests should clear extension storage before/after to avoid interference
- **Network Emulation:** CDP overhead ~500ms per test; disable if not needed

---

## Future Enhancements

- [ ] Add visual regression tests (screenshot comparison)
- [ ] Add performance benchmarks (page load, drag-drop responsiveness)
- [ ] Add accessibility (a11y) tests with @axe-core/playwright
- [ ] Mock backend API with Playwright API mocking
- [ ] Add E2E tests for full form submission flow
- [ ] Add tests for form export (JSON, HTML, CSV)
- [ ] Add tests for form scoring/weights calculation
- [ ] Add tests for multi-page form navigation

---

## References

- [Playwright Documentation](https://playwright.dev)
- [Chrome Extension MV3](https://developer.chrome.com/docs/extensions/mv3/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [Credify Extension Code](../app.html)
