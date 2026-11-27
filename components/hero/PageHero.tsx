"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { barlowCondensed } from "@/lib/fonts";
import type { PageHeroAnimationVariant } from "./PageHero3DCanvas";

// Dynamically import Three.js 3D canvas (SSR disabled)
const PageHero3DCanvas = dynamic(() => import("./PageHero3DCanvas"), {
  ssr: false,
});

const HERO_TITLE_FONT: React.CSSProperties = {
  fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
  fontWeight: 800,
};

export interface PageHeroProps {
  titlePrefix: string;
  titleOutline?: string; // Hollow outlined text matching reference
  titleGradient?: string; // Fallback
  titleSuffix?: string;
  description: string;
  bgImage?: string; // Optional backdrop texture
  animationVariant?: PageHeroAnimationVariant; // Custom Three.js 3D animation variant
  nextBgColor?: string; // Background color of the next section to seamlessly blend into
  blendHeight?: string; // Height of the bottom blend gradient
  className?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  titlePrefix,
  titleOutline,
  titleGradient = "",
  titleSuffix = "",
  description,
  bgImage,
  animationVariant = "about",
  nextBgColor = "#000000",
  blendHeight = "h-44 sm:h-64",
  className = "",
  children,
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const resolvedVariant: PageHeroAnimationVariant = animationVariant || "about";

  return (
    <section
      ref={containerRef}
      className={`relative min-h-[82vh] sm:min-h-[88vh] flex items-center pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden bg-[#050506] text-white select-none ${className}`}
    >
      {/* ======================================================== */}
      {/* 1. THREE.JS 3D INTERACTIVE BACKGROUND CANVAS              */}
      {/* ======================================================== */}
      <PageHero3DCanvas variant={resolvedVariant} />

      {/* ======================================================== */}
      {/* 2. ATMOSPHERIC BLACK BACKGROUND & CYBER BLUEPRINT GRID    */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* Subtle Blueprint Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Technical Corner Crosshairs & Coordinates */}
        <div className="absolute top-28 left-8 text-[0.625rem] font-mono text-white/20 hidden md:block">
          + LAT: 28.6139° N // LNG: 77.2090° E
        </div>
        <div className="absolute top-28 right-8 text-[0.625rem] font-mono text-white/20 hidden md:block text-right">
          SYS // CN-3D-V4 +
        </div>

        {/* Ambient Radial Spotlight (Subtle Dim White behind the 3D sculpture) */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[37.5rem] sm:w-[56.25rem] h-[34.375rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.035) 0%, rgba(200, 200, 210, 0.01) 45%, transparent 70%)",
            filter: "blur(7.5rem)",
          }}
        />

        {/* Secondary Platinum Ambient Flare */}
        <div
          className="absolute -top-24 left-1/4 w-[31.25rem] h-[21.875rem] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 65%)",
            filter: "blur(6.25rem)",
          }}
        />

        {/* Dark Left Vignette for Perfect Editorial Legibility */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-[#050506] via-[#050506]/85 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#050506] via-[#050506]/80 to-transparent pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 3. EDITORIAL HERO CONTENT                                */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-20 w-full">
        <div ref={contentRef} data-anim-stagger="fade-up" className="max-w-3xl">
          {/* Bold Editorial Headline Matching Design Reference: Line 1 Solid, Line 2 Outline + Circle Arrow */}
          <div className="flex flex-col mb-7">
            {/* Line 1: Solid White Bold Uppercase */}
            <span
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold uppercase tracking-tight text-white leading-[0.92]"
              style={HERO_TITLE_FONT}
            >
              {titlePrefix}
            </span>

            {/* Line 2: Hollow Outlined Text + Downward Arrow Circle Icon */}
            <div className="flex items-center gap-4 sm:gap-6 mt-1 sm:mt-2">
              <span
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold uppercase tracking-tight leading-[0.92]"
                style={{
                  ...HERO_TITLE_FONT,
                  WebkitTextStroke: "4px #fff",
                  paintOrder: "stroke fill",
                  color: "#050506",
                  WebkitTextFillColor: "#050506",
                  strokeLinejoin: "round",
                }}
              >
                {titleOutline || titleGradient}
              </span>

              {/* Downward Arrow Circular Badge matching reference pin */}
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white text-black flex items-center justify-center font-bold text-xl sm:text-2xl shadow-2xl flex-shrink-0 hover:scale-105 transition-transform select-none">
                ↘
              </div>
            </div>
          </div>

          {/* Subheading / Narrative with Left Accent Border matching reference pin */}
          <div className="border-l-2 border-white/40 pl-5 py-1 mb-8 max-w-xl">
            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-sans">
              {description}
            </p>
          </div>

          {/* Horizontal Underline (Stats removed, badge removed, underline preserved) */}
          <div className="border-t border-white/15 max-w-xl my-8" />

          {/* Extra Children */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. SEAMLESS BOTTOM GRADIENT BLEND (Melts into next section) */}
      {/* ======================================================== */}
      <div
        className={`absolute inset-x-0 bottom-0 ${blendHeight} pointer-events-none z-10`}
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(3, 3, 3, 0.45) 35%, ${nextBgColor} 100%)`,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
