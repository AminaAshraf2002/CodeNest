"use client";

import React from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function DisciplinesSection() {
  return (
    <section
      id="detailed-disciplines"
      className="relative py-20 sm:py-32 px-5 sm:px-8 bg-black overflow-hidden select-none border-t border-white/10"
    >
      <div className="max-w-[71.875rem] mx-auto w-full">
        {/* Section Header */}
        <SectionHeader
          lightTitle="DETAILED"
          boldTitle="DISCIPLINES"
          subtitlePrefix="Technical specifications for every"
          badgeText="CORE"
          subtitleSuffix="service capability"
          className="mb-14 sm:mb-20"
          underlineMarginBottom="2.25rem"
        />

        {/* Editorial Folio Bar (Matching '12 services' in screenshot) */}
        <div data-anim="fade-down" className="flex items-center justify-between text-xs font-mono text-white/40 mb-3 px-2">
          <span>05 // CAPABILITIES</span>
          <span className="uppercase tracking-widest">services</span>
        </div>

        {/* Browser Mockup Window Container (Matching Reference Screenshot) */}
        <div data-anim="zoom-in" className="w-full rounded-2xl border border-white/20 bg-[#060608] overflow-hidden shadow-2xl relative">
          {/* Window Frame Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            {/* 3 Browser Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full border border-white/40 bg-transparent inline-block" />
              <span className="w-2.5 h-2.5 rounded-full border border-white/40 bg-transparent inline-block" />
              <span className="w-2.5 h-2.5 rounded-full border border-white/40 bg-transparent inline-block" />
            </div>

            <span className="font-mono text-[0.625rem] sm:text-xs uppercase tracking-wider text-white/40">
              codenest.studio // disciplines
            </span>
          </div>

          {/* Window Content Interior */}
          <div className="p-6 sm:p-12 lg:p-16">
            {/* Top Philosophy Statement Block */}
            <div data-anim="fade-up" className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16 items-start pb-10 sm:pb-14 border-b border-white/15 w-full">
              <div className="w-full md:w-36 lg:w-44 shrink-0">
                <span className="font-mono text-[0.625rem] sm:text-xs tracking-widest text-white/50 uppercase block font-semibold">
                  WHAT WE DO
                </span>
              </div>

              <div className="flex-1 min-w-0 w-full">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] text-white font-normal leading-[1.35] tracking-tight max-w-4xl"
                  style={FONT}
                >
                  We believe that we can live in a world where{" "}
                  <span
                    className="text-white/30 italic font-light inline-block"
                    style={{
                      WebkitTextStroke: "0.5px rgba(255,255,255,0.45)",
                    }}
                  >
                    every product
                  </span>{" "}
                  or service has an easy to use experience on all platforms. And our mission is to
                  make it happen.
                </h3>
              </div>
            </div>

            {/* Disciplines Rows List */}
            <div data-anim-stagger="fade-up" className="divide-y divide-white/15">
              {SERVICES.map((service) => {
                return (
                  <div
                    key={service.id}
                    id={service.slug}
                    className="group py-10 sm:py-14 transition-colors duration-300 hover:bg-white/[0.015] -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-xl"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start justify-between w-full">
                      {/* Column 1: Number (Italic, e.g. /01) */}
                      <div className="w-14 sm:w-16 shrink-0">
                        <span className="font-serif italic text-white/50 text-xl sm:text-2xl tracking-tight block">
                          /{service.number}
                        </span>
                      </div>

                      {/* Column 2: Big Discipline Title */}
                      <div className="w-full lg:w-[21.875rem] shrink-0">
                        <h4
                          className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[1.95rem] font-medium text-white tracking-tight leading-[1.2] mb-3 group-hover:text-white transition-colors"
                          style={FONT}
                        >
                          {service.title}
                        </h4>

                        {/* Tech Focus Badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {service.techStack.slice(0, 4).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[0.625rem] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Column 3: Description Paragraph + 'VIEW ———— PROJECTS' Link */}
                      <div className="flex-1 min-w-0 max-w-xl flex flex-col justify-between h-full pt-1">
                        <p className="text-xs sm:text-sm text-[#b8b8c2] leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="flex items-center gap-6 mt-auto">
                          {/* VIEW ———— PROJECTS Link matching reference screenshot */}
                          <Link
                            href="/work"
                            className="group/link inline-flex items-center gap-3 font-mono text-[0.6875rem] sm:text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                          >
                            <span>VIEW</span>
                            <span className="w-10 sm:w-14 h-[1px] bg-white/30 group-hover/link:w-18 group-hover/link:bg-white transition-all" />
                            <span>PROJECTS</span>
                          </Link>

                          {/* Direct Enquiry Link */}
                          <Link
                            href={`/contact?service=${service.id}`}
                            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] sm:text-xs tracking-wider uppercase text-white/70 hover:text-white transition-colors"
                          >
                            <span>DISCUSS</span>
                            <span className="text-white">↗</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
