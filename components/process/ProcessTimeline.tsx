"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/data/process";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  FaCompassDrafting,
  FaGlobe,
  FaLockOpen,
  FaShieldHalved,
  FaFileLines,
  FaCreditCard,
  FaFileContract,
  FaHandshake,
  FaCodeBranch,
  FaRocket,
  FaDatabase,
  FaCubes,
  FaMobileScreen,
  FaArrowsRotate,
  FaWandMagicSparkles,
  FaCircleCheck,
  FaGaugeHigh,
  FaLock,
  FaBoxArchive,
  FaShieldHeart,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa6";

// Render official Font Awesome icons (no emojis)
function renderProcessIcon(iconName: string) {
  switch (iconName) {
    case "compass":
      return <FaCompassDrafting className="w-3.5 h-3.5 text-white/90" />;
    case "globe":
      return <FaGlobe className="w-3.5 h-3.5 text-white/90" />;
    case "lock-open":
      return <FaLockOpen className="w-3.5 h-3.5 text-white/90" />;
    case "shield":
      return <FaShieldHalved className="w-3.5 h-3.5 text-white/90" />;
    case "file-lines":
      return <FaFileLines className="w-3.5 h-3.5 text-white/90" />;
    case "credit-card":
      return <FaCreditCard className="w-3.5 h-3.5 text-white/90" />;
    case "file-contract":
      return <FaFileContract className="w-3.5 h-3.5 text-white/90" />;
    case "handshake":
      return <FaHandshake className="w-3.5 h-3.5 text-white/90" />;
    case "code-branch":
      return <FaCodeBranch className="w-3.5 h-3.5 text-white/90" />;
    case "rocket":
      return <FaRocket className="w-3.5 h-3.5 text-white/90" />;
    case "database":
      return <FaDatabase className="w-3.5 h-3.5 text-white/90" />;
    case "cubes":
      return <FaCubes className="w-3.5 h-3.5 text-white/90" />;
    case "mobile-screen":
      return <FaMobileScreen className="w-3.5 h-3.5 text-white/90" />;
    case "arrows-rotate":
      return <FaArrowsRotate className="w-3.5 h-3.5 text-white/90" />;
    case "wand-sparkles":
      return <FaWandMagicSparkles className="w-3.5 h-3.5 text-white/90" />;
    case "circle-check":
      return <FaCircleCheck className="w-3.5 h-3.5 text-white/90" />;
    case "gauge":
      return <FaGaugeHigh className="w-3.5 h-3.5 text-white/90" />;
    case "lock":
      return <FaLock className="w-3.5 h-3.5 text-white/90" />;
    case "box-archive":
      return <FaBoxArchive className="w-3.5 h-3.5 text-white/90" />;
    case "shield-heart":
      return <FaShieldHeart className="w-3.5 h-3.5 text-white/90" />;
    default:
      return <FaCircleCheck className="w-3.5 h-3.5 text-white/90" />;
  }
}

export default function ProcessTimeline() {
  const steps = PROCESS_STEPS;
  const [activeIdx, setActiveIdx] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion = useReducedMotion();

  // Explicit, rock-solid geometry along the circular arc (WOVE Reference)
  const ARC_POINTS = useMemo(
    () => [
      { step: "01", x: 24, y: 44, rot: -32 },
      { step: "02", x: 74, y: 102, rot: -16 },
      { step: "03", x: 96, y: 160, rot: 0 }, // Apex of arc
      { step: "04", x: 74, y: 218, rot: 16 },
      { step: "05", x: 24, y: 276, rot: 32 },
    ],
    []
  );

  // Intermediate subtle dots along the circular arc between numbers (WOVE Reference)
  const INTER_DOTS = useMemo(
    () => [
      { x: 48, y: 73 },
      { x: 88, y: 131 },
      { x: 88, y: 189 },
      { x: 48, y: 247 },
    ],
    []
  );

  // Smooth scroll to a specific milestone step
  const scrollToStep = useCallback(
    (targetIdx: number) => {
      const st = scrollTriggerRef.current;
      if (!st) return;

      const progress = targetIdx / (steps.length - 1);
      const targetScroll = st.start + progress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    },
    [steps.length]
  );

  // GSAP ScrollTrigger: Instant 1:1 hardware sync with Lenis
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper) return;

    // Responsive scroll distance for fluid progression
    const totalScrollDistance = steps.length * 520;

    const ctx = gsap.context(() => {
      // Smooth entrance reveal for the Collaborate stage container
      if (stage) {
        gsap.from(stage, {
          scrollTrigger: {
            trigger: stage,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: pinContainerRef.current,
          start: "top top+=75",
          end: () => `+=${totalScrollDistance}`,
          scrub: 0.7, // Silky smooth damping that locks with Lenis without lag
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * (steps.length - 1);
            const rounded = Math.min(
              steps.length - 1,
              Math.max(0, Math.round(raw))
            );
            setActiveIdx((prev) => (prev !== rounded ? rounded : prev));
          },
        },
      });

      tl.to({}, { duration: 1 });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;
    }, wrapper);

    return () => ctx.revert();
  }, [steps.length]);

  const currentStep = steps[activeIdx] || steps[0];

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div ref={pinContainerRef} className="relative w-full">
        {/* ======================================================== */}
        {/* 1. SECTION MILESTONE TABS (Click to Jump Directly)      */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-white/10 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={step.step}
                  onClick={() => scrollToStep(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1 font-mono text-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                      : "bg-white/[0.05] text-white/60 border border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                  style={{ borderRadius: "0px" }}
                >
                  <span>{step.step}</span>
                  <span className="hidden sm:inline">/ {step.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToStep(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              aria-label="Previous step"
              className="w-7 h-7 border border-white/15 bg-white/5 flex items-center justify-center text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/40 hover:text-white transition-colors"
              style={{ borderRadius: "0px" }}
            >
              <FaArrowLeft className="w-2.5 h-2.5" />
            </button>
            <button
              onClick={() => scrollToStep(Math.min(steps.length - 1, activeIdx + 1))}
              disabled={activeIdx === steps.length - 1}
              aria-label="Next step"
              className="w-7 h-7 border border-white/15 bg-white/5 flex items-center justify-center text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-white/40 hover:text-white transition-colors"
              style={{ borderRadius: "0px" }}
            >
              <FaArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. THE ROTATING ORBITAL DIAL + BALANCO BLENDED SHOWCASE */}
        {/* ======================================================== */}
        <div
          ref={stageRef}
          className="relative w-full border border-[#1a1a1a] select-none p-4 sm:p-5 lg:p-6 overflow-hidden"
          style={{
            backgroundColor: "#000000",
            backgroundImage:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, rgba(0, 0, 0, 0.99) 100%)",
            boxShadow:
              "0 35px 85px -10px rgba(0, 0, 0, 1), 0 0 1px 1px rgba(0, 0, 0, 0.9)",
            borderRadius: "0px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ==================================================== */}
            {/* LEFT: ORBITAL DOTTED ARC TIMELINE + EDITORIAL CONTENT */}
            {/* ==================================================== */}
            <div className="lg:col-span-5 flex flex-row items-center gap-4 sm:gap-6">
              {/* 1. THE CIRCULAR ARC TIMELINE (Exact WOVE Reference) */}
              <div className="relative w-[115px] sm:w-[130px] h-[320px] shrink-0 select-none overflow-visible">
                {/* SVG Elegant Circular Arc Track */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 130 320"
                  fill="none"
                >
                  {/* Subtle Circular Arc Track Line */}
                  <path
                    d="M 12 25 A 250 250 0 0 1 96 160 A 250 250 0 0 1 12 295"
                    stroke="rgba(255, 255, 255, 0.28)"
                    strokeWidth="1.2"
                    fill="none"
                  />

                  {/* Intermediate Subtle Dots on Arc Between Numbers (WOVE Reference) */}
                  {INTER_DOTS.map((dot, dIdx) => (
                    <circle
                      key={dIdx}
                      cx={dot.x}
                      cy={dot.y}
                      r="2"
                      fill="rgba(255, 255, 255, 0.35)"
                    />
                  ))}

                  {/* Milestone Node Dots on the Arc */}
                  {ARC_POINTS.map((pt, idx) => {
                    const isCurrent = idx === activeIdx;
                    return (
                      <g key={pt.step}>
                        {/* Milestone Dot on Circle Track */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isCurrent ? 4.5 : 2.5}
                          fill={isCurrent ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)"}
                          className="transition-all duration-300"
                        />

                        {/* Active Reticle Indicator Ring on Active Dot */}
                        {isCurrent && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="9"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.75)"
                            strokeWidth="1.2"
                            strokeDasharray="2 3"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Milestone Number Labels Positioned Along the Arc with Tangent Rotation */}
                {ARC_POINTS.map((pt, idx) => {
                  const isCurrent = idx === activeIdx;
                  return (
                    <div
                      key={pt.step}
                      onClick={() => scrollToStep(idx)}
                      style={{
                        position: "absolute",
                        left: `${pt.x + 16}px`,
                        top: `${pt.y}px`,
                        transform: `translateY(-50%) rotate(${pt.rot}deg)`,
                        transformOrigin: "left center",
                      }}
                      className="cursor-pointer group flex items-center"
                    >
                      <span
                        className={`font-optima block font-black leading-none transition-all duration-300 ${
                          isCurrent
                            ? "text-3xl sm:text-4xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] scale-110"
                            : "text-lg sm:text-xl text-white/30 group-hover:text-white/80"
                        }`}
                      >
                        {pt.step}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 2. EDITORIAL CONTENT FOR ACTIVE MILESTONE (Safely placed to the right) */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.step}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {/* Step Milestone Tag */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-white/80 uppercase">
                        STEP {currentStep.step}
                      </span>
                      <span className="text-white/20">/</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-white/70">
                        {currentStep.paymentTerm}
                      </span>
                    </div>

                    {/* Step Subtitle in Refined Platinum */}
                    <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#D8D8D0] uppercase tracking-wider mb-1.5">
                      {currentStep.subtitle}
                    </div>

                    {/* Step Name in Optima Font */}
                    <h3 className="font-optima font-bold text-xl sm:text-2xl tracking-tight uppercase leading-[0.98] text-[#f4f4ef] mb-2">
                      {currentStep.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[rgba(244,244,239,0.78)] leading-relaxed mb-3">
                      {currentStep.description}
                    </p>

                    {/* Milestone Details List */}
                    <div className="mb-3 space-y-1 border-t border-white/10 pt-2">
                      {currentStep.details.slice(0, 2).map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-1.5 text-xs text-[rgba(244,244,239,0.9)]"
                        >
                          <span className="text-white/80 font-mono font-bold mt-0.5">
                            ✦
                          </span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Client Guarantee Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/15 bg-white/[0.04] font-mono text-[11px] text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Guaranteed Milestone Execution</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ==================================================== */}
            {/* RIGHT: BALANCO-INSPIRED BLENDED REALISTIC SHOWCASE  */}
            {/* ==================================================== */}
            <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[420px] lg:h-[440px] border border-white/10 bg-[#060606] overflow-hidden flex flex-col justify-between p-4 sm:p-5">
              {/* 1. FRESHLY GENERATED REALISTIC IMAGE WITH SEAMLESS BLENDING */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)",
                    maskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,1) 100%)",
                  }}
                >
                  <Image
                    src={currentStep.image}
                    alt={currentStep.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center opacity-65 scale-105"
                  />
                  {/* Subtle dark ambient vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Watermark Step Number */}
              <span
                className="absolute top-1 right-3 text-[6.25rem] sm:text-[8.125rem] font-optima font-black select-none pointer-events-none text-white/[0.04] leading-none z-0"
                aria-hidden="true"
              >
                {currentStep.step}
              </span>

              {/* Top Bar of Showcase Card */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-white/90 font-bold">
                    {currentStep.subtitle}
                  </span>
                </div>
                <span className="font-mono text-xs text-white font-semibold">
                  Milestone {currentStep.step} / 05
                </span>
              </div>

              {/* 2. FLOATING 2x2 GLASS FEATURE CARDS (BALANCO.AE INSPIRED ARCHITECTURE) */}
              <div className="relative z-10 my-auto py-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {currentStep.cards.map((card, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-3.5 sm:p-4 bg-[#0a0a0a]/85 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 shadow-xl group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mb-2 group-hover:border-white/30 group-hover:bg-white/15 transition-all">
                          {renderProcessIcon(card.icon)}
                        </div>
                        <h4 className="font-heading font-bold text-xs sm:text-[0.8125rem] text-white uppercase tracking-tight mb-1 group-hover:text-white transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-[0.6875rem] text-white/70 leading-relaxed font-sans">
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3. BOTTOM TRUST VERIFICATION BADGES (WITH FONT AWESOME CHECKMARKS) */}
              <div className="relative z-10 pt-2.5 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  {currentStep.verificationPills.map((pill, pIdx) => (
                    <div
                      key={pIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.05] border border-white/15 rounded-full text-[0.6875rem] font-mono text-white/90"
                    >
                      <FaCheck className="w-2.5 h-2.5 text-white/90" />
                      <span>{pill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
