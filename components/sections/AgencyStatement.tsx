"use client";

import React, { useEffect, useRef } from "react";
import { barlowCondensed } from "@/lib/fonts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ------------------------------------------------------------------
   TUNING KNOBS
------------------------------------------------------------------ */
const SECTION_HEIGHT_VH = 250; // Balanced scroll distance (smooth, snappy, never stuck)
const SCRUB = 0.5; // Responsive sync with Lenis smooth scroll
const TEXT_DIM_OPACITY = 0.35; // Dimmed text brightness while cards are active

// Left-aligned lines with authentic Noozi-style stagger and optical center-shift
const LINES = [
  { text: "WE", indent: "clamp(1.5rem, 4vw, 5.5rem)", fromX: 45 },
  { text: "TURN", indent: "0px", fromX: -45 },
  { text: "YOUR IDEAS", indent: "0px", fromX: 45 },
  { text: "INTO LIVE", indent: "clamp(1rem, 2.5vw, 3.5rem)", fromX: -45 },
  { text: "WEBSITES.", indent: "0px", fromX: 45 },
];

const CARDS = [
  {
    num: "01 / 02",
    text: "Shopify, WordPress and custom-coded websites for businesses in India and the UAE, made to look premium on every device",
  },
  {
    num: "02 / 02",
    text: "Modern websites and powerful e-commerce, with Basic SEO included to help your business grow.",
  },
];

export default function AgencyStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lineInnersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const triangleRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    // Classic olive diagonal slice
    const FULL_TRIANGLE = "polygon(0% 64%, 100% 16%, 100% 100%, 0% 100%)";
    const EMPTY_TRIANGLE = "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)";

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: static layout, no scroll animation
    if (isReducedMotion) {
      lineInnersRef.current.forEach((el) => {
        if (el) gsap.set(el, { x: 0, opacity: 1 });
      });
      if (triangleRef.current) gsap.set(triangleRef.current, { clipPath: FULL_TRIANGLE });
      if (card1Ref.current) gsap.set(card1Ref.current, { opacity: 0, pointerEvents: "none" });
      if (card2Ref.current) gsap.set(card2Ref.current, { opacity: 1, pointerEvents: "auto" });
      return;
    }

    // ==========================================================
    // INITIAL STATES
    // ==========================================================
    lineInnersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { x: `${LINES[i].fromX}vw`, opacity: 1, force3D: true });
    });

    if (triangleRef.current) gsap.set(triangleRef.current, { clipPath: EMPTY_TRIANGLE });
    if (textContainerRef.current) gsap.set(textContainerRef.current, { opacity: 1 });

    if (card1Ref.current) gsap.set(card1Ref.current, { opacity: 0, y: 20, pointerEvents: "none" });
    if (card2Ref.current) gsap.set(card2Ref.current, { opacity: 0, y: 20, pointerEvents: "none" });

    // ==========================================================
    // MASTER TIMELINE (0 -> 1 across the section's scroll distance)
    // ==========================================================
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    // 1. Diagonal olive wedge sweeps in smoothly
    if (triangleRef.current) {
      tl.fromTo(
        triangleRef.current,
        { clipPath: EMPTY_TRIANGLE },
        { clipPath: FULL_TRIANGLE, duration: 0.35, ease: "power2.out" },
        0
      );
    }

    // 2. Lines glide in sequentially into left-aligned positions
    lineInnersRef.current.forEach((el, i) => {
      if (!el) return;
      tl.to(el, { x: "0vw", duration: 0.22, ease: "power3.out" }, i * 0.04);
    });

    // 3. Soft dim of the big text while cards are showing
    if (textContainerRef.current) {
      tl.to(
        textContainerRef.current,
        { opacity: TEXT_DIM_OPACITY, duration: 0.06, ease: "sine.inOut" },
        0.35
      );
    }

    // 4. Card 1: Fades in, stays readable, then fades out smoothly
    if (card1Ref.current) {
      tl.to(
        card1Ref.current,
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.06, ease: "power2.out" },
        0.38
      );
      tl.to(
        card1Ref.current,
        { opacity: 0, y: -20, pointerEvents: "none", duration: 0.06, ease: "power2.in" },
        0.58
      );
    }

    // 5. Card 2: Fades in smoothly into the exact same location, stays readable, then fades out
    if (card2Ref.current) {
      tl.to(
        card2Ref.current,
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.06, ease: "power2.out" },
        0.66
      );
      tl.to(
        card2Ref.current,
        { opacity: 0, y: -20, pointerEvents: "none", duration: 0.06, ease: "power2.in" },
        0.86
      );
    }

    // 6. Restore text brightness before exit
    if (textContainerRef.current) {
      tl.to(
        textContainerRef.current,
        { opacity: 1, duration: 0.08, ease: "sine.out" },
        0.90
      );
    }

    tl.set({}, {}, 1); // Pad to exact boundary

    // ScrollTrigger instance with anticipatePin and smooth scrub
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: SCRUB,
      animation: tl,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const refreshTimer = window.setTimeout(refresh, 500);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="agency-statement"
      className="relative w-full bg-[#050506] z-[10]"
      style={{ height: `${SECTION_HEIGHT_VH}vh`, isolation: "isolate" }}
      aria-label="CodeNest Agency Statement"
    >
      {/* Pinned viewport panel: cleanly un-sticks and scrolls away when section ends */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#050506] flex flex-col justify-center select-none"
        style={{
          paddingLeft: "clamp(3.5rem, 12vw, 18rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          paddingTop: "clamp(75px, 8.5vh, 95px)",
          paddingBottom: "clamp(30px, 5vh, 60px)",
        }}
      >
        {/* BG 1: faint contour lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-15 overflow-hidden"
        >
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-100 150 C 300 80, 600 240, 1100 120 C 1300 70, 1500 180, 1600 200" stroke="#E3D9D1" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.35" />
            <path d="M-100 280 C 250 200, 700 380, 1050 240 C 1300 160, 1520 300, 1600 320" stroke="#E3D9D1" strokeWidth="1" opacity="0.4" />
            <path d="M-100 420 C 350 360, 650 520, 1000 390 C 1280 300, 1480 440, 1600 460" stroke="#E3D9D1" strokeWidth="1.2" opacity="0.3" />
            <path d="M-100 580 C 220 500, 750 680, 1150 510 C 1350 420, 1500 580, 1600 600" stroke="#E3D9D1" strokeWidth="1" strokeDasharray="6 8" opacity="0.35" />
            <path d="M-100 720 C 300 660, 680 820, 1080 670 C 1320 580, 1490 730, 1600 760" stroke="#E3D9D1" strokeWidth="1" opacity="0.4" />
            <path d="M-100 850 C 400 790, 800 920, 1200 800 C 1400 740, 1550 860, 1600 890" stroke="#E3D9D1" strokeWidth="1.2" opacity="0.25" />
          </svg>
        </div>

        {/* BG 2: film grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        {/* BG 3: authentic olive diagonal (#7F9A25) */}
        <div
          ref={triangleRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            willChange: "clip-path",
            background: "linear-gradient(135deg, #7F9A25 0%, #688018 70%, #4D6110 100%)",
            clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
          }}
        />

        {/* LAYER 1: 5 HUGE lines. Barlow Condensed 900 Italic, wide and monumental */}
        <div
          ref={textContainerRef}
          className={`relative z-[10] flex flex-col justify-center w-full ${barlowCondensed.className}`}
          style={{
            willChange: "opacity",
            width: "100%",
            fontSize: "clamp(3.75rem, 15vw, 17.5svh)",
            lineHeight: 0.85,
            letterSpacing: "-0.01em",
          }}
        >
          {LINES.map((line, idx) => (
            <div
              key={idx}
              className="text-left w-full overflow-hidden py-0.5 sm:py-1"
              style={{
                paddingLeft: line.indent,
              }}
            >
              <span
                ref={(el) => {
                  lineInnersRef.current[idx] = el;
                }}
                className="inline-block whitespace-nowrap align-top select-none"
                style={{ willChange: "transform" }}
              >
                <span
                  className="inline-block tracking-tight"
                  style={{
                    fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontStyle: "italic",
                    lineHeight: "inherit",
                    letterSpacing: "inherit",
                    color: "#E8E4DC",
                    fontSize: "inherit",
                    textTransform: "uppercase",
                    padding: "0",
                    transform: "scaleX(1.15)",
                    transformOrigin: "left center",
                    textShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {line.text}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* LAYER 2: cards in fixed bottom-right container, stacked without layout jumps */}
        <div className="absolute bottom-6 right-5 sm:bottom-10 sm:right-12 z-[20] w-[calc(100vw-8vw)] max-w-[18.75rem] h-[8.5rem] pointer-events-none">
          {[card1Ref, card2Ref].map((ref, i) => (
            <div
              key={i}
              ref={ref}
              className="absolute bottom-0 right-0 w-full bg-black/60 border border-white/10 backdrop-blur-md px-[1.125rem] py-[1rem] shadow-[0_1.25rem_3.125rem_rgba(0,0,0,0.6)]"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2.5">
                <span className="font-mono text-[0.5625rem] tracking-widest uppercase text-white/50">
                  DISCIPLINE // 0{i + 1}
                </span>
                <span className="font-mono text-[0.6875rem] font-semibold text-[#7F9A25]">
                  {CARDS[i].num}
                </span>
              </div>
              <p
                className="text-[0.875rem] leading-[1.5] text-[#E3D9D1]"
                style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
              >
                {CARDS[i].text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
