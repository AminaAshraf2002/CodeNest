"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";
import Logo from "@/components/Logo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-white/10 bg-[#050703] text-brand-text pt-20 pb-12 relative overflow-hidden"
    >
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          data-anim-stagger="fade-up"
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10"
        >
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block focus:outline-none" aria-label="CodeNest">
              <Logo height={42} />
            </Link>

            <p className="text-lg text-brand-tagline font-normal tracking-tight mb-4 max-w-sm">
              &ldquo;{SITE_CONFIG.tagline}&rdquo;
            </p>

            <p className="text-sm text-brand-muted leading-relaxed max-w-sm mb-6">
              Independent creative technology studio serving ambitious businesses across India and the United Arab Emirates. Dedicated to modern Next.js architecture, bespoke design, and digital commerce.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available for Q1 / Q2 Projects
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-text/80 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white">
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Details */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 mb-6">
              <div>
                <span className="block text-xs text-brand-muted font-mono">Email Enquiry</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-brand-text hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div>
                <span className="block text-xs text-brand-muted font-mono">WhatsApp (Direct)</span>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-text hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{SITE_CONFIG.whatsappNumber}</span>
                  <span className="text-xs text-white">↗</span>
                </a>
              </div>

              <div>
                <span className="block text-xs text-brand-muted font-mono">Instagram (Portfolio)</span>
                <a
                  href={SITE_CONFIG.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-text hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>@{SITE_CONFIG.instagramHandle}</span>
                  <span className="text-xs text-white">↗</span>
                </a>
              </div>

              <div>
                <span className="block text-xs text-brand-muted font-mono">Regions</span>
                <span className="text-sm text-brand-text/80">
                  India (IST) &bull; UAE (Gulf Time, UTC+4)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-white/5 bg-brand-surface/70 text-xs text-brand-muted leading-relaxed">
              <strong className="text-brand-text block mb-1">Direct Client Ownership</strong>
              Clients own their domain, hosting, database, code, and payment accounts directly. Zero vendor lock-in.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          data-anim="fade-up"
          data-anim-delay="0.2"
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-muted"
        >
          <div>
            &copy; {new Date().getFullYear()} CodeNest Creative Technology. All rights reserved.
          </div>

          <div className="flex items-center gap-6">

            <button
              onClick={scrollToTop}
              className="hover:text-olive-highlight transition-colors flex items-center gap-1 cursor-pointer min-h-[44px] px-2"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
