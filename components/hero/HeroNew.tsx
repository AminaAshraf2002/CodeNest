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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGlobe, FaCode, FaLayerGroup, FaArrowRight } from "react-icons/fa6";
import type { HeroCanvasHandle } from "./HeroCanvas";

/* dynamically import the Three.js canvas (SSR off) */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */
const TOTAL_FRAMES = 96;
const SPACE_GROTESK_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-space-grotesk), sans-serif",
};
const INTER_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-inter), sans-serif",
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function Hero() {
  /* refs */
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasHandle = useRef<HeroCanvasHandle | null>(null);

  /* scene refs */
  const scene1Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const iconRailRef = useRef<HTMLDivElement>(null);
  const giantWordRef = useRef<HTMLDivElement>(null);

  /* scene 2 */
  const scene2Ref = useRef<HTMLDivElement>(null);

  /* scene 3 */
  const scene3Ref = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const viewWorkBtnRef = useRef<HTMLAnchorElement>(null);
  const whiteLightRef = useRef<HTMLDivElement>(null);

  /* custom cursor */
  const cursorRef = useRef<HTMLDivElement>(null);

  /* debug */
  const debugRef = useRef<HTMLDivElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  /* ---------------------------------------------------------------- */
  /*  On canvas ready callback                                        */
  /* ---------------------------------------------------------------- */
  const onCanvasReady = useCallback(() => {
    setCanvasReady(true);
    console.log("[Hero] Canvas is ready");
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Scroll + GSAP + entrance                                        */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    /* ---- set initial hidden states ---- */
    const titleLines =
      headlineRef.current?.querySelectorAll(".hero-line-inner");
    if (titleLines && !isReducedMotion)
      gsap.set(titleLines, { yPercent: 105, opacity: 0 });
    if (labelRef.current && !isReducedMotion)
      gsap.set(labelRef.current, { opacity: 0, y: 15 });
    if (descRef.current && !isReducedMotion)
      gsap.set(descRef.current, { opacity: 0, y: 20 });
    if (ctaBtnRef.current && !isReducedMotion)
      gsap.set(ctaBtnRef.current, { opacity: 0, y: 20 });
    if (cardsContainerRef.current && !isReducedMotion)
      gsap.set(cardsContainerRef.current, { opacity: 0, y: 30 });
    if (iconRailRef.current && !isReducedMotion)
      gsap.set(iconRailRef.current, { opacity: 0 });
    if (giantWordRef.current && !isReducedMotion)
      gsap.set(giantWordRef.current, { opacity: 0, y: 40 });

    /* scene 2 & 3 always hidden initially */
    if (scene2Ref.current) gsap.set(scene2Ref.current, { opacity: 0, y: 35 });
    if (scene3Ref.current) gsap.set(scene3Ref.current, { opacity: 0, y: 35 });
    if (whiteLightRef.current)
      gsap.set(whiteLightRef.current, { opacity: 0 });
    serviceItemsRef.current.forEach((item) => {
      if (item) gsap.set(item, { opacity: 0, y: 20 });
    });
    if (viewWorkBtnRef.current)
      gsap.set(viewWorkBtnRef.current, { opacity: 0, scale: 0.92 });

    /* ---- reduced-motion: show everything instantly ---- */
    if (isReducedMotion) {
      if (titleLines) gsap.set(titleLines, { yPercent: 0, opacity: 1 });
      if (labelRef.current) gsap.set(labelRef.current, { opacity: 1, y: 0 });
      if (descRef.current) gsap.set(descRef.current, { opacity: 1, y: 0 });
      if (ctaBtnRef.current)
        gsap.set(ctaBtnRef.current, { opacity: 1, y: 0 });
      if (cardsContainerRef.current)
        gsap.set(cardsContainerRef.current, { opacity: 1, y: 0 });
      if (giantWordRef.current)
        gsap.set(giantWordRef.current, { opacity: 1, y: 0 });
    }

    /* ---- entrance animation ---- */
    let hasEntranceRun = false;
    const runEntrance = () => {
      if (hasEntranceRun) return;
      hasEntranceRun = true;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (labelRef.current)
        tl.to(
          labelRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.1
        );
      if (iconRailRef.current)
        tl.to(
          iconRailRef.current,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          0.2
        );
      if (titleLines && titleLines.length > 0)
        tl.to(
          titleLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.15
        );
      if (giantWordRef.current)
        tl.to(
          giantWordRef.current,
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          0.2
        );
      if (descRef.current)
        tl.to(
          descRef.current,
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          0.5
        );
      if (ctaBtnRef.current)
        tl.to(
          ctaBtnRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.62
        );
      if (cardsContainerRef.current)
        tl.to(
          cardsContainerRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.68
        );
    };

    /* listen for preloader event or run immediately */
    const preloader = document.querySelector(
      '[role="dialog"], [aria-label="CodeNest Loading Experience"]'
    );
    if (!preloader) {
      runEntrance();
    } else {
      window.addEventListener("preloader-transition-start", runEntrance, {
        once: true,
      });
      const timer = setTimeout(runEntrance, 2500);
      /* cleanup at end if needed */
      const cleanupEntrance = () => {
        clearTimeout(timer);
        window.removeEventListener(
          "preloader-transition-start",
          runEntrance
        );
      };
      /* store for later cleanup */
      (section as any).__cleanupEntrance = cleanupEntrance;
    }

    /* ---- scroll timeline (scrub) ---- */
    const scrubTl = gsap.timeline({ defaults: { ease: "none" } });

    /* Scene 1 → 2 transition: fade out scene 1 elements (25% → 35%) */
    if (scene1Ref.current)
      scrubTl.to(
        scene1Ref.current,
        { opacity: 0, y: -40, duration: 0.1, ease: "power2.inOut" },
        0.25
      );
    if (giantWordRef.current)
      scrubTl.to(
        giantWordRef.current,
        { opacity: 0, x: -60, duration: 0.12, ease: "power2.inOut" },
        0.25
      );
    if (cardsContainerRef.current)
      scrubTl.to(
        cardsContainerRef.current,
        { opacity: 0, y: -25, duration: 0.1, ease: "power2.inOut" },
        0.24
      );
    if (iconRailRef.current)
      scrubTl.to(iconRailRef.current, { opacity: 0, duration: 0.08 }, 0.24);

    /* Scene 2: "BUILDING YOUR DIGITAL DOORWAY" (35% → 65%) */
    if (scene2Ref.current) {
      scrubTl.fromTo(
        scene2Ref.current,
        { opacity: 0, y: 35, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "power2.out" },
        0.35
      );
      scrubTl.to(
        scene2Ref.current,
        { opacity: 0, y: -30, scale: 1.04, duration: 0.08, ease: "power2.in" },
        0.62
      );
    }

    /* Scene 3: white light + services (70% → 100%) */
    if (whiteLightRef.current)
      scrubTl.fromTo(
        whiteLightRef.current,
        { opacity: 0 },
        { opacity: 0.45, duration: 0.25, ease: "power2.inOut" },
        0.7
      );
    if (scene3Ref.current)
      scrubTl.fromTo(
        scene3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.05 },
        0.72
      );

    const validServices = serviceItemsRef.current.filter(
      Boolean
    ) as HTMLElement[];
    validServices.forEach((item, idx) => {
      scrubTl.fromTo(
        item,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" },
        0.74 + idx * 0.04
      );
    });

    if (viewWorkBtnRef.current)
      scrubTl.fromTo(
        viewWorkBtnRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: "power2.out" },
        0.9
      );

    /* ---- ScrollTrigger: pin sticky container, drive timeline ---- */
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      animation: scrubTl,
      onUpdate: (self) => {
        const progress = self.progress;
        canvasHandle.current?.setProgress(progress);

        /* debug readout */
        if (debugRef.current) {
          const loaded = canvasHandle.current?.getLoadedCount() ?? 0;
          const frame = canvasHandle.current?.getCurrentFrame() ?? 0;
          debugRef.current.textContent = `progress: ${progress.toFixed(
            3
          )} | frame: ${frame.toFixed(1)} | loaded: ${loaded}/${TOTAL_FRAMES}`;
        }
      },
    });

    /* ---- mouse parallax (desktop) ---- */
    let mouseCleanup: (() => void) | null = null;
    if (isDesktop) {
      const cursor = cursorRef.current;
      const curX = cursor
        ? gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" })
        : null;
      const curY = cursor
        ? gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" })
        : null;

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

    /* ---- cleanup ---- */
    return () => {
      st.kill();
      scrubTl.kill();
      mouseCleanup?.();
      if ((section as any).__cleanupEntrance) {
        (section as any).__cleanupEntrance();
        delete (section as any).__cleanupEntrance;
      }
    };
  }, []);

  /* ---- smooth scroll to work ---- */
  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target =
      document.getElementById("portfolio") ||
      document.getElementById("work") ||
      document.getElementById("services");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---- bottom stats row ---- */
  const stats = useMemo(
    () => [
      { num: "96+", label: "Projects Delivered" },
      { num: "40+", label: "Clients Worldwide" },
      { num: "4.9", label: "Client Rating" },
      { num: "2×", label: "Faster Load Times" },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505]"
      style={{ height: "500vh" }}
    >
      {/* ============================================================ */}
      {/* CUSTOM "+" CURSOR (desktop)                                   */}
      {/* ============================================================ */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] opacity-0 text-white font-mono text-base font-light hidden md:flex items-center justify-center select-none transition-opacity duration-300"
      >
        +
      </div>

      {/* ============================================================ */}
      {/* STICKY VIEWPORT (100svh)                                      */}
      {/* ============================================================ */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full overflow-hidden bg-[#050505] text-[#F5F3FA]"
        style={{ height: "100svh" }}
      >
        {/* ---- Z0: Three.js Canvas ---- */}
        <HeroCanvas onReady={onCanvasReady} canvasRef={canvasHandle} />

        {/* ---- Z1: Giant "CodeNest" word (behind foreground) ---- */}
        <div
          ref={giantWordRef}
          className="absolute w-full pointer-events-none select-none"
          style={{
            ...SPACE_GROTESK_STYLE,
            fontWeight: 500,
            fontSize: "22vw",
            lineHeight: 0.8,
            top: "55%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(245, 243, 250, 0.07)",
            zIndex: 1,
            whiteSpace: "nowrap",
            letterSpacing: "-0.02em",
          }}
        >
          CodeNest
        </div>

        {/* ---- Z4: Edge overlays (vignette, gradients, grain) ---- */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 4 }}
        >
          {/* top gradient */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/80 to-transparent" />
          {/* bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-transparent" />
          {/* left readability gradient */}
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: "35vw",
              background:
                "linear-gradient(to right, rgba(5,5,5,0.7) 0%, transparent 100%)",
            }}
          />
          {/* radial vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 32%, rgba(5,5,5,0.65) 70%, rgba(5,5,5,0.95) 100%)",
            }}
          />
          {/* film grain */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
            }}
          />
          {/* white light bloom (scene 3) */}
          <div
            ref={whiteLightRef}
            className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent mix-blend-screen opacity-0"
          />
        </div>

        {/* ---- Z3: SCENE 1 — headline, text, icon rail ---- */}
        <div
          ref={scene1Ref}
          className="absolute inset-0 flex flex-col justify-between will-change-transform"
          style={{ zIndex: 3, paddingTop: "120px" }}
        >
          {/* top row */}
          <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 w-full">
            <div className="flex justify-between items-start">
              {/* left: label + headline */}
              <div className="max-w-2xl">
                {/* label pill */}
                <div
                  ref={labelRef}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-[#050505]/80 backdrop-blur-md mb-5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9BB835] animate-pulse" />
                  <span
                    className="text-[11px] uppercase tracking-[0.22em] text-[#888895]"
                    style={{ ...INTER_STYLE, fontWeight: 400 }}
                  >
                    CREATIVE TECHNOLOGY STUDIO
                  </span>
                </div>

                {/* headline */}
                <h1
                  ref={headlineRef}
                  className="select-none"
                  style={{
                    ...SPACE_GROTESK_STYLE,
                    fontWeight: 400,
                    fontSize: "clamp(1.25rem, 2.6vw, 2.6rem)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    color: "#F5F3FA",
                  }}
                >
                  <div className="overflow-hidden py-0.5">
                    <span className="hero-line-inner block will-change-transform">
                      EVERY BUSINESS NEEDS A DOORWAY.
                    </span>
                  </div>
                </h1>
              </div>

              {/* right: small paragraph */}
              <p
                ref={descRef}
                className="hidden md:block max-w-[220px] text-right"
                style={{
                  ...INTER_STYLE,
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: 1.6,
                  color: "#888895",
                }}
              >
                We design and develop websites and e-commerce experiences that
                help businesses grow.
              </p>
            </div>
          </div>

          {/* left icon rail */}
          <div
            ref={iconRailRef}
            aria-hidden="true"
            className="absolute hidden lg:flex flex-col items-center gap-3.5 select-none pointer-events-none"
            style={{
              left: "16px",
              top: "25%",
              zIndex: 3,
              opacity: 0.6,
              fontSize: "14px",
              color: "#888895",
            }}
          >
            {["†", "◇", "+", "⁘", "✳", "✦", "△"].map((sym, i) => (
              <span
                key={i}
                className={i === 0 ? "text-[#9BB835]" : ""}
                style={{ lineHeight: 1 }}
              >
                {sym}
              </span>
            ))}
          </div>

          {/* bottom row: stats + CTA */}
          <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 w-full pb-8">
            <div className="flex items-end justify-between">
              {/* stats */}
              <div
                ref={cardsContainerRef}
                className="flex gap-6 sm:gap-10"
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-2xl sm:text-3xl text-[#F5F3FA]"
                      style={{ ...SPACE_GROTESK_STYLE, fontWeight: 500 }}
                    >
                      {s.num}
                    </div>
                    <div
                      className="text-[10px] sm:text-xs uppercase tracking-wider text-[#888895] mt-1"
                      style={INTER_STYLE}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <Link
                ref={ctaBtnRef}
                href="/contact"
                className="group hidden sm:inline-flex items-center gap-2.5 px-6 py-3 border border-white/30 text-[#F5F3FA] text-xs uppercase tracking-wider backdrop-blur-md bg-white/[0.02] hover:border-[#9BB835] hover:text-[#9BB835] hover:shadow-[0_0_24px_rgba(155,184,53,0.3)] transition-all duration-300 cursor-pointer"
                style={{ ...INTER_STYLE, fontWeight: 400 }}
              >
                <span>Let&apos;s Build Together</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ---- Z3: SCENE 2 — "From idea to launch" ---- */}
        <div
          ref={scene2Ref}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center will-change-transform opacity-0"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-3xl flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#9BB835] mb-4"
              style={INTER_STYLE}
            >
              ● THE TRANSITION // VISION TO LAUNCH
            </span>
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#F5F3FA] leading-[1.08] uppercase"
              style={{ ...SPACE_GROTESK_STYLE, fontWeight: 500 }}
            >
              From idea to launch,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#9BB835]">
                we build it with you.
              </span>
            </h2>
          </div>
        </div>

        {/* ---- Z3: SCENE 3 — services + CTA ---- */}
        <div
          ref={scene3Ref}
          className="absolute inset-0 flex items-center justify-center px-6 text-center will-change-transform opacity-0 pointer-events-auto"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-2xl flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-[0.25em] text-white/70 mb-5"
              style={INTER_STYLE}
            >
              ✦ CORE DISCIPLINES
            </span>

            <div className="flex flex-col gap-3 sm:gap-4 mb-8 w-full max-w-lg">
              {[
                "Custom Next.js Websites",
                "E-commerce",
                "UI/UX & Brand Design",
                "Maintenance & Support",
              ].map((service, idx) => (
                <div
                  key={service}
                  ref={(el) => {
                    serviceItemsRef.current[idx] = el;
                  }}
                  className="px-5 py-3 border border-white/20 bg-black/80 backdrop-blur-md text-lg sm:text-2xl text-white uppercase tracking-tight shadow-lg"
                  style={{ ...SPACE_GROTESK_STYLE, fontWeight: 500 }}
                >
                  {service}
                </div>
              ))}
            </div>

            <a
              ref={viewWorkBtnRef}
              href="#portfolio"
              onClick={handleScrollToWork}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm uppercase tracking-wider hover:bg-[#9BB835] hover:text-black hover:shadow-[0_0_30px_rgba(155,184,53,0.4)] transition-all duration-300 cursor-pointer"
              style={{ ...SPACE_GROTESK_STYLE, fontWeight: 500 }}
            >
              <span>View Our Work</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* ---- DEBUG READOUT ---- */}
        <div
          ref={debugRef}
          className="fixed top-4 right-4 px-3 py-1.5 bg-black/90 text-green-400 text-xs font-mono rounded z-[10000] pointer-events-none"
          style={{ backdropFilter: "blur(4px)" }}
        >
          progress: 0.000 | frame: 0.0 | loaded: 0/{TOTAL_FRAMES}
        </div>
      </div>
    </section>
  );
}
