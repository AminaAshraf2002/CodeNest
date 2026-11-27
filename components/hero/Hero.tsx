"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { barlowCondensed } from "@/lib/fonts";
import type { HeroCanvasHandle } from "./HeroCanvas";

/* Dynamically import Three.js canvas (SSR disabled) */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Font Styles (Bypassing global font-heading / font-black classes)  */
/* ------------------------------------------------------------------ */
const SPACE_GROTESK_400: React.CSSProperties = {
  fontFamily: "var(--font-outfit), sans-serif",
  fontWeight: 400,
};

const SPACE_GROTESK_500: React.CSSProperties = {
  fontFamily: "var(--font-outfit), sans-serif",
  fontWeight: 500,
};

const INTER_400: React.CSSProperties = {
  fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
  fontWeight: 400,
};

const AGENCY_STATEMENT_FONT: React.CSSProperties = {
  fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
  fontWeight: 900,
  fontStyle: "italic",
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasHandle = useRef<HeroCanvasHandle | null>(null);

  // Scene 1 Refs
  const scene1Ref = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLHeadingElement>(null);
  const label1Ref = useRef<HTMLDivElement>(null);
  const desc1Ref = useRef<HTMLParagraphElement>(null);
  const iconRailRef = useRef<HTMLDivElement>(null);
  const giantWordRef = useRef<HTMLDivElement>(null);
  const foregroundRockRef = useRef<HTMLDivElement>(null);
  const bottomStatsRef = useRef<HTMLDivElement>(null);
  const ctaBtn1Ref = useRef<HTMLAnchorElement>(null);

  // Scene 2 Refs
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene2LeftRef = useRef<HTMLDivElement>(null);
  const scene2CardsRef = useRef<HTMLDivElement>(null);

  // Scene 3 Refs
  const scene3Ref = useRef<HTMLDivElement>(null);
  const whiteLightRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const viewWorkBtnRef = useRef<HTMLAnchorElement>(null);

  // Cursor
  const cursorRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);

  const onCanvasReady = useCallback(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Initial setup for entrance
    const titleLine = headline1Ref.current?.querySelector(".hero-line-inner");
    if (titleLine && !isReducedMotion) {
      gsap.set(titleLine, { yPercent: 100, opacity: 0 });
    }
    if (label1Ref.current && !isReducedMotion) gsap.set(label1Ref.current, { opacity: 0, y: 15 });
    if (desc1Ref.current && !isReducedMotion) gsap.set(desc1Ref.current, { opacity: 0, y: 15 });
    if (iconRailRef.current && !isReducedMotion) gsap.set(iconRailRef.current, { opacity: 0, x: -10 });
    if (giantWordRef.current && !isReducedMotion) gsap.set(giantWordRef.current, { opacity: 0, y: 30 });
    if (bottomStatsRef.current && !isReducedMotion) gsap.set(bottomStatsRef.current, { opacity: 0, y: 20 });
    if (ctaBtn1Ref.current && !isReducedMotion) gsap.set(ctaBtn1Ref.current, { opacity: 0, y: 15 });

    // Scene 2 & 3 initially hidden
    if (scene2Ref.current) gsap.set(scene2Ref.current, { opacity: 0, pointerEvents: "none" });
    if (scene3Ref.current) gsap.set(scene3Ref.current, { opacity: 0, pointerEvents: "none" });
    if (whiteLightRef.current) gsap.set(whiteLightRef.current, { opacity: 0 });
    serviceItemsRef.current.forEach((item) => {
      if (item) gsap.set(item, { opacity: 0, y: 20 });
    });
    if (viewWorkBtnRef.current) gsap.set(viewWorkBtnRef.current, { opacity: 0, scale: 0.95 });

    // 1. Entrance Sequence
    let entranceRun = false;
    const triggerEntrance = () => {
      if (entranceRun) return;
      entranceRun = true;

      if (isReducedMotion) {
        if (titleLine) gsap.set(titleLine, { yPercent: 0, opacity: 1 });
        if (label1Ref.current) gsap.set(label1Ref.current, { opacity: 1, y: 0 });
        if (desc1Ref.current) gsap.set(desc1Ref.current, { opacity: 1, y: 0 });
        if (iconRailRef.current) gsap.set(iconRailRef.current, { opacity: 0.6, x: 0 });
        if (giantWordRef.current) gsap.set(giantWordRef.current, { opacity: 0.5, y: 0 });
        if (bottomStatsRef.current) gsap.set(bottomStatsRef.current, { opacity: 1, y: 0 });
        if (ctaBtn1Ref.current) gsap.set(ctaBtn1Ref.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (label1Ref.current) tl.to(label1Ref.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1);
      if (iconRailRef.current) tl.to(iconRailRef.current, { opacity: 0.6, x: 0, duration: 0.8 }, 0.15);
      if (titleLine) tl.to(titleLine, { yPercent: 0, opacity: 1, duration: 1.0 }, 0.2);
      if (giantWordRef.current) tl.to(giantWordRef.current, { opacity: 0.5, y: 0, duration: 1.2 }, 0.25);
      if (desc1Ref.current) tl.to(desc1Ref.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4);
      if (bottomStatsRef.current) tl.to(bottomStatsRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
      if (ctaBtn1Ref.current) tl.to(ctaBtn1Ref.current, { opacity: 1, y: 0, duration: 0.7 }, 0.6);
    };

    // Preloader listener
    window.addEventListener("preloader-transition-start", triggerEntrance, { once: true });
    const fallbackTimer = setTimeout(triggerEntrance, 2000);

    // 2. Master Scrub Timeline across 500vh
    const scrubTl = gsap.timeline({ defaults: { ease: "none" } });

    // Scene 1 (0% -> 30%):
    // At 24% - 32%, fade out Scene 1 elements
    if (scene1Ref.current) {
      scrubTl.to(scene1Ref.current, { opacity: 0, y: -40, duration: 0.1, ease: "power2.inOut" }, 0.24);
    }
    if (giantWordRef.current) {
      // Moves gracefully forward with the 3D camera into the archway, blending into mist
      scrubTl.to(
        giantWordRef.current,
        {
          y: -50,
          scale: 1.06,
          opacity: 0.18,
          duration: 0.30,
          ease: "power1.out",
        },
        0.05
      );
      scrubTl.to(
        giantWordRef.current,
        {
          opacity: 0,
          y: -85,
          duration: 0.12,
          ease: "power2.in",
        },
        0.35
      );
    }
    if (foregroundRockRef.current) {
      scrubTl.to(foregroundRockRef.current, { y: -25, duration: 0.5, ease: "none" }, 0);
    }

    // Scene 2 (30% -> 70%):
    // "BUILDING YOUR DIGITAL DOORWAY FROM IDEA TO LAUNCH" & 3 image cards
    if (scene2Ref.current) {
      scrubTl.to(scene2Ref.current, { opacity: 1, pointerEvents: "auto", duration: 0.05 }, 0.32);
    }
    if (scene2LeftRef.current) {
      scrubTl.fromTo(
        scene2LeftRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.34
      );
      scrubTl.to(scene2LeftRef.current, { opacity: 0, y: -30, duration: 0.08, ease: "power2.in" }, 0.64);
    }
    if (scene2CardsRef.current) {
      scrubTl.fromTo(
        scene2CardsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.36
      );
      scrubTl.to(scene2CardsRef.current, { opacity: 0, y: -25, duration: 0.08, ease: "power2.in" }, 0.64);
    }
    if (scene2Ref.current) {
      scrubTl.to(scene2Ref.current, { opacity: 0, pointerEvents: "none", duration: 0.05 }, 0.68);
    }

    // Scene 3 (70% -> 100%):
    // Black shadow gradient transition through arch + 4 core services + View Work button
    if (whiteLightRef.current) {
      scrubTl.fromTo(
        whiteLightRef.current,
        { opacity: 0 },
        { opacity: 0.85, duration: 0.26, ease: "power2.inOut" },
        0.7
      );
    }
    if (scene3Ref.current) {
      scrubTl.to(scene3Ref.current, { opacity: 1, pointerEvents: "auto", duration: 0.04 }, 0.72);
    }
    const validServices = serviceItemsRef.current.filter(Boolean) as HTMLElement[];
    validServices.forEach((item, idx) => {
      scrubTl.fromTo(
        item,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0.74 + idx * 0.04
      );
    });
    if (viewWorkBtnRef.current) {
      scrubTl.fromTo(
        viewWorkBtnRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: "power2.out" },
        0.9
      );
    }

    // 3. Pinned ScrollTrigger with scrub
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      scrub: 1,
      animation: scrubTl,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        canvasHandle.current?.setProgress(p);
      },
    });

    // 4. Desktop Cursor Parallax and "+" Crosshair
    let mouseCleanup: (() => void) | null = null;
    if (isDesktop) {
      const cursor = cursorRef.current;
      const curX = cursor ? gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" }) : null;
      const curY = cursor ? gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" }) : null;

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2;
        const normY = (e.clientY / innerHeight - 0.5) * 2;

        canvasHandle.current?.setMouse(normX, normY);

        if (curX && curY) {
          curX(e.clientX - 10);
          curY(e.clientY - 10);
        }
      };

      const handleMouseEnter = () => {
        if (cursor) cursor.style.opacity = "1";
      };

      const handleMouseLeave = () => {
        if (cursor) cursor.style.opacity = "0";
      };

      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      document.body.addEventListener("mouseleave", handleMouseLeave);

      mouseCleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseenter", handleMouseEnter);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("preloader-transition-start", triggerEntrance);
      mouseCleanup?.();
      st.kill();
      scrubTl.kill();
    };
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target =
      document.getElementById("portfolio") ||
      document.getElementById("work") ||
      document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stats = useMemo(
    () => [
    
      { num: "24 hrs", label: "Reply time on every enquiry" },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505]"
      style={{ height: "175vh", isolation: "isolate" }}
    >
      {/* Custom "+" Crosshair (Desktop Only) */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] opacity-0 text-white font-mono text-sm font-light hidden md:flex items-center justify-center select-none transition-opacity duration-300"
      >
        +
      </div>

      {/* Pinned Compact Viewport Container (Fits cleanly below navbar with no cutoffs) */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-[#050505] text-[#F5F3FA]"
        style={{ height: "calc(100svh - 5rem)", minHeight: "calc(100svh - 5rem)" }}
      >
        {/* Layer z0: Three.js WebGL Image Sequence Canvas */}
        <HeroCanvas onReady={onCanvasReady} canvasRef={canvasHandle} />

        {/* Layer z0.5: Soft Black Smoke / Atmospheric Clouds */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, transparent 20%, rgba(5, 5, 5, 0.4) 60%, rgba(5, 5, 5, 0.95) 100%)",
          }}
        />

        {/* Layer z1: Giant "CodeNest" Architectural Word blending into bottom mist/shadow */}
        <div
          ref={giantWordRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 select-none whitespace-nowrap z-[2]"
          style={{
            ...SPACE_GROTESK_500,
            fontSize: "clamp(4.5rem, 16vw, 19rem)",
            lineHeight: 0.85,
            bottom: "7vh",
            color: "rgba(245, 243, 250, 0.40)",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.22)",
            letterSpacing: "-0.03em",
            textShadow: "0 0.625rem 2.5rem rgba(0, 0, 0, 0.9)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.4) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.4) 100%)",
            filter: "drop-shadow(0 1.25rem 2.5rem rgba(0, 0, 0, 0.8))",
          }}
        >
          CodeNest
        </div>

        {/* Layer z2: Foreground Landscape Silhouette */}
        <div
          ref={foregroundRockRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 select-none z-[3]"
          style={{
            height: "22vh",
            maskImage: "linear-gradient(to top, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 80%, transparent 100%)",
          }}
        >
          <img
            src="/hero/foreground.svg"
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Layer z2.5: Ground Mist Band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 select-none z-[4] mix-blend-screen opacity-15"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          }}
        />

        {/* Layer z3: Edge Blending Overlays & White Light Bloom */}
        <div className="pointer-events-none absolute inset-0 z-[5]">
          {/* Top gradient below navbar */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/90 via-[#050505]/50 to-transparent" />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
          {/* Left subtle reading contrast gradient */}
          <div className="absolute inset-y-0 left-0 w-[42vw] bg-gradient-to-r from-[#050505]/75 via-[#050505]/30 to-transparent" />
          {/* Black Shadow Gradient (Scene 3 cinematic fade) */}
          <div
            ref={whiteLightRef}
            className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent opacity-0 pointer-events-none transition-opacity"
          />
        </div>

        {/* ========================================================== */}
        {/* SCENE 1: (0% - 30% Scroll)                                  */}
        {/* Single-line headline + small paragraph + icon rail + stats */}
        {/* ========================================================== */}
        <div
          ref={scene1Ref}
          className="absolute inset-0 z-[10] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-[1.5rem] pb-4 sm:pb-6 lg:pb-[1.25rem]"
        >
          {/* Top Row: Left Headline + Right Paragraph */}
          <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 w-full">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4 lg:gap-6">
              {/* Left Column */}
              <div className="max-w-2xl">
                {/* Small Label Pill Removed as requested */}
                <div ref={label1Ref} className="hidden" aria-hidden="true" />

                {/* Single-Line Headline in AgencyStatement font (Barlow Condensed 900 Italic) */}
                <h1
                  ref={headline1Ref}
                  className={`uppercase select-none tracking-tight ${barlowCondensed.className}`}
                  style={{
                    ...AGENCY_STATEMENT_FONT,
                    fontSize: "clamp(1.05rem, 3.8vw, 3.2rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    color: "#D0CED6",
                  }}
                >
                  <div className="overflow-hidden py-1 pr-2 sm:pr-4">
                    <span className="hero-line-inner block will-change-transform whitespace-nowrap">
                      EVERY BUSINESS NEEDS A DOORWAY.
                    </span>
                  </div>
                </h1>
              </div>

              {/* Right Column: Small Paragraph */}
              <p
                ref={desc1Ref}
                className="block max-w-sm lg:max-w-[13.75rem] text-left lg:text-right text-[#888895] leading-relaxed pt-1 lg:pt-2"
                style={{
                  ...INTER_400,
                  fontSize: "0.75rem",
                  lineHeight: 1.6,
                }}
              >
                We design and develop websites and e-commerce experiences that help
                businesses grow.
              </p>
            </div>
          </div>

          {/* Left Vertical Icon Rail Removed as requested */}
          <div ref={iconRailRef} className="hidden" aria-hidden="true" />

          {/* Bottom Row: 4 Column Stats & CTA */}
          <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
              {/* Stats: 2x2 Grid on Mobile, 4 Columns on Tablet & Desktop */}
              <div
                ref={bottomStatsRef}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 lg:gap-10"
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl sm:text-3xl text-[#F5F3FA]"
                      style={SPACE_GROTESK_500}
                    >
                      {s.num}
                    </div>
                    <div
                      className="text-[0.625rem] sm:text-xs uppercase tracking-wider text-[#888895] mt-1"
                      style={INTER_400}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                ref={ctaBtn1Ref}
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] border border-white/25 text-[#F5F3FA] text-xs uppercase tracking-wider backdrop-blur-md bg-white/[0.03] hover:border-[#9BB835] hover:text-[#9BB835] hover:shadow-[0_0_24px_rgba(155,184,53,0.3)] transition-all duration-300 w-full sm:w-auto self-start sm:self-auto cursor-pointer"
                style={INTER_400}
              >
                <span>Let&apos;s Build Together</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SCENE 2: (30% - 70% Scroll)                                 */}
        {/* Left block headline + 3 cards at bottom right               */}
        {/* ========================================================== */}
        <div
          ref={scene2Ref}
          className="absolute inset-0 z-[10] flex items-center justify-between pointer-events-none opacity-0 pt-20 sm:pt-24 lg:pt-[1.5rem] pb-4 sm:pb-6 lg:pb-[1.25rem]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 w-full h-full flex flex-col justify-between">
            {/* Left Story Block */}
            <div
              ref={scene2LeftRef}
              className="max-w-xl xl:max-w-2xl flex flex-col items-start my-auto"
            >
              <h2
                className={`uppercase tracking-tight mb-4 sm:mb-6 pr-4 ${barlowCondensed.className}`}
                style={{
                  ...AGENCY_STATEMENT_FONT,
                  fontSize: "clamp(1.5rem, 3.2vw, 4rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.01em",
                  color: "#D0CED6",
                }}
              >
                BUILDING YOUR <br />
                DIGITAL DOORWAY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D0CED6] via-[#B8D44A] to-[#9BB835]">
                  FROM IDEA TO LAUNCH.
                </span>
              </h2>

              <p
                className="text-xs sm:text-base text-[#888895] max-w-md leading-relaxed mb-4 sm:mb-6"
                style={INTER_400}
              >
                We build high-performance Next.js web applications, custom e-commerce stores,
                and engaging digital experiences for businesses in India and the UAE.
              </p>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 min-h-[44px] border border-white/30 text-white text-xs uppercase tracking-wider backdrop-blur-md hover:border-[#9BB835] hover:text-[#9BB835] transition-all"
                style={INTER_400}
              >
                <span>Get a Free Quote</span>
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>

            {/* Bottom-Right 3 Image Cards */}
            <div
              ref={scene2CardsRef}
              className="self-end flex flex-wrap sm:flex-nowrap gap-2.5 sm:gap-4 max-w-full sm:max-w-xl"
            >
              {[
                {
                  id: "01",
                  category: "Dynamic Website",
                  title: "Ecoglow",
                  img: "/work/ecoglow.png",
                  href: "/work/ecoglow",
                },
                {
                  id: "02",
                  category: "E-commerce",
                  title: "Allie Couture",
                  img: "/work/alliecouture.png",
                  href: "/work/allie-couture",
                },
                {
                  id: "03",
                  category: "Business Website",
                  title: "Velvet Key",
                  img: "/work/velvet-key-properties.png",
                  href: "/work/velvet-key-properties",
                },
              ].map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="p-2 sm:p-3 w-[7.8rem] sm:w-[10.625rem] bg-[#050505]/85 backdrop-blur-md border border-white/15 hover:border-[#9BB835]/70 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
                >
                  {/* Clean, clear thumbnail without black shadow or gradient overlay */}
                  <div className="relative w-full h-14 sm:h-16 mb-1.5 sm:mb-2 overflow-hidden bg-black/60 border border-white/5">
                    <img
                      src={card.img}
                      alt={`${card.title} ${card.category} showcase`}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  {/* Text details */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[8.5px] sm:text-[9.5px] uppercase tracking-wider text-[#888895] group-hover:text-[#9BB835] transition-colors"
                      style={INTER_400}
                    >
                      {card.id} // {card.category}
                    </span>
                    <span className="text-xs text-[#888895] group-hover:text-[#9BB835] group-hover:translate-x-0.5 transition-all">
                      ↗
                    </span>
                  </div>
                  <div
                    className="text-xs sm:text-[0.8125rem] text-[#F5F3FA] mt-0.5 group-hover:text-white font-medium"
                    style={SPACE_GROTESK_500}
                  >
                    {card.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SCENE 3: (70% - 100% Scroll)                                */}
        {/* White light flood + 4 service lines + View Our Work button  */}
        {/* ========================================================== */}
        <div
          ref={scene3Ref}
          className="absolute inset-0 z-[10] flex items-center justify-center px-4 sm:px-6 text-center pointer-events-none opacity-0"
        >
          <div className="max-w-2xl w-full flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-[0.25em] text-white/75 mb-3 sm:mb-5"
              style={INTER_400}
            >
              ✦ CORE DISCIPLINES
            </span>

            {/* 4 Service Items */}
            <div className="flex flex-col gap-2 sm:gap-4 mb-6 sm:mb-8 w-full max-w-lg px-2">
              {[
                "E-commerce Websites",
                "Business & Dynamic Websites",
                "Shopify & WordPress",
                "Custom Coding & 3D Websites",
              ].map((service, idx) => (
                <div
                  key={service}
                  ref={(el) => {
                    serviceItemsRef.current[idx] = el;
                  }}
                  className="px-4 py-2.5 sm:px-6 sm:py-3.5 border border-white/20 bg-black/85 backdrop-blur-md text-base sm:text-2xl text-white uppercase tracking-tight shadow-xl"
                  style={SPACE_GROTESK_500}
                >
                  {service}
                </div>
              ))}
            </div>

            {/* View Our Work Button */}
            <a
              ref={viewWorkBtnRef}
              href="#portfolio"
              onClick={handleScrollToWork}
              className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 min-h-[44px] bg-white text-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#9BB835] hover:text-black hover:shadow-[0_0_30px_rgba(155,184,53,0.4)] transition-all duration-300 cursor-pointer pointer-events-auto"
              style={SPACE_GROTESK_500}
            >
              <span>View Our Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
