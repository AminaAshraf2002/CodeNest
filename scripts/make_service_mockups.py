import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_mockup(
    screenshot_path: str,
    output_path: str,
    url_text: str,
    badge_tag: str,
    floating_pill_top: str,
    floating_card_bottom: tuple,
    is_speed_dashboard: bool = False
):
    W, H = 1600, 1000
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    draw = ImageDraw.Draw(canvas)

    # 1. Background: Deep luxury dark studio background with subtle radial olive glow
    bg = Image.new("RGBA", (W, H), (6, 8, 5, 255))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    # Soft olive/gold radial gradient in center-bottom
    cx, cy = W // 2, H // 2 + 50
    for r in range(450, 0, -15):
        alpha = int(22 * (1.0 - (r / 450.0)))
        glow_draw.ellipse(
            [cx - r * 1.6, cy - r, cx + r * 1.6, cy + r],
            fill=(163, 184, 52, alpha)
        )
    glow = glow.filter(ImageFilter.GaussianBlur(50))
    bg = Image.alpha_composite(bg, glow)

    # Subtle tech dot grid in background
    grid_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_overlay)
    for x in range(40, W, 40):
        for y in range(40, H, 40):
            grid_draw.rectangle([x, y, x + 1, y + 1], fill=(255, 255, 255, 12))
    bg = Image.alpha_composite(bg, grid_overlay)

    # 2. Window geometry:
    win_w, win_h = 1380, 800
    win_x = (W - win_w) // 2
    win_y = (H - win_h) // 2 - 10
    chrome_h = 56
    screen_h = win_h - chrome_h

    # Shadow under window
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle(
        [win_x + 15, win_y + 35, win_x + win_w - 15, win_y + win_h + 45],
        radius=20,
        fill=(0, 0, 0, 210)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(35))
    canvas = Image.alpha_composite(canvas, bg)
    canvas = Image.alpha_composite(canvas, shadow)

    # 3. Window Container
    win_img = Image.new("RGBA", (win_w, win_h), (0, 0, 0, 0))
    win_draw = ImageDraw.Draw(win_img)

    # Window background
    win_draw.rounded_rectangle(
        [0, 0, win_w, win_h],
        radius=14,
        fill=(15, 18, 14, 255)
    )

    # Chrome bar
    win_draw.rounded_rectangle(
        [0, 0, win_w, chrome_h + 10],
        radius=14,
        fill=(22, 26, 20, 255)
    )
    win_draw.rectangle([0, chrome_h, win_w, chrome_h + 10], fill=(15, 18, 14, 255))
    # Line below chrome
    win_draw.line([(0, chrome_h), (win_w, chrome_h)], fill=(255, 255, 255, 28), width=1)

    # Fonts
    try:
        font_url = ImageFont.truetype("Inter.ttf", 16)
        font_pill = ImageFont.truetype("SpaceGrotesk.ttf", 15)
        font_bold = ImageFont.truetype("SpaceGrotesk.ttf", 18)
        font_large = ImageFont.truetype("SpaceGrotesk.ttf", 48)
        font_stat = ImageFont.truetype("SpaceGrotesk.ttf", 28)
    except:
        font_url = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 16)
        font_pill = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 15)
        font_bold = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 18)
        font_large = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 48)
        font_stat = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 28)

    # macOS window traffic lights (red, yellow, green)
    dot_y = chrome_h // 2
    dots = [
        (34, (255, 95, 86)),
        (56, (255, 189, 46)),
        (78, (39, 201, 63))
    ]
    for dx, color in dots:
        win_draw.ellipse([dx - 6, dot_y - 6, dx + 6, dot_y + 6], fill=color)

    # URL bar in center
    url_w, url_h = 560, 32
    url_x = (win_w - url_w) // 2
    url_y = (chrome_h - url_h) // 2
    win_draw.rounded_rectangle(
        [url_x, url_y, url_x + url_w, url_y + url_h],
        radius=8,
        fill=(11, 13, 10, 255),
        outline=(255, 255, 255, 30),
        width=1
    )
    # Lock icon symbol and URL text
    win_draw.text((url_x + 18, url_y + 6), f"🔒 {url_text}", fill=(220, 225, 215, 210), font=font_url)

    # Right side badge in chrome
    badge_text = badge_tag
    bbox = win_draw.textbbox((0, 0), badge_text, font=font_pill)
    bw = (bbox[2] - bbox[0]) + 30
    bx = win_w - bw - 25
    by = (chrome_h - 28) // 2
    win_draw.rounded_rectangle(
        [bx, by, bx + bw, by + 28],
        radius=14,
        fill=(163, 184, 52, 40),
        outline=(163, 184, 52, 100),
        width=1
    )
    win_draw.ellipse([bx + 10, by + 10, bx + 18, by + 18], fill=(196, 216, 74, 255))
    win_draw.text((bx + 24, by + 4), badge_text, fill=(225, 235, 180, 255), font=font_pill)

    # Screen Content:
    if is_speed_dashboard:
        # Custom High-Velocity Performance Dashboard
        screen_img = Image.new("RGBA", (win_w, screen_h), (9, 11, 8, 255))
        s_draw = ImageDraw.Draw(screen_img)

        # Header metrics bar
        s_draw.rectangle([0, 0, win_w, 60], fill=(13, 16, 12, 255))
        s_draw.text((40, 16), "GOOGLE LIGHTHOUSE AUDIT // PRODUCTION ENVIRONMENT", fill=(196, 216, 74, 255), font=font_bold)
        s_draw.text((win_w - 240, 16), "STATUS: 100% HEALTHY", fill=(39, 201, 63, 255), font=font_pill)

        # Big Circular 100 Score
        sc_x, sc_y, sc_r = 280, 260, 110
        s_draw.ellipse([sc_x - sc_r, sc_y - sc_r, sc_x + sc_r, sc_y + sc_r], outline=(35, 42, 30, 255), width=18)
        s_draw.arc([sc_x - sc_r, sc_y - sc_r, sc_x + sc_r, sc_y + sc_r], start=0, end=360, fill=(196, 216, 74, 255), width=18)
        s_draw.text((sc_x - 45, sc_y - 38), "100", fill=(255, 255, 255, 255), font=font_large)
        s_draw.text((sc_x - 55, sc_y + 22), "PERFORMANCE", fill=(196, 216, 74, 220), font=font_pill)

        # Metrics Grid (Right Column)
        metrics = [
            ("First Contentful Paint (FCP)", "0.38s", "Top 1% Worldwide", (196, 216, 74)),
            ("Largest Contentful Paint (LCP)", "0.62s", "Target: < 2.5s", (196, 216, 74)),
            ("Cumulative Layout Shift (CLS)", "0.000", "Zero Visual Jitter", (39, 201, 63)),
            ("Time to First Byte (TTFB)", "42ms", "Edge Cached Globally", (196, 216, 74)),
            ("Total Blocking Time (TBT)", "0ms", "Instant Interactivity", (39, 201, 63)),
            ("Cloud Uptime (Last 365 Days)", "99.98%", "Multi-Region Redundancy", (196, 216, 74)),
        ]

        mx_start, my_start = 540, 120
        for i, (title, val, note, col) in enumerate(metrics):
            row = i // 2
            col_idx = i % 2
            card_x = mx_start + col_idx * 390
            card_y = my_start + row * 115

            s_draw.rounded_rectangle(
                [card_x, card_y, card_x + 365, card_y + 95],
                radius=10,
                fill=(16, 20, 15, 255),
                outline=(255, 255, 255, 18),
                width=1
            )
            s_draw.text((card_x + 18, card_y + 14), title, fill=(180, 185, 175, 220), font=font_pill)
            s_draw.text((card_x + 18, card_y + 44), val, fill=col, font=font_stat)
            s_draw.text((card_x + 150, card_y + 54), note, fill=(140, 145, 135, 180), font=font_url)

        # CDN Edge Status Strip at bottom
        s_draw.rectangle([0, screen_h - 70, win_w, screen_h], fill=(13, 16, 12, 255))
        s_draw.text((40, screen_h - 48), "EDGE NETWORK: VERCEL GLOBAL CDN // CLOUDFLARE ENTERPRISE DNS // BROTLI COMPRESSION", fill=(140, 145, 135, 200), font=font_url)

    else:
        # Load and crop real high-resolution screenshot
        sc_img = Image.open(screenshot_path).convert("RGBA")
        sc_w, sc_h = sc_img.size

        # Crop from top of screenshot to show clean hero header & content
        target_aspect = win_w / screen_h
        crop_w = sc_w
        crop_h = int(crop_w / target_aspect)
        if crop_h > sc_h:
            crop_h = sc_h
            crop_w = int(crop_h * target_aspect)

        sc_cropped = sc_img.crop((0, 0, crop_w, crop_h))
        screen_img = sc_cropped.resize((win_w, screen_h), Image.Resampling.LANCZOS)

    # Paste screen content onto window
    win_img.paste(screen_img, (0, chrome_h))

    # Diagonal glass glare across screen
    glare = Image.new("RGBA", (win_w, screen_h), (0, 0, 0, 0))
    glare_draw = ImageDraw.Draw(glare)
    glare_draw.polygon(
        [(0, 0), (win_w // 2, 0), (0, screen_h)],
        fill=(255, 255, 255, 14)
    )
    win_img.paste(glare, (0, chrome_h), glare)

    # Subtle border around entire window
    win_draw.rounded_rectangle(
        [0, 0, win_w - 1, win_h - 1],
        radius=14,
        outline=(255, 255, 255, 45),
        width=1
    )

    # Composite window onto canvas
    canvas.paste(win_img, (win_x, win_y), win_img)

    # 4. Floating Overlays (Depth & High-End Polish)
    # Floating Pill (Top-Right)
    fp_text = floating_pill_top
    f_bbox = draw.textbbox((0, 0), fp_text, font=font_bold)
    fp_w = (f_bbox[2] - f_bbox[0]) + 40
    fp_h = 44
    fp_x = win_x + win_w - fp_w + 30
    fp_y = win_y - 20

    fp_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fps_draw = ImageDraw.Draw(fp_shadow)
    fps_draw.rounded_rectangle([fp_x, fp_y + 8, fp_x + fp_w, fp_y + fp_h + 8], radius=22, fill=(0, 0, 0, 180))
    fp_shadow = fp_shadow.filter(ImageFilter.GaussianBlur(14))
    canvas = Image.alpha_composite(canvas, fp_shadow)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        [fp_x, fp_y, fp_x + fp_w, fp_y + fp_h],
        radius=22,
        fill=(18, 22, 16, 245),
        outline=(196, 216, 74, 180),
        width=1
    )
    draw.text((fp_x + 20, fp_y + 11), fp_text, fill=(240, 248, 220, 255), font=font_bold)

    # Floating Card (Bottom-Left)
    fc_title, fc_sub = floating_card_bottom
    fc_w, fc_h = 420, 84
    fc_x = win_x - 30
    fc_y = win_y + win_h - fc_h + 30

    fc_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fcs_draw = ImageDraw.Draw(fc_shadow)
    fcs_draw.rounded_rectangle([fc_x, fc_y + 10, fc_x + fc_w, fc_y + fc_h + 10], radius=14, fill=(0, 0, 0, 210))
    fc_shadow = fc_shadow.filter(ImageFilter.GaussianBlur(18))
    canvas = Image.alpha_composite(canvas, fc_shadow)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        [fc_x, fc_y, fc_x + fc_w, fc_y + fc_h],
        radius=14,
        fill=(14, 17, 13, 250),
        outline=(255, 255, 255, 55),
        width=1
    )
    # Status green dot
    draw.ellipse([fc_x + 20, fc_y + 24, fc_x + 30, fc_y + 34], fill=(196, 216, 74, 255))
    draw.text((fc_x + 40, fc_y + 18), fc_title, fill=(245, 248, 240, 255), font=font_bold)
    draw.text((fc_x + 40, fc_y + 46), fc_sub, fill=(180, 188, 170, 210), font=font_pill)

    # Save final high-res JPEG
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    canvas.convert("RGB").save(output_path, "JPEG", quality=94, optimize=True)
    print(f"Generated mockup: {output_path}")

if __name__ == "__main__":
    # 1. Business Websites
    create_mockup(
        screenshot_path="public/work/velvet-key-properties.png",
        output_path="public/services/web.jpg",
        url_text="codenest.dev/luxury-architecture-platform",
        badge_tag="NEXT.JS 15 // SUB-0.8s",
        floating_pill_top="⚡ Sub-0.8s Page Load",
        floating_card_bottom=("Production Next.js / React / Angular", "Enterprise SEO & Core Web Vitals Audit")
    )

    # 2. Animated & 3D Websites
    create_mockup(
        screenshot_path="public/work/miracle-feng-shui.png",
        output_path="public/services/3d.jpg",
        url_text="codenest.dev/spatial-webgl-interactive",
        badge_tag="THREE.JS // WEBGL // 60 FPS",
        floating_pill_top="✦ 60 FPS WebGL Motion",
        floating_card_bottom=("Spatial 3D Experiences & Shaders", "GSAP ScrollTrigger Choreography")
    )

    # 3. E-Commerce (Shopify & Custom Code)
    create_mockup(
        screenshot_path="public/work/kamath-ceramics.png",
        output_path="public/services/shopify.jpg",
        url_text="store.kamathceramics.com/collections",
        badge_tag="SHOPIFY // LIQUID // HEADLESS",
        floating_pill_top="🛒 High-Conversion Store",
        floating_card_bottom=("Custom Shopify Theme & Liquid", "Multi-Currency Stripe & Razorpay Checkout")
    )

    # 4. Custom Coding & Web Apps
    create_mockup(
        screenshot_path="public/work/exportssp.png",
        output_path="public/services/code.jpg",
        url_text="app.exportssp.io/analytics-portal",
        badge_tag="NODE.JS // POSTGRES // GRAPHQL",
        floating_pill_top="⚡ Custom SaaS & Dashboards",
        floating_card_bottom=("Bespoke Enterprise Web Applications", "Secure API Backends & Real-Time Sync")
    )

    # 5. Performance & Ops
    create_mockup(
        screenshot_path="",
        output_path="public/services/speed.jpg",
        url_text="ops.codenest.dev/performance-telemetry",
        badge_tag="LIGHTHOUSE 100 // 99.9% UPTIME",
        floating_pill_top="⚡ 100/100 Core Web Vitals",
        floating_card_bottom=("Global Edge CDN (Vercel / Cloudflare)", "Monthly Performance Audits & WhatsApp Support"),
        is_speed_dashboard=True
    )
