"use client";

import React from "react";
import Link from "next/link";
import AnimatedHeading from "@/components/animations/AnimatedHeading";

export default function HomeAboutSection() {
  const highlights = [
    {
      num: "01",
      title: "Direct Client Ownership",
      desc: "Zero proprietary lock-in. You own your repository, cloud infrastructure, database, and payment gateways with 100% full custody.",
    },
    {
      num: "02",
      title: "Fast, Clean & SEO Ready",
      desc: "Engineered with clean modern code, responsive design, and basic SEO included free with every website for search visibility.",
    },
    {
      num: "03",
      title: "Cross-Border Fluency",
      desc: "Bespoke digital architecture optimized for businesses across India and the UAE—supporting multi-currency checkouts, UPI, cards, and global CDNs.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 border-b border-white/10 relative bg-[#070905] overflow-hidden">
      {/* Subtle ambient olive glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[31.25rem] h-[31.25rem] rounded-full opacity-20 blur-[6.25rem] z-0"
        style={{
          background: "radial-gradient(circle, #7D8B5E 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <AnimatedHeading tag="About CodeNest" as="h2" className="text-3xl sm:text-5xl">
            Craftsmanship without the agency layers
          </AnimatedHeading>
          <Link
            href="/about"
            className="text-xs sm:text-sm font-mono text-olive-highlight hover:underline inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Read full story</span>
            <span>↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brand Story & Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-lg text-brand-text font-normal leading-relaxed">
              CodeNest is an independent creative technology studio. We work directly with ambitious businesses, founders, and brand directors to turn ideas into digital experiences.
            </p>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Too often, modern web development gets trapped in excessive management overhead, generic templates, and brittle dependencies. We eliminate that friction. When you work with CodeNest, you collaborate directly with our team engineering your platform from typography to deployment.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-olive-main/30 bg-olive-deep/20 text-xs font-mono text-olive-highlight">
                <span className="w-1.5 h-1.5 rounded-full bg-olive-highlight animate-pulse" />
                Creative Technology Studio &bull; India &amp; UAE Focus
              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Distinctions */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-2xl border border-white/10 bg-[#0B0D08] hover:border-olive-main/40 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <span className="font-mono text-xs text-olive-highlight block mb-3 font-semibold">
                    {item.num}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-brand-text mb-2 group-hover:text-olive-highlight transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
