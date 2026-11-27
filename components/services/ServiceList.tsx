"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/site";

const SERVICE_ITEMS = [
  { id: "web-dev", title: "Web Design & Development", href: "/services/business-websites" },
  { id: "brand-identity", title: "Brand Identity & UI/UX Design", href: "/contact?service=brand-identity" },
  { id: "3d-motion", title: "Animated & 3D Websites", href: "/services/animated-and-3d-websites" },
  { id: "ecommerce", title: "E-Commerce & Shopify", href: "/services/ecommerce-solutions" },
  { id: "custom-code", title: "Custom Coding & Web Apps", href: "/services/custom-coding-web-apps" },
  { id: "performance", title: "Performance & SEO Tuning", href: "/services/performance-and-support" },
];

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function ServiceList() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ourRef = useRef<HTMLSpanElement>(null);
  const servicesRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];

    const ctx = gsap.context(() => {
      // 1. Header
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      tl.fromTo(
        ourRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          servicesRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "<0.1"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.7, ease: "power2.out" },
          "-=0.3"
        );

      // 2. Cards: left from left, right from right, 3D rotation
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -80 : 80,
            y: 40,
            rotateY: isLeft ? 28 : -28,
            scale: 0.94,
            transformPerspective: 900,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: (i % 2) * 0.12,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });

      // 3. Bottom CTA
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // 3D tilt + spotlight on hover
  const onCardMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--o", "1");
    gsap.to(el, {
      rotateY: (x / r.width - 0.5) * 12,
      rotateX: -(y / r.height - 0.5) * 12,
      y: -4,
      transformPerspective: 700,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onCardLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--o", "0");
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[90vh] lg:min-h-screen py-24 sm:py-32 md:py-36 px-5 sm:px-8 lg:px-12 overflow-hidden select-none flex flex-col items-center justify-center bg-[#050506]"
    >
      {/* Font: Outfit with all weights (thin to bold) */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>

      {/* ============================================================ */}
      {/* BACKGROUND: UNCHANGED (Deep Black + Faint Waves)             */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-100 140 C 300 70, 600 230, 1100 110 C 1300 60, 1500 170, 1600 190" stroke="#E3D9D1" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.35" />
            <path d="M-100 270 C 250 190, 700 370, 1050 230 C 1300 150, 1520 290, 1600 310" stroke="#E3D9D1" strokeWidth="1" opacity="0.40" />
            <path d="M-100 420 C 350 360, 650 520, 1000 390 C 1280 300, 1480 440, 1600 460" stroke="#E3D9D1" strokeWidth="1.2" opacity="0.30" />
            <path d="M-100 590 C 220 510, 750 690, 1150 520 C 1350 430, 1500 590, 1600 610" stroke="#E3D9D1" strokeWidth="1" strokeDasharray="6 8" opacity="0.35" />
            <path d="M-100 740 C 300 680, 680 840, 1080 690 C 1320 600, 1490 750, 1600 780" stroke="#E3D9D1" strokeWidth="1" opacity="0.40" />
            <path d="M-100 870 C 400 810, 800 940, 1200 820 C 1400 760, 1550 880, 1600 910" stroke="#E3D9D1" strokeWidth="1.2" opacity="0.25" />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CONTENT                                                      */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* 1. Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white"
            style={{
              ...FONT,
              marginBottom: "0.75rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              gap: "0.3em",
            }}
          >
            <span ref={ourRef} style={{ display: "inline-block", fontWeight: 200 }}>
              OUR
            </span>
            <span ref={servicesRef} style={{ display: "inline-block", fontWeight: 700 }}>
              SERVICES
            </span>
          </h2>

          <div
            ref={subRef}
            className="text-sm sm:text-base"
            style={{
              ...FONT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              color: "#b8b8c2",
              fontWeight: 300,
            }}
          >
            <span>That can take your</span>
            <span
              style={{
                padding: "0.125rem 0.5rem",
                borderRadius: "0.25rem",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "0.85em",
              }}
            >
              BRAND
            </span>
            <span>to the next level</span>
          </div>

          <div
            ref={dividerRef}
            style={{
              width: "6.875rem",
              height: 1,
              margin: "1.375rem auto 0",
              background: "rgba(255,255,255,0.3)",
              transformOrigin: "center",
            }}
          />
        </div>

        {/* 2. Glass cards: ONE corner fades fully into the background */}
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 mb-12 sm:mb-16"
          style={{ gap: "1.125rem" }}
        >
          {SERVICE_ITEMS.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            // Cards 1,3,5 -> bottom-right corner fades out (bright = top-left)
            // Cards 2,4,6 -> top-left corner fades out (bright = bottom-right)
            const dir = isLeft ? "to bottom right" : "to top left";

            // Glass fill: brightest in the opposite corner, 0 in the faded corner
            const fillGradient = `linear-gradient(${dir}, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 88%)`;

            // Mask for the border: solid until 50%, fully gone by 82%
            const borderMask = `linear-gradient(${dir}, #000 0%, #000 50%, transparent 82%)`;

            // Soft diagonal sheen
            const sheen =
              "linear-gradient(115deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0) 62%)";

            return (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "3.875rem",
                  padding: "0 1.5rem",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  textAlign: "center",
                  cursor: "pointer",
                  willChange: "transform",
                  background: fillGradient,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glass sheen */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: sheen,
                    pointerEvents: "none",
                  }}
                />

                {/* Thin white border, masked out at ONE corner */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.45)",
                    pointerEvents: "none",
                    WebkitMaskImage: borderMask,
                    maskImage: borderMask,
                  }}
                />

                {/* Cursor-following spotlight */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: "var(--o, 0)" as unknown as number,
                    transition: "opacity 0.3s ease",
                    background:
                      "radial-gradient(10rem circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.18), transparent 70%)",
                  }}
                />

                {/* Service Title */}
                <span
                  className="text-base sm:text-[1.0625rem] md:text-lg"
                  style={{
                    ...FONT,
                    position: "relative",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                    color: "rgba(255,255,255,0.95)",
                    transform: "translateZ(1.25rem)",
                  }}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>

        {/* 3. Bottom: contact capsule */}
        <div
          ref={bottomRef}
          className="flex flex-col items-center justify-center gap-3.5 text-center"
        >
          <div className="flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-widest text-white/60 font-mono">
            <span>Make Your</span>
            <span className="text-white font-bold text-sm sm:text-base">✔</span>
            <span>Call</span>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-7 py-3 rounded-2xl border border-white/15"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 0.625rem 1.875rem -0.3125rem rgba(0,0,0,0.5)",
            }}
          >
            <a
              href={SITE_CONFIG.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
            >
              <FaInstagram className="text-white/70 text-base" />
              <span>@{SITE_CONFIG.instagramHandle}</span>
            </a>

            <span className="hidden sm:inline w-[1px] h-3.5 bg-white/15" />

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
            >
              <FaWhatsapp className="text-[#25D366] text-base" />
              <span>{SITE_CONFIG.whatsappNumber}</span>
            </a>

            <span className="hidden sm:inline w-[1px] h-3.5 bg-white/15" />

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
            >
              <FaEnvelope className="text-white/70 text-sm" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}