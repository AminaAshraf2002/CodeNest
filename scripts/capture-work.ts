import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

interface ProjectTarget {
  slug: string;
  url: string;
  isShopifyPassword?: boolean;
  password?: string;
}

const TARGETS: ProjectTarget[] = [
  { slug: "exportssp", url: "https://exportssp.com/" },
  { slug: "lanspice", url: "https://lanspice.com/" },
  { slug: "ecoglow", url: "https://ecoglow.ae/" },
  {
    slug: "alliecouture",
    url: "https://alliecouture-sfyxhd71.myshopify.com/password",
    isShopifyPassword: true,
    password: "allie2026",
  },
  { slug: "velvet-key-properties", url: "https://velvet-key-properties.vercel.app/" },
  { slug: "l-studio-salons", url: "https://www.lstudiosalons.in/" },
  { slug: "miracle-feng-shui", url: "https://miracle-feng-shui.vercel.app/" },
  { slug: "mehra-designs", url: "https://mehra-designs.vercel.app/" },
  { slug: "hair-studio", url: "https://hairstudio-gold.vercel.app/" },
  { slug: "lopaz-perfumes", url: "https://lopaz-perfumes.vercel.app/" },
  { slug: "kamath-ceramics", url: "https://kamath-ceramics.vercel.app/" },
];

async function dismissPopups(page: any) {
  const popupSelectors = [
    'button:has-text("Accept")',
    'button:has-text("Accept All")',
    'button:has-text("Agree")',
    'button:has-text("Close")',
    'button:has-text("Dismiss")',
    'button[aria-label="Close"]',
    'button[aria-label="close"]',
    ".modal-close",
    ".popup-close",
    '[data-action="close"]',
    "#onetrust-accept-btn-handler",
    ".cc-btn.cc-dismiss",
  ];

  for (const selector of popupSelectors) {
    try {
      const btn = page.locator(selector).first();
      if (await btn.isVisible({ timeout: 400 })) {
        await btn.click({ force: true });
        await page.waitForTimeout(300);
      }
    } catch {
      // Ignore errors attempting popup dismissal
    }
  }
}

async function captureAll() {
  const outputDir = path.join(process.cwd(), "public", "work");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const failedCaptures: string[] = [];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  for (const target of TARGETS) {
    const outputPath = path.join(outputDir, `${target.slug}-mobile.png`);
    console.log(`\nCapturing mobile screenshot for: ${target.slug} (${target.url})...`);

    const page = await context.newPage();

    try {
      await page.goto(target.url, { waitUntil: "networkidle", timeout: 25000 });

      // Shopify password handling for Allie Couture
      if (target.isShopifyPassword && target.password) {
        console.log("Entering Shopify store password...");
        try {
          const pwdField = page.locator('input[type="password"]');
          if (await pwdField.count()) {
            await pwdField.first().fill(target.password);
            await page.keyboard.press("Enter");
            await page.waitForLoadState("networkidle", { timeout: 12000 });
          }
        } catch (pe) {
          console.warn("Shopify password interaction notice:", pe);
        }
      }

      // Wait network idle plus 2.5 seconds
      await page.waitForTimeout(2500);

      // Dismiss popups
      await dismissPopups(page);
      await page.waitForTimeout(500);

      // Capture top of the page
      await page.screenshot({
        path: outputPath,
        fullPage: false,
      });

      console.log(`Saved: ${outputPath}`);
    } catch (err) {
      console.error(`Failed to capture ${target.slug}:`, err);
      failedCaptures.push(target.slug);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (failedCaptures.length > 0) {
    console.log("\nCaptures that failed:", failedCaptures);
  } else {
    console.log("\nAll mobile screenshots captured successfully!");
  }
}

if (require.main === module) {
  captureAll().catch((err) => {
    console.error("Capture process error:", err);
    process.exit(1);
  });
}

export { captureAll };
