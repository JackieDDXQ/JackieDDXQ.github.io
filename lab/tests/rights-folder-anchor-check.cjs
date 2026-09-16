// Run against the root preview server on port 8080.
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'playwright');
(async () => {
  const browser = await chromium.launch({channel: 'msedge', headless: true});
  try {
    for (const width of [1440, 1024, 768, 390]) {
      const page = await browser.newPage({viewport: {width, height: 950}});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:8080/projects/rights-management.html#project');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(600);
      const returnPositions = new Map();
      for (const index of [0, 1, 2, 2, 1, 0, 1, 1]) {
        const cover = page.locator(`[data-folder-toggle="${index}"]`);
        await cover.scrollIntoViewIfNeeded();
        await cover.focus();
        const before = await cover.locator('h2').boundingBox();
        const opening = await cover.getAttribute('aria-expanded') === 'false';
        if (opening) returnPositions.set(index, before);
        await cover.press('Enter');
        await page.waitForTimeout(500);
        const after = await cover.locator('h2').boundingBox();
        const target = width > 700 && !opening ? (returnPositions.get(index) || before) : before;
        if (width > 700 && opening) {
          const frame = await page.locator('.canvas-viewport').boundingBox();
          const coverBox = await cover.boundingBox();
          assert.ok(Math.abs(coverBox.x - frame.x - 32) <= 1, `${width}: folder did not dock left`);
        } else {
          assert.ok(Math.abs(after.x - target.x) <= 1, `${width}: return position moved`);
        }
        assert.ok(Math.abs(after.y - target.y) <= 1, `${width}: vertical anchor moved`);
        assert.ok(await cover.evaluate(element => element === document.activeElement));
      }
      assert.deepEqual(errors, []);
      console.log(`PASS ${width}px: left docking, return position and keyboard focus`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
