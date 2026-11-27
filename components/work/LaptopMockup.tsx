"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface LaptopMockupProps {
  project: Project;
  compact?: boolean;
  priority?: boolean;
  className?: string;
}

export default function LaptopMockup({
  project,
  compact = false,
  priority = false,
  className = "",
}: LaptopMockupProps) {
  const reducedMotion = useReducedMotion();

  const desktopSrc = project.img || project.desktopImage;
  const mobileSrc = project.mobileImg || project.mobileImage;

  // Decreased, sleek laptop mockup dimensions:
  // compact: max 460px (for 2-column grid cards on /work)
  // standard: max 620px (for homepage showcase and project detail hero)
  const defaultMaxWidth = compact
    ? "max-w-[26.25rem] sm:max-w-[28.75rem]"
    : "max-w-[35rem] sm:max-w-[38.75rem]";

  return (
    <div
      className={`relative w-full ${defaultMaxWidth} ${className} mx-auto select-none`}
      style={{ perspective: "1800px" }}
    >
      {/* Entrance Animation Wrapper */}
      <motion.div
        initial={
          reducedMotion
            ? { opacity: 1, y: 0, rotateX: 0 }
            : { opacity: 0, y: 50, rotateX: 18 }
        }
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: reducedMotion ? 0 : 1.0,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "bottom center" }}
        className="relative will-change-transform"
      >
        {/* Soft Olive Glow Under Laptop (Blurred Ellipse) */}
        <div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[85%] h-12 rounded-[50%] pointer-events-none -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(163,184,52,0.20) 0%, rgba(163,184,52,0.05) 50%, transparent 75%)",
            filter: "blur(24px)",
          }}
          aria-hidden="true"
        />

        {/* Laptop Lid */}
        <div className="relative bg-[#0b0b0b] border border-white/10 rounded-[1rem] sm:rounded-[1.125rem] p-[0.5rem_0.5rem_0.625rem] sm:p-[0.625rem_0.625rem_0.75rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9),0_0_35px_rgba(0,0,0,0.85)]">
          {/* Centered 5px Camera Dot */}
          <div
            className="absolute top-[0.1875rem] sm:top-[0.25rem] left-1/2 -translate-x-1/2 w-[0.25rem] sm:w-[0.3125rem] h-[0.25rem] sm:h-[0.3125rem] rounded-full bg-[#1c1c1c] border border-white/20 z-30"
            aria-hidden="true"
          />

          {/* Screen Container (Strict Aspect 16/10, Overflow Hidden, Zero Crop) */}
          <div className="relative w-full aspect-[16/10] rounded-[0.375rem] sm:rounded-[0.5rem] overflow-hidden bg-[#070905]">
            {/* Diagonal Glass Reflection Overlay (Very thin gradient at 8% max opacity) */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)",
              }}
              aria-hidden="true"
            />

            {/* Desktop Screenshot: Fill 1:1, object-cover object-top, zero transforms */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug || project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={desktopSrc}
                  alt={project.alt || `${project.title} ${project.category} on desktop`}
                  fill
                  quality={95}
                  sizes={
                    compact
                      ? "(min-width: 768px) 460px, 100vw"
                      : "(min-width: 1024px) 620px, 100vw"
                  }
                  priority={priority}
                  loading={priority ? undefined : "lazy"}
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Laptop Base */}
        <div
          className="relative -mt-[1px] left-[-5%] w-[110%] h-[0.6875rem] sm:h-[0.8125rem] rounded-b-[1rem] sm:rounded-b-[1.125rem] border-t border-white/10 shadow-[0_12px_25px_rgba(0,0,0,0.8)]"
          style={{
            background: "linear-gradient(180deg, #2c2c2c 0%, #0f0f0f 100%)",
          }}
        >
          {/* Notch Centered at Top */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[5.3125rem] sm:w-[6.5625rem] h-[0.25rem] sm:h-[0.3125rem] rounded-b-[0.25rem] bg-[#1a1a1a] border-b border-x border-white/10"
            aria-hidden="true"
          />
        </div>

        {/* Overlapping Phone Mockup (Hidden when compact=true) */}
        {!compact && (
          <div
            className="absolute -bottom-2.5 right-0 sm:-bottom-3 sm:right-1 w-[18%] min-w-[3.625rem] max-w-[7.8125rem] aspect-[9/19] rounded-[0.875rem] sm:rounded-[1.125rem] border-[3.5px] sm:border-[4.5px] border-[#111111] bg-black shadow-[0_20px_40px_rgba(0,0,0,0.95),0_0_20px_rgba(0,0,0,0.8)] overflow-hidden z-30"
            aria-hidden="true"
          >
            {/* Small Phone Speaker/Camera Notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 sm:w-7 h-1.5 rounded-full bg-[#111111] z-30 pointer-events-none" />

            {/* Phone Mobile Screenshot: Fill 1:1, object-cover object-top, aspect 9/19 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug || project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={mobileSrc}
                  alt={project.alt ? `${project.alt} on mobile` : `${project.title} ${project.category} on mobile`}
                  fill
                  quality={95}
                  sizes="160px"
                  priority={priority}
                  loading={priority ? undefined : "lazy"}
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
