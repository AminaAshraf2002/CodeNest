"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PRICING_PACKAGES, PRICING_NOTE } from "@/data/pricing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PricingSection({ previewOnly = false }: { previewOnly?: boolean }) {
  const [currency, setCurrency] = useState<"INR" | "AED">("INR");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".pricing-card");
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const displayPackages = previewOnly
    ? PRICING_PACKAGES.slice(0, 3)
    : PRICING_PACKAGES;

  return (
    <div ref={containerRef} className="w-full">
      {/* Currency Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-brand-muted block mb-1">
            Tailored Scope
          </span>
          <p className="text-sm text-brand-text">
            Transparent fixed quotes tailored for businesses in India, the UAE and worldwide.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-full border border-white/15 bg-brand-surface">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              currency === "INR"
                ? "bg-olive-main text-black shadow-md shadow-olive-main/20"
                : "text-brand-muted hover:text-brand-text"
            }`}
            aria-pressed={currency === "INR"}
          >
            INR (₹) &bull; India
          </button>
          <button
            onClick={() => setCurrency("AED")}
            className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              currency === "AED"
                ? "bg-olive-main text-black shadow-md shadow-olive-main/20"
                : "text-brand-muted hover:text-brand-text"
            }`}
            aria-pressed={currency === "AED"}
          >
            AED (د.إ) &bull; UAE
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          previewOnly ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } gap-6 items-stretch`}
      >
        {displayPackages.map((pkg) => {
          const isPopular = pkg.popular;
          const currentPrice = pkg.quoteLabel;

          const cardContent = (
            <div className="flex flex-col justify-between h-full p-6 sm:p-7 relative z-10 bg-[#0B0D08] rounded-2xl">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-xl text-brand-text">
                    {pkg.name}
                  </h3>
                  {isPopular && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-olive-highlight/15 text-olive-highlight border border-olive-main/40">
                      Most Popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-brand-muted mb-6 min-h-[32px] leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="text-xs font-mono text-brand-muted block mb-1">
                    Pricing
                  </span>
                  <div className="font-heading font-bold text-2xl sm:text-3xl tracking-tight text-brand-text">
                    {currentPrice}
                  </div>
                  <span className="text-[11px] font-mono text-olive-highlight mt-1.5 block">
                    Turnaround: {pkg.turnaround}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2 text-xs text-brand-text/90">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-olive-highlight font-mono mt-0.5">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  href={`/contact?package=${pkg.id}&currency=${currency}`}
                  className={`w-full text-center text-xs justify-center ${
                    isPopular ? "btn-primary py-3" : "btn-secondary py-3"
                  }`}
                >
                  Get a free quote ↗
                </Link>
              </div>
            </div>
          );

          if (isPopular) {
            return (
              <div key={pkg.id} className="pricing-card h-full">
                <div className="rotating-border-card h-full">
                  <div className="rotating-border-card-inner">
                    {cardContent}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={pkg.id}
              className="pricing-card rounded-2xl border border-white/10 bg-[#0B0D08] h-full flex flex-col hover:border-olive-main/30 transition-colors"
            >
              {cardContent}
            </div>
          );
        })}
      </div>

      {/* Note under pricing */}
      <div className="mt-8 p-4 rounded-xl border border-white/10 bg-[#0B0D08]/60 flex items-start sm:items-center justify-between flex-wrap gap-4">
        <p className="text-xs font-mono text-brand-muted leading-relaxed">
          <span className="text-olive-highlight mr-2 font-semibold">[ NOTE ]</span>
          {PRICING_NOTE}
        </p>

        {previewOnly && (
          <Link
            href="/pricing"
            className="text-xs font-mono text-olive-highlight hover:underline inline-flex items-center gap-1"
          >
            <span>View all packages and deliverables</span>
            <span>↗</span>
          </Link>
        )}
      </div>
    </div>
  );
}
