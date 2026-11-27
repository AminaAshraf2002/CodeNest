"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LaptopMockup from "./LaptopMockup";
import { PROJECTS } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";
import SectionHeader from "@/components/ui/SectionHeader";

const DISPLAY_PROJECTS = PROJECTS.slice(0, 3);

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const activeProject = DISPLAY_PROJECTS[activeIndex] || DISPLAY_PROJECTS[0];

  // Auto-rotate logic (every 5 seconds, pauses on hover and reduced motion)
  useEffect(() => {
    if (reducedMotion || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISPLAY_PROJECTS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reducedMotion, isHovered]);

  const handleSelectProject = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-[4.5rem] px-[5vw] bg-[#050505] text-[#f4f4ef] border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Luxury Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-[-5rem] w-[32.5rem] h-[32.5rem] rounded-full -z-10"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          filter: "blur(8.125rem)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[87.5rem] mx-auto w-full">
        {/* Section Header (Matches Services Section Style) */}
        <div ref={headerRef} className="flex flex-col items-center mb-12 sm:mb-16">
          <SectionHeader
            lightTitle="SELECTED"
            boldTitle="WORK"
            subtitlePrefix="Engineered to take your"
            badgeText="PROJECTS"
            subtitleSuffix="to the next level"
            className="mb-6"
          />
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-xs font-mono text-white/80 hover:text-white hover:border-white/40 transition-all hover:scale-105"
          >
            <span>View all projects</span>
            <span>↗</span>
          </Link>
        </div>

        {/* Two-Column Grid: Left 380px/440px, Right 1fr, Items Centered */}
        <div className="grid grid-cols-1 min-[960px]:grid-cols-[22.5rem_1fr] gap-10 min-[960px]:gap-[3.5rem] items-center">
          {/* LEFT COLUMN */}
          <div data-anim="from-left" className="flex flex-col w-full">
            {/* Project Selection Tabs: Vertical on desktop, horizontal scrollable pills under 960px */}
            <div
              role="tablist"
              aria-label="Selected Projects"
              className="flex flex-row overflow-x-auto gap-2 pb-3 mb-6 scrollbar-none min-[960px]:flex-col min-[960px]:overflow-visible min-[960px]:pb-0"
            >
              {DISPLAY_PROJECTS.map((project, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={project.id}
                    role="tab"
                    id={`tab-${project.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${project.id}`}
                    onClick={() => handleSelectProject(idx)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 shrink-0 min-[960px]:shrink min-[960px]:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive
                        ? "bg-white/10 border border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "bg-transparent border border-transparent text-[rgba(244,244,239,0.55)] hover:border-white/15 hover:text-[#f4f4ef]"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs tracking-wider ${
                        isActive ? "text-white font-bold" : "opacity-60"
                      }`}
                    >
                      {project.index}
                    </span>
                    <span className="font-heading font-medium text-sm sm:text-base whitespace-nowrap min-[960px]:whitespace-normal">
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Project Details Panel (Fades in with translateY 14px to 0) */}
            <div
              id={`panel-${activeProject.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeProject.id}`}
              className="min-h-[13.75rem]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-start"
                >
                  {/* Category and Location/Year in small mono muted text */}
                  <p className="font-mono text-xs text-[rgba(244,244,239,0.55)] tracking-wider uppercase mb-2">
                    {activeProject.category} · {activeProject.locationYear}
                  </p>

                  {/* Description Paragraph */}
                  <p className="text-sm sm:text-base text-[rgba(244,244,239,0.85)] leading-relaxed mb-5">
                    {activeProject.description}
                  </p>

                  {/* Tech Tag Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[rgba(244,244,239,0.7)] font-mono text-[0.75rem] tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Pill Button in Standard Luxury White */}
                  <Link
                    href={activeProject.link}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-bold text-black text-sm shadow-[0_10px_30px_-8px_rgba(255,255,255,0.3)] hover:scale-[1.04] active:scale-[0.98] transition-transform duration-200 bg-white hover:bg-[#EDEDED]"
                  >
                    <span>View project</span>
                    <span className="text-base leading-none">↗</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN: CSS-only Laptop Mockup */}
          <div data-anim="from-right" className="w-full flex flex-col items-center justify-center pt-4 min-[960px]:pt-0">
            <LaptopMockup project={activeProject} priority={true} />

            {/* Small centered pill: "See all {n} projects" under laptop showcase */}
            <div className="mt-8 flex justify-center w-full">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0B0D08]/80 hover:bg-white/[0.06] hover:border-white/30 transition-all text-xs font-mono text-[rgba(244,244,239,0.7)] hover:text-[#f4f4ef] shadow-sm"
              >
                <span>See all {PROJECTS.length} projects</span>
                <span className="text-white">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
