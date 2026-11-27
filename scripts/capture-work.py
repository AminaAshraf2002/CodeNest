import os
import time
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw

os.makedirs("public/work", exist_ok=True)

TARGETS = [
    {
        "slug": "exportssp",
        "url": "https://exportssp.com/",
        "title": "EXPORTSSP",
        "accent": (196, 216, 74),
        "bg": (12, 14, 10),
    },
    {
        "slug": "lanspice",
        "url": "https://lanspice.com/",
        "title": "LANSPICE",
        "accent": (220, 140, 50),
        "bg": (16, 12, 9),
    },
    {
        "slug": "ecoglow",
        "url": "https://ecoglow.ae/",
        "title": "ECOGLOW",
        "accent": (140, 205, 120),
        "bg": (10, 14, 12),
    },
    {
        "slug": "alliecouture",
        "url": "https://alliecouture-sfyxhd71.myshopify.com/password",
        "password": "allie2026",
        "title": "ALLIE COUTURE",
        "accent": (212, 175, 55),
        "bg": (12, 11, 14),
    },
    {
        "slug": "velvet-key-properties",
        "url": "https://velvet-key-properties.vercel.app/",
        "title": "VELVET KEY PROPERTIES",
        "accent": (205, 185, 75),
        "bg": (9, 11, 13),
    },
    {
        "slug": "l-studio-salons",
        "url": "https://www.lstudiosalons.in/",
        "title": "L STUDIO SALONS",
        "accent": (185, 165, 215),
        "bg": (13, 11, 15),
    },
    {
        "slug": "miracle-feng-shui",
        "url": "https://miracle-feng-shui.vercel.app/",
        "title": "MIRACLE FENG SHUI",
        "accent": (210, 155, 70),
        "bg": (14, 12, 10),
    },
    {
        "slug": "mehra-designs",
        "url": "https://mehra-designs.vercel.app/",
        "title": "MEHRA DESIGNS",
        "accent": (196, 216, 74),
        "bg": (12, 12, 12),
    },
    {
        "slug": "hair-studio",
        "url": "https://hairstudio-gold.vercel.app/",
        "title": "HAIR STUDIO",
        "accent": (220, 180, 60),
        "bg": (11, 11, 11),
    },
    {
        "slug": "lopaz-perfumes",
        "url": "https://lopaz-perfumes.vercel.app/",
        "title": "LOPAZ PERFUMES",
        "accent": (200, 170, 85),
        "bg": (13, 11, 15),
    },
    {
        "slug": "kamath-ceramics",
        "url": "https://kamath-ceramics.vercel.app/",
        "title": "KAMATH CERAMICS",
        "accent": (163, 184, 52),
        "bg": (11, 13, 12),
    },
]

def create_gradient_placeholder(target, output_path):
    w, h = 390 * 2, 844 * 2
    img = Image.new("RGB", (w, h), color=target["bg"])
    d = ImageDraw.Draw(img)
    accent = target["accent"]

    # Top nav
    d.rectangle([(0, 0), (w, 112)], fill=(20, 22, 20))
    d.line([(0, 112), (w, 112)], fill=(60, 64, 60), width=2)
    d.text((64, 38), target["title"], fill=accent)

    # Hero card
    d.rounded_rectangle([(64, 160), (w - 64, 680)], radius=32, fill=(28, 32, 28), outline=(70, 78, 65), width=2)
    d.text((112, 240), target["title"], fill=(244, 244, 239))
    d.text((112, 320), "MOBILE DIGITAL EXPERIENCE", fill=accent)
    d.text((112, 400), "ENGINEERED FOR VELOCITY & CONVERSION", fill=(160, 160, 155))

    # CTA pill
    d.rounded_rectangle([(112, 500), (380, 580)], radius=40, fill=accent)
    d.text((160, 525), "EXPLORE ↗", fill=(0, 0, 0))

    # Additional sections
    for i in range(2):
        top = 740 + i * 260
        d.rounded_rectangle([(64, top), (w - 64, top + 220)], radius=24, fill=(24, 28, 24), outline=(60, 68, 55), width=2)
        d.text((96, top + 40), f"FEATURE SPEC 0{i+1}", fill=(230, 230, 225))
        d.text((96, top + 90), "Next.js / React Mobile Optimized UI", fill=(140, 140, 135))
        d.text((96, top + 140), "ACTIVE DEPLOYMENT ↗", fill=accent)

    img.save(output_path)
    print(f"Created gradient placeholder for {target['slug']} -> {output_path}")

def dismiss_popups(page):
    selectors = [
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
    ]
    for sel in selectors:
        try:
            btn = page.locator(sel).first
            if btn.is_visible(timeout=300):
                btn.click(force=True)
                page.wait_for_timeout(250)
        except Exception:
            pass

def main():
    failed = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=2,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        )

        for target in TARGETS:
            out_file = f"public/work/{target['slug']}-mobile.png"
            print(f"Capturing mobile screenshot: {target['slug']} ({target['url']})...")
            page = context.new_page()

            try:
                page.goto(target["url"], wait_until="networkidle", timeout=20000)

                # Shopify password entry for Allie Couture
                if "password" in target:
                    try:
                        pwd = page.locator('input[type="password"]')
                        if pwd.count() > 0:
                            pwd.first.fill(target["password"])
                            page.keyboard.press("Enter")
                            page.wait_for_load_state("networkidle", timeout=10000)
                    except Exception as pe:
                        print(f"Password entry note for {target['slug']}: {pe}")

                # Wait network idle plus 2.5 seconds
                time.sleep(2.5)

                # Dismiss popups
                dismiss_popups(page)
                time.sleep(0.5)

                # Capture top of page
                page.screenshot(path=out_file, full_page=False)
                print(f"Successfully captured {out_file}")
            except Exception as e:
                print(f"FAILED capture for {target['slug']}: {e}")
                failed.append(target["slug"])
                create_gradient_placeholder(target, out_file)
            finally:
                page.close()

        browser.close()

    print("\nSummary of failed captures:", failed if failed else "None! All succeeded.")

if __name__ == "__main__":
    main()
