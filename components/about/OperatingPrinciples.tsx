"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRINCIPLES_DATA: {
  num: string;
  title: string;
  tag: string;
  desc: string;
}[] = [
  {
    num: "01",
    title: "Direct Client Ownership",
    tag: "Sovereignty",
    desc: "Zero proprietary lock-in. You own your code repository, cloud deployment, PostgreSQL database cluster, and payment accounts directly.",
  },
  {
    num: "02",
    title: "Fast & Mobile-First Performance",
    tag: "Performance",
    desc: "Every millisecond counts. Every build is rigorously tuned for fast mobile loading, responsive layouts, and solid Core Web Vitals on real-world networks.",
  },
  {
    num: "03",
    title: "Restrained, Editorial Aesthetics",
    tag: "Aesthetics",
    desc: "No template gimmicks, stock illustrations, or generic components. High-contrast typography, generous negative space, and calculated tactile motion.",
  },
  {
    num: "04",
    title: "Cross-Border Fluency",
    tag: "Cross-Border",
    desc: "Engineered specifically for the Indian and UAE digital ecosystems: multi-currency transactions, regional payment rails (UPI, Apple Pay, cards), and international CDN routing.",
  },
];

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function OperatingPrinciples() {
  const [activeIdx, setActiveIdx] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const glowGreenRef = useRef<HTMLDivElement>(null);
  const glowWhiteRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // BACKGROUND ANIMATION (skipped if the user prefers reduced motion)
      if (!isReducedMotion) {
        // Green glow drifts slowly and gently pulses
        if (glowGreenRef.current) {
          gsap.to(glowGreenRef.current, {
            x: -70,
            y: 50,
            scale: 1.12,
            duration: 9,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        // White glow drifts the opposite way
        if (glowWhiteRef.current) {
          gsap.to(glowWhiteRef.current, {
            x: 80,
            y: -40,
            scale: 1.1,
            duration: 11,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        // Grid slowly slides on its own
        if (gridRef.current) {
          gsap.to(gridRef.current, {
            backgroundPosition: "64px 64px",
            duration: 14,
            ease: "none",
            repeat: -1,
          });

          // Grid also moves a bit as you scroll (parallax)
          gsap.to(gridRef.current, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }

      // Left title entrance
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      }

      // Intro paragraph
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          }
        );
      }

      // Rows stagger
      if (rowsRef.current) {
        gsap.fromTo(
          rowsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operating-principles"
      className="hww-section"
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap");

        .hww-section { padding: 6rem 1.25rem; }
        @media (min-width: 640px)  { .hww-section { padding: 7rem 2rem; } }
        @media (min-width: 1024px) { .hww-section { padding: 8rem 3.5rem; } }

        .hww-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 3rem;
          align-items: start;
          width: 100%;
          max-width: 80rem;
          margin: 0 auto 4rem;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 1024px) {
          .hww-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: 4rem; }
        }

        .hww-row-title { font-size: 0.9375rem; }
        @media (min-width: 640px)  { .hww-row-title { font-size: 1.0625rem; } }
        @media (min-width: 1024px) { .hww-row-title { font-size: 1.25rem; } }
      `}</style>

      {/* BACKGROUND: black base + brand-green glows + blueprint grid (matches logo and "engineered" content) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Brand green glow, top right */}
        <div
          ref={glowGreenRef}
          style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "60vw",
            height: "60vw",
            maxWidth: "56.25rem",
            maxHeight: "56.25rem",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(163,184,58,0.14) 0%, rgba(163,184,58,0.045) 40%, rgba(0,0,0,0) 70%)",
            filter: "blur(2.5rem)",
            willChange: "transform",
          }}
        />

        {/* Soft white glow, bottom left */}
        <div
          ref={glowWhiteRef}
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-15%",
            width: "55vw",
            height: "55vw",
            maxWidth: "50rem",
            maxHeight: "50rem",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 45%, rgba(0,0,0,0) 70%)",
            filter: "blur(2.5rem)",
          }}
        />

        {/* Blueprint grid, fades out toward the edges */}
        <div
          ref={gridRef}
          style={{
            position: "absolute",
            top: "-10%",
            bottom: "-10%",
            left: 0,
            right: 0,
            willChange: "transform",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 85%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 85%)",
          }}
        />
      </div>

      {/* 1. TOP BRANDING PILL */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.375rem 1rem",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              width: "1rem",
              height: "1rem",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.5rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            CN
          </span>
          <span
            style={{
              ...FONT,
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Operating Principles // Foundation
          </span>
        </div>
      </div>

      {/* 2. MAIN LAYOUT */}
      <div className="hww-grid">
        {/* LEFT: Our ↙ Principles */}
        <div data-anim="from-left" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.88 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span
                style={{
                  ...FONT,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Our
              </span>

              <svg
                style={{
                  width: "clamp(2.25rem, 4.5vw, 3.375rem)",
                  height: "clamp(2.25rem, 4.5vw, 3.375rem)",
                  flexShrink: 0,
                  color: "#fff",
                }}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 14L14 50M14 50H46M14 50V18"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>

            <span
              style={{
                ...FONT,
                fontWeight: 800,
                textTransform: "uppercase",
                marginTop: "0.5rem",
                fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                letterSpacing: "-0.03em",
              }}
            >
              principles
            </span>
          </div>
        </div>

        {/* RIGHT: description on top + 4 principle rows */}
        <div style={{ width: "100%", minWidth: 0 }}>
          <p
            data-anim="fade-up"
            style={{
              ...FONT,
              marginBottom: "2.25rem",
              maxWidth: "30rem",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "#c0c3ce",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            The foundational standards that guide every platform we engineer. Direct craftsmanship, zero proprietary lock-in, and sub-second velocity across India and the UAE.
          </p>

          <div
            data-anim-stagger="fade-up"
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {PRINCIPLES_DATA.map((pt, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={pt.num}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.125rem 0.5rem 1.125rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    background: isActive ? "rgba(255,255,255,0.025)" : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", width: "100%" }}>
                    {/* Number */}
                    <span
                      style={{
                        ...FONT,
                        width: "1.875rem",
                        flexShrink: 0,
                        fontSize: "0.9375rem",
                        color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {pt.num}
                    </span>

                    {/* Title */}
                    <span
                      className="hww-row-title"
                      style={{
                        ...FONT,
                        letterSpacing: "0.02em",
                        fontWeight: isActive ? 600 : 300,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {pt.title}
                    </span>

                    {/* Tag pill on active row (now at the right edge) */}
                    <span
                      style={{
                        ...FONT,
                        marginLeft: "auto",
                        padding: "0.25rem 0.625rem",
                        borderRadius: 999,
                        background: "#E5E7EB",
                        color: "#000",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      {pt.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      ...FONT,
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      color: isActive ? "#d8dbe4" : "#8e919d",
                      paddingLeft: "2.75rem",
                      paddingRight: "3.75rem",
                      marginTop: "0.5rem",
                      marginBottom: 0,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {pt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}