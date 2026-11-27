"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/hero/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import LaptopMockup from "@/components/work/LaptopMockup";
import { PROJECTS, ProjectCategory } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";

const CtaWave3D = dynamic(() => import("@/components/work/CtaWave3D"), {
  ssr: false,
});

const CATEGORIES: ("all" | ProjectCategory)[] = [
  "all",
  "E-commerce website",
  "Business website",
  "dynamic website",
  "Real estate website",
];

export default function AllWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProjectCategory>("all");
  const reducedMotion = useReducedMotion();

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4ef] flex flex-col w-full">
      {/* 1. CINEMATIC PAGE HERO (Interactive Three.js 3D Background) */}
      <PageHero
        titlePrefix="SELECTED"
        titleOutline="WORK"
        description="Bespoke digital platforms, high-performance storefronts, and tactile web applications engineered for visionary founders across India and the United Arab Emirates."
        animationVariant="work"
        nextBgColor="#050505"
      />

      {/* 2. FILTER PILLS & PROJECTS SHOWCASE */}
      <div className="max-w-[87.5rem] mx-auto w-full px-[5vw] pb-24 relative z-20">
        <SectionHeader
          lightTitle="ALL"
          boldTitle="PROJECTS"
          subtitlePrefix="Explore production builds crafted for our"
          badgeText="CLIENTS"
          subtitleSuffix="worldwide"
          className="mb-12 sm:mb-16"
        />

        {/* Filter Pills */}
        <div
          data-anim="fade-down"
          role="tablist"
          aria-label="Filter Projects by Category"
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-16 pb-2 border-b border-white/10"
        >
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a3b834] ${isActive
                  ? "bg-[rgba(163,184,52,0.1)] border border-[rgba(163,184,52,0.55)] text-[#f4f4ef] shadow-[0_0_15px_rgba(163,184,52,0.15)] font-semibold"
                  : "bg-transparent border border-white/10 text-[rgba(244,244,239,0.6)] hover:border-white/20 hover:text-[#f4f4ef]"
                  }`}
              >
                <span>{cat}</span>
                <span
                  className={`font-mono text-[0.6875rem] ${isActive ? "text-[#c4d84a]" : "opacity-50"
                    }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* CARDLESS GRID: 2 columns on desktop (gap 56px vertical, 48px horizontal), 1 column under 760px */}
        <div
          data-anim-stagger="fade-up"
          className="grid grid-cols-1 min-[760px]:grid-cols-2 gap-y-[3.5rem] gap-x-[3rem] justify-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.slug}
                className="group flex flex-col w-full max-w-[28.75rem] cursor-pointer"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a3b834] rounded-2xl"
                >
                  {/* Laptop Mockup (Lifts 8px on hover) */}
                  <div className="w-full transform transition-transform duration-300 ease-out group-hover:-translate-y-2 flex justify-center">
                    <LaptopMockup project={project} compact={true} priority={idx === 0} />
                  </div>

                  {/* Text Details Directly Below (No Card Background) */}
                  <div className="mt-5 flex flex-col">
                    {/* Category & Location/Year */}
                    <p className="font-mono text-xs text-[rgba(244,244,239,0.55)] tracking-wider uppercase mb-2">
                      {project.category} · {project.meta}
                    </p>

                    {/* Title with Arrow on Right */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h2 className="font-heading font-semibold text-2xl sm:text-[1.625rem] text-[#f4f4ef] group-hover:text-white transition-colors tracking-tight">
                        {project.title}
                      </h2>
                      <span className="text-xl text-[rgba(244,244,239,0.6)] group-hover:text-[#a3b834] group-hover:translate-x-[0.1875rem] group-hover:-translate-y-[0.1875rem] transition-all duration-200">
                        ↗
                      </span>
                    </div>

                    {/* Two-Line Clamped Description */}
                    <p className="line-clamp-2 text-sm text-[rgba(244,244,239,0.65)] leading-relaxed mb-5">
                      {project.desc}
                    </p>

                    {/* Tech Tag Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[rgba(244,244,239,0.7)] font-mono text-[0.6875rem] tracking-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Editorial CTA Poster: Compact, balanced width with full-cover dim-white 3D particle wave */}
        <section
          data-anim="zoom-in"
          className="mt-24 sm:mt-32 lg:mt-36 w-full max-w-[63.75rem] mx-auto rounded-3xl border border-white/10 bg-[#060608] py-5 sm:py-6 px-6 sm:px-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] select-none"
        >
          {/* 1. Full-Cover 3D Particle Wave Canvas (Black, Dim White, Soft Zinc) */}
          <CtaWave3D />

          {/* 2. Gentle Contrast Vignette (Keeps headline razor-sharp while showing full-width wave) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(to right, rgba(6,6,8,0.75) 0%, rgba(6,6,8,0.4) 45%, rgba(6,6,8,0.1) 75%, transparent 100%)",
            }}
          />

          {/* Subtle Ambient Radial Lighting Top-Left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 w-[17.5rem] h-[17.5rem] rounded-full z-0"
            style={{
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)",
              filter: "blur(3.125rem)",
            }}
          />

          {/* Top-Left Bold Diagonal Arrow ↘ (Explicitly sized so it never expands) */}
          <div className="relative z-10 mb-4 sm:mb-5 flex items-center">
            <svg
              width={26}
              height={26}
              style={{ width: "1.625rem", height: "1.625rem", minWidth: "1.625rem", minHeight: "1.625rem" }}
              className="text-white/90"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 16L48 48M48 48H22M48 48V22"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>

          {/* High-Impact Metallic Headline: One single line with decreased font size */}
          <div className="relative z-10 max-w-3xl mb-5 sm:mb-6 text-left">
            <h2
              className="font-bold tracking-tight leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 3.4vw, 2.6rem)",
                fontFamily: "'Outfit', sans-serif",
                backgroundImage:
                  "linear-gradient(135deg, #FFFFFF 0%, #EDEDF2 30%, #8A8E98 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Have a Project In Mind?
            </h2>
          </div>

          {/* CTA Pill Button (Compact Height) */}
          <div className="relative z-10 mb-5 sm:mb-7 flex justify-start">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-5 py-2 sm:py-2.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/40 backdrop-blur-md transition-all duration-300 text-xs sm:text-sm text-white/90 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="font-light tracking-wide">Let&apos;s talk now</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Full-Width Horizontal Accent Divider Line */}
          <div
            className="relative z-10 w-full mb-3.5 sm:mb-4"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.05) 100%)",
            }}
          />

          {/* Bottom Row: Studio Handle on Right */}
          <div className="relative z-10 flex justify-end text-[0.6875rem] sm:text-xs font-mono text-white/50">
            <a
              href="mailto:hi@codenest.studio"
              className="hover:text-white transition-colors"
            >
              @codenest.studio
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
