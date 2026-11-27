"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 30 small olive dust particles with deterministic values for SSR-safe hydration
const DUST_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: 2 + ((i * 7) % 3), // 2 to 4px
  left: (i * 3.33) % 100, // 0% to 100%
  top: (i * 4.91 + 12) % 100, // 0% to 100%
  opacity: 0.2 + ((i * 11) % 40) / 100, // 0.2 to 0.60
  duration: 12 + ((i * 3) % 10), // 12s to 22s
  delay: (i * 0.4) % 4,
  wobbleX: 14 + ((i * 5) % 18),
  mobile: i < 12, // 12 particles visible on mobile (< md)
}));

// 7 glints positioned along panel reflective edges
const GLINT_POINTS = [
  { id: 0, top: "26%", right: "24%", delay: 0.3 },
  { id: 1, top: "34%", right: "32%", delay: 1.9 },
  { id: 2, top: "43%", right: "19%", delay: 3.2 },
  { id: 3, top: "51%", right: "29%", delay: 1.1 },
  { id: 4, top: "60%", right: "15%", delay: 2.7 },
  { id: 5, top: "68%", right: "26%", delay: 0.8 },
  { id: 6, top: "77%", right: "13%", delay: 3.5 },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageSceneWrapperRef = useRef<HTMLDivElement>(null);

  // Depth Parallax Layers (same image: /hero-panels.jpg)
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const highlightLayerRef = useRef<HTMLDivElement>(null);

  // Ambient Glows
  const glowBottomLeftRef = useRef<HTMLDivElement>(null);
  const glowPanelsRef = useRef<HTMLDivElement>(null);

  // Cursor Spotlight
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Light Beams & Glints
  const beam1Ref = useRef<HTMLDivElement>(null);
  const beam2Ref = useRef<HTMLDivElement>(null);
  const glintsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Particles
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Text Elements
  const taglineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const statTimeRef = useRef<HTMLSpanElement>(null);
  const statOwnershipRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const repeatingTweens: gsap.core.Tween[] = [];
    let entranceTl: gsap.core.Timeline | null = null;
    let cleanupMouse: (() => void) | null = null;
    let hasRun = false;

    // Static fallback for reduced motion
    if (isReducedMotion) {
      if (imageSceneWrapperRef.current) {
        gsap.set(imageSceneWrapperRef.current, {
          clipPath: "inset(0 0 0 0%)",
          scale: 1,
          x: 0,
        });
      }
      if (glowLayerRef.current) gsap.set(glowLayerRef.current, { opacity: 0.55 });
      if (glowBottomLeftRef.current) gsap.set(glowBottomLeftRef.current, { opacity: 0.28 });
      if (glowPanelsRef.current) gsap.set(glowPanelsRef.current, { opacity: 0.14 });
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".hero-line-inner");
        gsap.set(lines, { yPercent: 0, opacity: 1 });
      }
      return;
    }

    // Set initial entrance states
    if (imageSceneWrapperRef.current) {
      gsap.set(imageSceneWrapperRef.current, {
        clipPath: "inset(0 0 0 100%)",
        scale: 1.18,
        x: 80,
      });
    }
    if (glowLayerRef.current) gsap.set(glowLayerRef.current, { opacity: 0 });
    if (glowBottomLeftRef.current) gsap.set(glowBottomLeftRef.current, { opacity: 0 });
    if (glowPanelsRef.current) gsap.set(glowPanelsRef.current, { opacity: 0 });

    const headlineLines = headlineRef.current?.querySelectorAll(".hero-line-inner");
    if (headlineLines) {
      gsap.set(headlineLines, {
        yPercent: 105,
        opacity: 0,
      });
    }

    // Initialize Idle Motion, Beams, Glints, and Particles
    const initIdleAnimations = () => {
      // 6. Idle Breathing: main image scales between 1 and 1.025 (8s, sine.inOut, yoyo, repeat -1)
      if (mainImageRef.current) {
        const tBreath = gsap.to(mainImageRef.current, {
          scale: 1.025,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        repeatingTweens.push(tBreath);
      }

      // Two olive glows pulse in opacity (0.55 to 0.85, 5s, offset from each other)
      if (glowBottomLeftRef.current) {
        const tGlow1 = gsap.to(glowBottomLeftRef.current, {
          opacity: 0.42,
          scale: 1.08,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        repeatingTweens.push(tGlow1);
      }

      if (glowPanelsRef.current) {
        const tGlow2 = gsap.to(glowPanelsRef.current, {
          opacity: 0.22,
          scale: 1.1,
          duration: 5,
          delay: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        repeatingTweens.push(tGlow2);
      }

      // 4. Light Beams: cross panels from top-left to bottom-right
      if (beam1Ref.current) {
        const tBeam1 = gsap.fromTo(
          beam1Ref.current,
          { xPercent: -150, yPercent: -100 },
          {
            xPercent: 180,
            yPercent: 120,
            duration: 5.0,
            repeat: -1,
            repeatDelay: 2.0,
            ease: "power1.inOut",
          }
        );
        repeatingTweens.push(tBeam1);
      }

      if (beam2Ref.current) {
        const tBeam2 = gsap.fromTo(
          beam2Ref.current,
          { xPercent: -150, yPercent: -100 },
          {
            xPercent: 180,
            yPercent: 120,
            duration: 8.0,
            delay: 1.8,
            repeat: -1,
            repeatDelay: 2.0,
            ease: "power1.inOut",
          }
        );
        repeatingTweens.push(tBeam2);
      }

      // Glints: 6 to 8 tiny dots appear on panel edges (scale 0 to 1 to 0 with 0.8s yoyo and random delays)
      glintsRef.current.forEach((glint, idx) => {
        if (glint) {
          const tGlint = gsap.fromTo(
            glint,
            { scale: 0, opacity: 0 },
            {
              scale: 1.2,
              opacity: 1,
              duration: 0.8,
              repeat: -1,
              repeatDelay: 1.5 + (idx % 4) * 0.9,
              yoyo: true,
              ease: "sine.inOut",
              delay: GLINT_POINTS[idx].delay,
            }
          );
          repeatingTweens.push(tGlint);
        }
      });

      // 5. Floating Particles: 30 small olive dust particles drifting slowly upward with random x wobble
      particlesRef.current.forEach((pEl, idx) => {
        if (pEl) {
          const pData = DUST_PARTICLES[idx];
          // Upward drift
          const tUp = gsap.to(pEl, {
            y: "-=180",
            duration: pData.duration,
            repeat: -1,
            ease: "none",
            delay: pData.delay,
          });
          repeatingTweens.push(tUp);

          // Horizontal wobble
          const tWobble = gsap.to(pEl, {
            x: `+=${pData.wobbleX}`,
            duration: pData.duration * 0.45,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          repeatingTweens.push(tWobble);
        }
      });
    };

    // 2. Cinematic Entrance Timeline
    const runEntrance = () => {
      if (hasRun) return;
      hasRun = true;

      entranceTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          initIdleAnimations();
        },
      });

      // (a) Image reveals from right to left with clip-path wipe while scaling from 1.18 to 1 and moving from 80px to 0
      if (imageSceneWrapperRef.current) {
        entranceTl.to(
          imageSceneWrapperRef.current,
          {
            clipPath: "inset(0 0 0 0%)",
            scale: 1,
            x: 0,
            duration: 1.6,
            ease: "power4.out",
          },
          0
        );
      }

      // (b) Glow layer fades up 0.4s later; olive radial glow breathes in from bottom-left corner
      if (glowLayerRef.current) {
        entranceTl.to(
          glowLayerRef.current,
          {
            opacity: 0.55,
            duration: 1.4,
            ease: "power2.out",
          },
          0.4
        );
      }

      if (glowBottomLeftRef.current) {
        entranceTl.to(
          glowBottomLeftRef.current,
          {
            opacity: 0.28,
            duration: 1.4,
            ease: "power2.out",
          },
          0.4
        );
      }

      if (glowPanelsRef.current) {
        entranceTl.to(
          glowPanelsRef.current,
          {
            opacity: 0.14,
            duration: 1.4,
            ease: "power2.out",
          },
          0.5
        );
      }

      // (c) Tagline pill
      if (taglineRef.current) {
        entranceTl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.1
        );
      }

      // (d) Headline lines slide up smoothly with stagger
      if (headlineLines && headlineLines.length > 0) {
        entranceTl.to(
          headlineLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.15
        );
      }

      // (e) Subheading and buttons fade up with stagger
      if (descRef.current) {
        entranceTl.fromTo(
          descRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.5
        );
      }

      if (ctaGroupRef.current) {
        entranceTl.fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.62
        );
      }

      // (f) Stats count up from 0 with a snap
      if (metricsRef.current) {
        entranceTl.fromTo(
          metricsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0.65
        );

        if (statTimeRef.current) statTimeRef.current.textContent = "< 0.0s";
        if (statOwnershipRef.current) statOwnershipRef.current.textContent = "0%";

        const statsObj = { time: 0.0, ownership: 0 };
        entranceTl.to(
          statsObj,
          {
            time: 0.8,
            ownership: 100,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              if (statTimeRef.current) {
                statTimeRef.current.textContent = `< ${statsObj.time.toFixed(1)}s`;
              }
              if (statOwnershipRef.current) {
                statOwnershipRef.current.textContent = `${Math.round(statsObj.ownership)}%`;
              }
            },
          },
          0.7
        );
      }

      if (scrollIndicatorRef.current) {
        entranceTl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.85
        );
      }
    };

    // Trigger on "preloader-transition-start" or immediate fallback
    const preloaderElement = document.querySelector(
      '[aria-label="CodeNest Loading Experience"]'
    );
    if (!preloaderElement) {
      runEntrance();
    } else {
      window.addEventListener("preloader-transition-start", runEntrance, {
        once: true,
      });
      const fallbackTimer = setTimeout(runEntrance, 2000);
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener("preloader-transition-start", runEntrance);
      };
    }

    // 1 & 3 & 8. Mouse Parallax, Spotlight, and Magnetic Button (Desktop only)
    if (isDesktop) {
      // Parallax layer quickTo handlers
      const glowXTo = glowLayerRef.current
        ? gsap.quickTo(glowLayerRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const glowYTo = glowLayerRef.current
        ? gsap.quickTo(glowLayerRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;

      const mainXTo = mainImageRef.current
        ? gsap.quickTo(mainImageRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const mainYTo = mainImageRef.current
        ? gsap.quickTo(mainImageRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;

      const highlightXTo = highlightLayerRef.current
        ? gsap.quickTo(highlightLayerRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const highlightYTo = highlightLayerRef.current
        ? gsap.quickTo(highlightLayerRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;

      // Spotlight quickTo handlers
      const spotXTo = spotlightRef.current
        ? gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power3.out" })
        : null;
      const spotYTo = spotlightRef.current
        ? gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power3.out" })
        : null;

      // Primary Button Magnetic effect
      const btnEl = primaryBtnRef.current;
      const btnXTo = btnEl
        ? gsap.quickTo(btnEl, "x", { duration: 0.4, ease: "power3.out" })
        : null;
      const btnYTo = btnEl
        ? gsap.quickTo(btnEl, "y", { duration: 0.4, ease: "power3.out" })
        : null;

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
        const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

        // Parallax: glow 24px, main 14px, highlight 8px, all opposite the cursor
        if (glowXTo && glowYTo) {
          glowXTo(-normX * 24);
          glowYTo(-normY * 24);
        }
        if (mainXTo && mainYTo) {
          mainXTo(-normX * 14);
          mainYTo(-normY * 14);
        }
        if (highlightXTo && highlightYTo) {
          highlightXTo(-normX * 8);
          highlightYTo(-normY * 8);
        }

        // Spotlight over panels on the right side
        if (containerRef.current && spotXTo && spotYTo) {
          const cRect = containerRef.current.getBoundingClientRect();
          const relX = e.clientX - cRect.left;
          const relY = e.clientY - cRect.top;

          // Activate spotlight over the panels (right half of hero)
          if (relX > cRect.width * 0.38) {
            spotXTo(relX - 280);
            spotYTo(relY - 280);
            if (spotlightRef.current) spotlightRef.current.style.opacity = "1";

            // Mask highlight layer centered on cursor
            if (highlightLayerRef.current) {
              highlightLayerRef.current.style.opacity = "1";
              highlightLayerRef.current.style.maskImage = `radial-gradient(circle 280px at ${relX}px ${relY}px, black 0%, transparent 100%)`;
              highlightLayerRef.current.style.webkitMaskImage = `radial-gradient(circle 280px at ${relX}px ${relY}px, black 0%, transparent 100%)`;
            }
          } else {
            if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
            if (highlightLayerRef.current) highlightLayerRef.current.style.opacity = "0";
          }
        }

        // 8. Magnetic Primary Button (within 90px radius, up to 8px pull)
        if (btnEl && btnXTo && btnYTo) {
          const bRect = btnEl.getBoundingClientRect();
          const bCenterX = bRect.left + bRect.width / 2;
          const bCenterY = bRect.top + bRect.height / 2;
          const dist = Math.hypot(e.clientX - bCenterX, e.clientY - bCenterY);

          if (dist < 90) {
            const pull = (1 - dist / 90) * 8;
            const angle = Math.atan2(e.clientY - bCenterY, e.clientX - bCenterX);
            btnXTo(Math.cos(angle) * pull);
            btnYTo(Math.sin(angle) * pull);
          } else {
            btnXTo(0);
            btnYTo(0);
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      cleanupMouse = () => window.removeEventListener("mousemove", handleMouseMove);
    }

    // 7. Scroll Story (ScrollTrigger, scrub 1, no pinning)
    const ctx = gsap.context(() => {
      const heroContainer = containerRef.current;
      if (!heroContainer) return;

      // As hero leaves viewport:
      // - main image scales to 1.12 and moves up 80px
      // - glow layer moves up 140px
      // - headline moves up 40px and fades to 0.2
      // - olive glows fade out
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainer,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onToggle: (self) => {
            // Pause all repeating tweens when hero is off screen
            if (self.isActive) {
              repeatingTweens.forEach((t) => t.resume());
            } else {
              repeatingTweens.forEach((t) => t.pause());
            }
          },
        },
      });

      if (mainImageRef.current) {
        scrollTl.to(
          mainImageRef.current,
          { scale: 1.12, y: -80, ease: "none" },
          0
        );
      }

      if (glowLayerRef.current) {
        scrollTl.to(glowLayerRef.current, { y: -140, ease: "none" }, 0);
      }

      if (headlineRef.current) {
        scrollTl.to(
          headlineRef.current,
          { y: -40, opacity: 0.2, ease: "none" },
          0
        );
      }

      const glows = [
        glowBottomLeftRef.current,
        glowPanelsRef.current,
      ].filter(Boolean);
      if (glows.length > 0) {
        scrollTl.to(glows, { opacity: 0, ease: "none" }, 0);
      }
    });

    // Pause all repeating tweens when browser tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        repeatingTweens.forEach((t) => t.pause());
      } else {
        repeatingTweens.forEach((t) => t.resume());
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (cleanupMouse) cleanupMouse();
      if (entranceTl) entranceTl.kill();
      repeatingTweens.forEach((t) => t.kill());
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden bg-[#050506]"
    >
      {/* 5. Animated Subtle Film Grain Overlay (0.04 opacity) */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Ambient Luxury Glow: Bottom-Left Corner */}
      <div
        ref={glowBottomLeftRef}
        className="pointer-events-none absolute -bottom-24 -left-24 w-[600px] h-[600px] rounded-full z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      {/* Ambient Luxury Glow: Front Panels */}
      <div
        ref={glowPanelsRef}
        className="pointer-events-none absolute bottom-12 right-24 w-[450px] h-[450px] rounded-full z-10 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 55%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      {/* 1. DEPTH FROM THE SAME IMAGE: 3 Stacked Absolute Layers */}
      <div
        ref={imageSceneWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 will-change-transform"
      >
        {/* Layer (a): Blurred glow copy behind (blur 40px, scale 1.08, opacity 0.55, mix-blend-mode: screen) */}
        <div
          ref={glowLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
          style={{
            filter: "blur(40px)",
            transform: "scale(1.08)",
            mixBlendMode: "screen",
          }}
        >
          <Image
            src="/hero-panels.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* Layer (b): Sharp main image */}
        <div
          ref={mainImageRef}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
        >
          <Image
            src="/hero-panels.jpg"
            alt="CodeNest Architectural Panels"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* Layer (c): Bright highlight copy on top (brightness 1.6, contrast 1.2, mix-blend-mode: screen) for spotlight */}
        <div
          ref={highlightLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform transition-opacity duration-300"
          style={{
            filter: "brightness(1.6) contrast(1.2)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        >
          <Image
            src="/hero-panels.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>

        {/* 3. Cursor Spotlight (neutral white sheen) */}
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute w-[560px] h-[560px] rounded-full z-10 transition-opacity duration-300 opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 45%, transparent 70%)",
            mixBlendMode: "screen",
            willChange: "transform",
          }}
        />

        {/* 4. Light Beams: Two diagonal white light beams crossing panels */}
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-[65%] h-full pointer-events-none overflow-hidden z-10">
          {/* Beam 1 */}
          <div
            ref={beam1Ref}
            className="absolute -top-[50%] -left-[50%] w-[80px] h-[250%] pointer-events-none will-change-transform"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)",
              filter: "blur(6px)",
              mixBlendMode: "screen",
              transform: "rotate(-20deg)",
            }}
          />

          {/* Beam 2: (hidden on mobile) */}
          <div
            ref={beam2Ref}
            className="hidden md:block absolute -top-[50%] -left-[50%] w-[70px] h-[250%] pointer-events-none will-change-transform"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)",
              filter: "blur(6px)",
              mixBlendMode: "screen",
              transform: "rotate(-20deg)",
            }}
          />

          {/* 4. Glints: 7 tiny dots on panel edges */}
          {GLINT_POINTS.map((g, idx) => (
            <div
              key={g.id}
              ref={(el) => {
                glintsRef.current[idx] = el;
              }}
              className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none will-change-transform opacity-0 z-20"
              style={{
                top: g.top,
                right: g.right,
              }}
            />
          ))}
        </div>

        {/* Responsive gradient overlay ensuring headline contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506] via-[#050506]/85 to-transparent md:via-[#050506]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050506]/90 via-transparent to-[#050506]" />
      </div>

      {/* 5. Floating Dust Particles (subtle starlight neutral) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-20">
        {DUST_PARTICLES.map((p, idx) => (
          <div
            key={p.id}
            ref={(el) => {
              particlesRef.current[idx] = el;
            }}
            className={`absolute rounded-full pointer-events-none will-change-transform ${
              !p.mobile ? "hidden md:block" : "block"
            }`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              backgroundColor: idx % 2 === 0 ? "rgba(255,255,255,0.7)" : "rgba(220,220,210,0.5)",
              opacity: p.opacity,
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}
      </div>

      {/* Hero Content (Foreground) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-20">
        <div className="max-w-2xl flex flex-col items-start">
          {/* Tagline / Subtitle Glass Pill */}
          <div
            ref={taglineRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0B0D08]/80 backdrop-blur-md shadow-inner mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-brand-tagline uppercase">
              {SITE_CONFIG.tagline} &bull; INDIA &amp; UAE
            </span>
          </div>

          {/* Headline in Space Grotesk */}
          <div
            ref={headlineRef}
            className="font-heading font-bold text-3xl sm:text-5xl lg:text-[3.85rem] xl:text-[4.25rem] tracking-tighter text-brand-text mb-6 leading-[1.06]"
          >
            <div className="overflow-hidden py-0.5">
              <span className="hero-line-inner block will-change-transform">
                We design.
              </span>
            </div>
            <div className="overflow-hidden py-0.5">
              <span className="hero-line-inner block will-change-transform">
                We{" "}
                <span
                  className="inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg, #D6E850 0%, #A8BE36 38%, #789222 75%, #485E0E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  develop.
                </span>
              </span>
            </div>
            <div className="overflow-hidden py-0.5">
              <span className="hero-line-inner block will-change-transform">
                We create.
              </span>
            </div>
          </div>

          {/* Short subheading */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed mb-8"
          >
            I engineer bespoke digital platforms, custom Next.js storefronts, and tactile digital experiences for visionary ventures across India and the United Arab Emirates.
          </p>

          {/* Action Buttons with Magnetic Pull and Micro-Interactions */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <Link
              ref={primaryBtnRef}
              href="/contact"
              className="btn-primary group relative overflow-hidden text-sm sm:text-base py-3.5 px-8 justify-center shadow-lg shadow-white/10 hover:shadow-white/20 transition-shadow will-change-transform"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {SITE_CONFIG.primaryCta}
              </span>
              {/* Shine Sweep Overlay on Hover */}
              <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </Link>

            {/* Secondary Button */}
            <Link
              href="#portfolio"
              className="btn-secondary group text-sm sm:text-base py-3.5 px-8 justify-center backdrop-blur-md bg-white/[0.03] border border-white/15 hover:border-white/40 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <span>Selected Work</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                ↗
              </span>
            </Link>
          </div>

          {/* Metrics bar with Animated Number Count-Up */}
          

          {/* Downward Scroll Indicator */}
         
        </div>
      </div>
    </section>
  );
}
