# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\ui-regression.spec.ts >> Drag-and-Drop Form Building >> should drag a saved block onto the canvas
- Location: ui\ui-regression.spec.ts:62:7

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
    - paragraph [ref=e9]: This page has been blocked by Chrome
    - generic [ref=e10]: ERR_BLOCKED_BY_CLIENT
  - button "Reload" [ref=e13] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * UI Regression Tests: Drag-Drop, Conditional Logic, Role-Based Access
  5   |  * 
  6   |  * Tests drag-and-drop form building interactions, conditional visibility
  7   |  * branching logic, and role-based access restrictions.
  8   |  */
  9   | 
  10  | const EXTENSION_ID = 'oemikpjlfbdofmlpjcfpklaglpfgakjf'; // Replace with actual extension ID after install
  11  | 
  12  | async function openFormBuilder(page: Page): Promise<void> {
  13  |   // Navigate to newtab.html which hosts the sandboxed app.html iframe
> 14  |   await page.goto(`chrome-extension://${EXTENSION_ID}/newtab.html`, {
      |              ^ Error: page.goto: net::ERR_BLOCKED_BY_CLIENT at chrome-extension://oemikpjlfbdofmlpjcfpklaglpfgakjf/newtab.html
  15  |     waitUntil: 'networkidle',
  16  |   });
  17  |   // Wait for the app to initialize and become interactive
  18  |   await page.waitForFunction(() => {
  19  |     const app = window.__credifyApp; // App might set this global
  20  |     return app ? true : false;
  21  |   });
  22  | }
  23  | 
  24  | async function switchUser(page: Page, userRole: 'admin' | 'editor' | 'viewer'): Promise<void> {
  25  |   // Click user menu in topbar
  26  |   const userChip = page.locator('[id="user-chip-avatar"]').first();
  27  |   await userChip.click();
  28  | 
  29  |   // Select user by role from the dropdown menu
  30  |   const roleOption = page.locator(`button:has-text("${userRole}")`).first();
  31  |   await roleOption.click();
  32  | 
  33  |   // Wait for the app to re-render with new user context
  34  |   await page.waitForTimeout(300);
  35  | }
  36  | 
  37  | // ──────────────────────────────────────────────────────────────────────────
  38  | // Test Group: Drag-and-Drop
  39  | // ──────────────────────────────────────────────────────────────────────────
  40  | 
  41  | test.describe('Drag-and-Drop Form Building', () => {
  42  |   test('should drag a field from palette onto the canvas', async ({ page }) => {
  43  |     await openFormBuilder(page);
  44  | 
  45  |     // Locate a draggable field in the left palette (e.g., "Short text")
  46  |     const textFieldPalette = page.locator('[data-type="text"]').first();
  47  |     const canvas = page.locator('.canvas').first();
  48  | 
  49  |     // Perform drag-and-drop
  50  |     await textFieldPalette.dragTo(canvas);
  51  | 
  52  |     // Verify that a new field card was added to the canvas
  53  |     const fieldCards = page.locator('.field-card');
  54  |     const count = await fieldCards.count();
  55  |     expect(count).toBeGreaterThan(0);
  56  | 
  57  |     // The newly added field should be visible
  58  |     const newField = fieldCards.last();
  59  |     await expect(newField).toBeVisible();
  60  |   });
  61  | 
  62  |   test('should drag a saved block onto the canvas', async ({ page }) => {
  63  |     await openFormBuilder(page);
  64  | 
  65  |     // First, ensure at least one block is saved (or create one)
  66  |     const blockInPalette = page.locator('.block-card').first();
  67  |     if ((await blockInPalette.count()) > 0) {
  68  |       const canvas = page.locator('.canvas').first();
  69  |       await blockInPalette.dragTo(canvas);
  70  | 
  71  |       // Verify rows were added (block expands into one or more rows)
  72  |       const rows = page.locator('.row');
  73  |       const initialCount = await rows.count();
  74  |       expect(initialCount).toBeGreaterThan(0);
  75  |     }
  76  |   });
  77  | 
  78  |   test('should reorder rows via drag-and-drop', async ({ page }) => {
  79  |     await openFormBuilder(page);
  80  | 
  81  |     // Get first two draggable rows
  82  |     const rows = page.locator('.form-row-item, [data-testid="form-row"]');
  83  |     const firstRow = rows.first();
  84  |     const secondRow = rows.nth(1);
  85  | 
  86  |     // Get initial text/labels to verify they swap positions
  87  |     const firstLabel = await firstRow.textContent();
  88  |     const secondLabel = await secondRow.textContent();
  89  | 
  90  |     // Drag second row above first
  91  |     await secondRow.dragTo(firstRow);
  92  | 
  93  |     // After reorder, verify positions have swapped
  94  |     const reorderedFirst = rows.first();
  95  |     const reorderedSecond = rows.nth(1);
  96  |     const newFirstLabel = await reorderedFirst.textContent();
  97  |     const newSecondLabel = await reorderedSecond.textContent();
  98  | 
  99  |     // Labels should have swapped if reorder was successful
  100 |     expect(newFirstLabel).not.toBe(firstLabel);
  101 |   });
  102 | 
  103 |   test('should show drop-target indicators while dragging', async ({ page }) => {
  104 |     await openFormBuilder(page);
  105 | 
  106 |     const fieldPalette = page.locator('[data-type="text"]').first();
  107 |     const canvas = page.locator('.canvas').first();
  108 | 
  109 |     // Start drag (without releasing)
  110 |     await fieldPalette.hover();
  111 |     await page.mouse.down();
  112 | 
  113 |     // Move over canvas to trigger drop-target visual
  114 |     await canvas.hover();
```