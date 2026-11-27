"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaXTwitter,
  FaComments,
  FaFileInvoiceDollar,
  FaRocket,
  FaPalette,
  FaFlagCheckered,
} from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/site";

type IconType = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

// 5 points, each with its own matching icon
const PROCESS_POINTS: { num: string; title: string; tag: string; Icon: IconType }[] = [
  { num: "01", title: "Enquiry & Discovery", tag: "Discovery", Icon: FaComments },
  { num: "02", title: "Transparent Quotation", tag: "Agreement", Icon: FaFileInvoiceDollar },
  { num: "03", title: "Advance 40% Kickoff", tag: "Architecture", Icon: FaRocket },
  { num: "04", title: "Design Approval 30%", tag: "UI/UX Review", Icon: FaPalette },
  { num: "05", title: "Production Launch 30%", tag: "Deployment", Icon: FaFlagCheckered },
];

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function HowWeWork() {
  const [activeIdx, setActiveIdx] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const vortexRef = useRef<SVGSVGElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Vortex rotation on scroll
      if (vortexRef.current && !isReducedMotion) {
        gsap.to(vortexRef.current, {
          rotate: "+=20",
          transformOrigin: "85% 45%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // Left title
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

      // Intro paragraph (top right)
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

      // Bottom capsule
      if (bottomBarRef.current) {
        gsap.fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 70%", once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="hww-section"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050506",
        color: "#fff",
      }}
    >
      {/* Font + layout CSS (does not depend on Tailwind) */}
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

        @media (max-width: 520px) {
          .hww-milestone-pill { display: none !important; }
        }
      `}</style>

      {/* BACKGROUND: wireframe vortex */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <svg
          ref={vortexRef}
          style={{
            position: "absolute",
            right: "-10vw",
            top: "-12vh",
            width: "110vw",
            maxWidth: 1600,
            height: "125vh",
            opacity: 0.3,
            pointerEvents: "none",
            willChange: "transform",
          }}
          viewBox="0 0 1600 1200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 44 }).map((_, i) => {
            const rx = 60 + i * 32;
            const ry = 38 + i * 21;
            const cx = 1180 - i * 5;
            const cy = 470 + i * 7;
            const rot = -27 + i * 1.85;
            const opacity = Math.max(0.04, 0.36 - i * 0.007);
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={ry}
                transform={`rotate(${rot} ${cx} ${cy})`}
                stroke="#E3D9D1"
                strokeWidth={i % 4 === 0 ? "1.2" : "0.75"}
                strokeDasharray={i % 6 === 0 ? "5 7" : undefined}
                opacity={opacity}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 50% 50%, transparent 45%, rgba(5,5,6,0.7) 80%, #050506 100%)",
          }}
        />
      </div>

      {/* 1. TOP BRANDING */}
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
            CodeNest Studio
          </span>
        </div>
      </div>

      {/* 2. MAIN LAYOUT */}
      <div className="hww-grid">
        {/* LEFT: title */}
        <div ref={leftColRef} style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.88 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <span
                style={{
                  ...FONT,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  fontSize: "clamp(3.2rem, 7.2vw, 5.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                How
              </span>

              <svg
                style={{
                  width: "clamp(48px, 6vw, 80px)",
                  height: "clamp(48px, 6vw, 80px)",
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
                marginTop: 8,
                fontSize: "clamp(3.2rem, 7.2vw, 5.8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              we work
            </span>
          </div>
        </div>

        {/* RIGHT: paragraph on top, 5 points below */}
        <div style={{ width: "100%", minWidth: 0 }}>
          <p
            ref={introRef}
            style={{
              ...FONT,
              marginBottom: "2.25rem",
              maxWidth: "27.5rem",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "#c0c3ce",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            We create bold digital identities, engaging web architectures, and seamless design experiences that connect and inspire.
          </p>

          <div
            ref={rowsRef}
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {PROCESS_POINTS.map((pt, idx) => {
              const isActive = idx === activeIdx;
              const RowIcon = pt.Icon;
              return (
                <div
                  key={pt.num}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "1rem 0.5rem 1rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    background: isActive ? "rgba(255,255,255,0.025)" : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
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
                      fontWeight: isActive ? 500 : 300,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {pt.title}
                  </span>

                  {/* Icon: pushed to the right margin */}
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "2.5rem",
                      height: "2.5rem",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "0.625rem",
                      background: isActive
                        ? "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
                      border: `1px solid ${isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)"
                        }`,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <RowIcon className="text-white" style={{ fontSize: "0.9375rem" }} />
                  </span>

                  {/* Milestone pill on the active row (sits left of the icon) */}
                  <span
                    className="hww-milestone-pill"
                    style={{
                      ...FONT,
                      position: "absolute",
                      right: "4rem",
                      top: "50%",
                      transform: "translateY(-50%)",
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
                    {pt.tag} Milestone
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM CONTACT CAPSULE */}
      <div
        ref={bottomBarRef}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "0.625rem 1.5rem",
            borderRadius: "1rem",
            border: "1px dashed rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            maxWidth: "100%",
          }}
        >
          <Link
            href="/contact"
            style={{
              ...FONT,
              padding: "0.25rem 0.875rem",
              borderRadius: "0.375rem",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            Reach Us Today!
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp style={{ color: "#25D366", fontSize: "1rem" }} />
            </a>
            <a href={SITE_CONFIG.instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram style={{ fontSize: "1rem" }} />
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} aria-label="Email">
              <FaEnvelope style={{ fontSize: "1rem" }} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X Twitter">
              <FaXTwitter style={{ fontSize: "1rem" }} />
            </a>
          </div>

          <span style={{ width: 1, height: "0.875rem", background: "rgba(255,255,255,0.2)" }} />

          <span style={{ ...FONT, fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
            CodeNest Studio
          </span>
        </div>
      </div>
    </section>
  );
}