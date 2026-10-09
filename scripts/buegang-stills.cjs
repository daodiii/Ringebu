/* eslint-disable @typescript-eslint/no-require-imports -- a plain Node script, run by hand */
// Photographs every arch's scene at rest into public/images/buegang/<slug>.webp,
// the stills the arcade on /behandlinger shows in the arches that are not
// playing. Run against a running build, after changing any arcade scene:
//
//   node scripts/buegang-stills.cjs http://localhost:3100
//
// Needs playwright-core and a Chromium (npx playwright install chromium);
// set PLAYWRIGHT_CORE to its folder if it is not installed in the project.
const path = require("path");
const sharp = require("sharp");
const { chromium } = require(process.env.PLAYWRIGHT_CORE || "playwright-core");

const base = process.argv[2] || "http://localhost:3100";
const out = path.join(__dirname, "..", "public", "images", "buegang");

(async () => {
  require("fs").mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 1400 }, deviceScaleFactor: 2 })).newPage();
  await page.goto(base + "/mockups/buegangen/stillbilder", { waitUntil: "load" });
  // Long enough for the longest routine to stand up, play once and hold
  await page.waitForTimeout(15000);
  for (const el of await page.$$("[data-rom]")) {
    const slug = await el.getAttribute("data-rom");
    const png = await el.screenshot();
    await sharp(png).webp({ quality: 82, effort: 6 }).toFile(path.join(out, `${slug}.webp`));
    console.log(slug);
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
