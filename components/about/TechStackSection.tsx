"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  SiNextdotjs,
  SiPostgresql,
  SiCloudinary,
  SiVercel,
  SiRazorpay,
  SiTailwindcss,
} from "react-icons/si";

type IconType = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

interface TechItem {
  id: string;
  name: string;
  role: string;
  desc: string;
  Icon: IconType;
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "nextjs",
    name: "Next.js",
    role: "Modern Full-Stack Framework",
    desc: "App Router, React Server Components, and Edge rendering for instantaneous responsiveness.",
    Icon: SiNextdotjs,
  },
  {
    id: "postgres",
    name: "PostgreSQL + Neon",
    role: "Serverless Cloud Database",
    desc: "Autoscaling, branching serverless Postgres architecture with sub-millisecond query execution.",
    Icon: SiPostgresql,
  },
  {
    id: "cloudinary",
    name: "Cloudinary",
    role: "High-Performance Media CDN",
    desc: "Automated media transcoding, adaptive formatting (AVIF/WebP), and ultra-fast visual delivery.",
    Icon: SiCloudinary,
  },
  {
    id: "vercel",
    name: "Vercel",
    role: "Edge Infrastructure",
    desc: "Global Edge Network deployment ensuring minimal latency across Indian and UAE visitors.",
    Icon: SiVercel,
  },
  {
    id: "payments",
    name: "Razorpay & Gateways",
    role: "Secure Transactions",
    desc: "Seamless payment integration supporting UPI, credit cards, and multi-currency UAE payment rails.",
    Icon: SiRazorpay,
  },
  {
    id: "motion",
    name: "Tailwind & Motion",
    role: "Design Systems & Physics",
    desc: "Sub-millisecond CSS architecture, fluid GPU-accelerated motion choreography, and tactile interaction.",
    Icon: SiTailwindcss,
  },
];

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 3D tilt on mouse hover (matching ServiceList glass physics)
  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    gsap.to(el, {
      rotateY: (x / r.width - 0.5) * 10,
      rotateX: -(y / r.height - 0.5) * 10,
      y: -5,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden select-none bg-[#050506]"
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap");
      `}</style>

      {/* BACKGROUND: Deep Black + Faint Contour Wave Lines (Replicating ServiceList) */}
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
            <path
              d="M-100 140 C 300 70, 600 230, 1100 110 C 1300 60, 1500 170, 1600 190"
              stroke="#E3D9D1"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.35"
            />
            <path
              d="M-100 270 C 250 190, 700 370, 1050 230 C 1300 150, 1520 290, 1600 310"
              stroke="#E3D9D1"
              strokeWidth="1"
              opacity="0.40"
            />
            <path
              d="M-100 420 C 350 360, 650 520, 1000 390 C 1280 300, 1480 440, 1600 460"
              stroke="#E3D9D1"
              strokeWidth="1.2"
              opacity="0.30"
            />
            <path
              d="M-100 590 C 220 510, 750 690, 1150 520 C 1350 430, 1500 590, 1600 610"
              stroke="#E3D9D1"
              strokeWidth="1"
              strokeDasharray="6 8"
              opacity="0.35"
            />
            <path
              d="M-100 740 C 300 680, 680 840, 1080 690 C 1320 600, 1490 750, 1600 780"
              stroke="#E3D9D1"
              strokeWidth="1"
              opacity="0.40"
            />
            <path
              d="M-100 870 C 400 810, 800 940, 1200 820 C 1400 760, 1550 880, 1600 910"
              stroke="#E3D9D1"
              strokeWidth="1.2"
              opacity="0.25"
            />
          </svg>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <SectionHeader
          lightTitle="CURATED"
          boldTitle="TECH STACK"
          subtitlePrefix="Modern infrastructure chosen for"
          badgeText="SUB-SECOND"
          subtitleSuffix="speed & reliability"
          className="mb-14 sm:mb-20"
          underlineMarginBottom="3rem"
        />

        {/* 6 Glass Cards Grid in ServiceList Style */}
        <div data-anim-stagger="fade-up" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_ITEMS.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const dir = isLeft ? "to bottom right" : "to top left";
            // Deep subtle obsidian glass: diminished white fog for sleek dark aesthetics
            const fillGradient = `linear-gradient(${dir}, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.012) 50%, rgba(0,0,0,0.3) 88%)`;
            const borderMask = `linear-gradient(${dir}, #000 0%, #000 50%, transparent 82%)`;
            // Whisper-soft sheen without milky glare
            const sheen =
              "linear-gradient(115deg, rgba(255,255,255,0) 25%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0) 62%)";
            const ItemIcon = item.Icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-xl overflow-hidden cursor-pointer"
                style={{
                  ...FONT,
                  minHeight: "11.25rem",
                  willChange: "transform",
                  backgroundColor: "rgba(10, 10, 13, 0.78)",
                  background: fillGradient,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  transformStyle: "preserve-3d",
                  boxShadow: "0 1.25rem 2.5rem -0.9375rem rgba(0,0,0,0.85)",
                }}
              >
                {/* Diagonal glass sheen */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: sheen,
                    pointerEvents: "none",
                  }}
                />

                {/* Thin masked border where one corner fades out */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "0.75rem",
                    padding: 1,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0) 100%)",
                    mask: borderMask,
                    WebkitMask: borderMask,
                    maskComposite: "exclude",
                    WebkitMaskComposite: "destination-out",
                    pointerEvents: "none",
                  }}
                />

                {/* BIG TRANSPARENT WATERMARK ICON INSIDE CARD */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "0.875rem",
                    bottom: "0.625rem",
                    pointerEvents: "none",
                    opacity: 0.07,
                    fontSize: "5.5rem",
                    color: "#D4D2DE",
                    transition: "opacity 0.3s ease, transform 0.4s ease",
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="group-hover:opacity-18 group-hover:scale-105"
                >
                  <ItemIcon />
                </div>

                {/* Card Content Foreground */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row: Name + Star Accent */}
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#F5F3FA] transition-colors"
                        style={FONT}
                      >
                        {item.name}
                      </h3>
                      <span className="text-olive-highlight font-mono text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        ✦
                      </span>
                    </div>

                    {/* Role Tag */}
                    <span
                      className="text-[0.6875rem] font-mono uppercase tracking-wider text-white block mb-3 font-medium"
                    >
                      {item.role}
                    </span>

                    {/* Description */}
                    <p className="text-xs sm:text-[0.8125rem] text-[#b8b8c2] leading-relaxed max-w-[85%] group-hover:text-white/90 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
