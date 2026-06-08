# Test Execution Summary & Setup Guide

## 🚀 Test Suite Status

**Date:** 2026-06-08  
**Tests Discovered:** 44 total across 3 projects  
**Initial Run Result:** ⚠️ All tests pending (awaiting setup)

---

## 📋 Test Inventory

| Project | Tests | Focus | Status |
|---------|-------|-------|--------|
| **ui-regression** | 15 | Drag-drop, conditional logic, RBAC | ⏳ Pending |
| **cross-browser** | 14 | Chrome/Edge/Brave, storage, MV3 | ⏳ Pending |
| **offline** | 15 | Offline queuing, sync, data integrity | ⏳ Pending |

---

## ⚙️ Setup Instructions

### Step 1: Install Playwright Browsers
```bash
cd c:\xampp\htdocs\credifyfbs\tests
npx playwright install
```
This downloads Chrome, Firefox, and WebKit binaries.

### Step 2: Get Your Extension ID

1. **Install the extension in Chrome:**
   ```bash
   # Navigate to chrome://extensions
   # Enable "Developer mode" (toggle in top-right)
   # Click "Load unpacked"
   # Select: C:\xampp\htdocs\credifyfbs
   ```

2. **Find the Extension ID:**
   - After installation, note the ID from `chrome://extensions` (e.g., `oemikpjlfbdofmlpjcfpklaglpfgakjf`)
   - Or check Console: `chrome.runtime.id`

### Step 3: Update Extension ID in Test Files

Replace the placeholder ID `oemikpjlfbdofmlpjcfpklaglpfgakjf` with your actual ID in:

- [ui/ui-regression.spec.ts](ui/ui-regression.spec.ts#L10)
- [cross-browser/cross-browser.spec.ts](cross-browser/cross-browser.spec.ts#L10)
- [offline/offline.spec.ts](offline/offline.spec.ts#L10)

**Quick replace:**
```bash
# Replace with your actual extension ID
$id = "YOUR_ACTUAL_ID_HERE"
(Get-Content "ui\ui-regression.spec.ts") -replace "oemikpjlfbdofmlpjcfpklaglpfgakjf", $id | Set-Content "ui\ui-regression.spec.ts"
(Get-Content "cross-browser\cross-browser.spec.ts") -replace "oemikpjlfbdofmlpjcfpklaglpfgakjf", $id | Set-Content "cross-browser\cross-browser.spec.ts"
(Get-Content "offline\offline.spec.ts") -replace "oemikpjlfbdofmlpjcfpklaglpfgakjf", $id | Set-Content "offline\offline.spec.ts"
```

---

## 🧪 Running Tests

### All Tests
```bash
npm test
```

### Specific Project
```bash
npm run test:ui              # UI regression only
npm run test:cross-browser   # Cross-browser validation
npm run test:offline         # Offline mode tests
```

### Debug Mode
```bash
npm run test:debug
```
Opens Playwright Inspector for step-by-step debugging.

### View Results
```bash
npm run report
```
Opens HTML report of last test run.

---

## 📊 Test Projects Overview

### Project 1: UI Regression (15 tests)
**Path:** `ui/ui-regression.spec.ts`

Tests drag-and-drop form building, conditional logic, and role-based access:
- ✅ Drag-and-Drop (5 tests)
  - Field palette to canvas
  - Saved blocks to canvas
  - Row reordering
  - Drop indicators
  - Read-only prevention

- ✅ Conditional Logic (4 tests)
  - Mark fields as conditional
  - Set skip conditions
  - Preview visibility updates
  - Clear conditionals

- ✅ Role-Based Access (6 tests)
  - Admin full access
  - Editor permissions
  - Viewer read-only
  - Role badges
  - Edit prevention
  - Share modal access levels

### Project 2: Cross-Browser (14 tests)
**Path:** `cross-browser/cross-browser.spec.ts`

Validates MV3 extension across Chrome, Edge, Brave:
- ✅ Storage Persistence (4 tests)
  - chrome.storage.local writes
  - Service-worker restart survival
  - Multi-window sync
  - Storage quota respect

- ✅ PostMessage Handshake (3 tests)
  - Seed handshake completion
  - Failed handshake handling
  - Batched writes

- ✅ MV3 Compliance (4 tests)
  - Manifest loading
  - Permissions enforcement
  - CSP sandbox restrictions
  - getManifest() support

- ✅ Browser Quirks (3 tests)
  - Edge compatibility
  - Brave shields
  - Browser-specific limits

### Project 3: Offline Mode (15 tests)
**Path:** `offline/offline.spec.ts`

Tests offline behavior, write queuing, and sync recovery:
- ✅ Write Queue (4 tests)
  - Queue writes when offline
  - Persist queue metadata
  - Survive page reload
  - Flag pending vs. synced

- ✅ Sync on Reconnect (3 tests)
  - Attempt sync when online
  - Update synced flag
  - Exponential backoff retry

- ✅ UI Feedback (5 tests)
  - Offline indicator
  - Sync status display
  - Clear messaging
  - Error handling
  - Sync completion notifications

- ✅ Cache Coherency (3 tests)
  - Consistency during offline
  - Concurrent write conflicts
  - Data integrity validation

---

## 🛠️ Troubleshooting

### "Extension not found" / "net::ERR_BLOCKED_BY_CLIENT"
- ✅ Verify extension is installed at `C:\xampp\htdocs\credifyfbs`
- ✅ Check Extension ID matches in test files
- ✅ Ensure extension is enabled in Chrome

### "Executable doesn't exist"
- ✅ Run: `npx playwright install`
- ✅ Verify download completed: `ls ~/.cache/ms-playwright` (or equivalent on Windows)

### Tests timeout
- ⏱️ Increase timeout in `playwright.config.ts` (default: 30s)
- ⏱️ Check CPU/disk not overloaded during test run
- ⏱️ Run single project first: `npm run test:ui`

### Permission denied errors
- 🔐 Run terminal as Administrator
- 🔐 Check file permissions on `C:\xampp\htdocs\credifyfbs`
- 🔐 Disable antivirus temporarily if blocking browser launch

---

## 📝 Test Files Structure

```
tests/
├── package.json                      # Dependencies
├── playwright.config.ts              # Global config + 3 projects
├── tsconfig.json                     # TypeScript
├── utils.ts                          # Shared utilities
├── README.md                         # Full documentation
├── ui/
│   └── ui-regression.spec.ts        # 15 UI tests
├── cross-browser/
│   └── cross-browser.spec.ts        # 14 compatibility tests
└── offline/
    └── offline.spec.ts              # 15 offline tests
```

---

## 🎯 Next Steps

1. ✅ Run `npx playwright install` to download browsers
2. ✅ Install extension in Chrome from `C:\xampp\htdocs\credifyfbs`
3. ✅ Get extension ID from `chrome://extensions`
4. ✅ Update extension ID in all three test files
5. ✅ Run `npm test` to execute the full suite
6. ✅ Check `playwright-report/` for detailed results

---

## 📞 Support

- **Playwright Docs:** https://playwright.dev
- **Chrome Extension MV3:** https://developer.chrome.com/docs/extensions/mv3/
- **Test Report:** `npx playwright show-report`

