"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQS } from "@/data/faqs";

export { FAQS };

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 lg:py-32 border-b border-white/10 relative bg-[#060608] text-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        <SectionHeader
          lightTitle="FREQUENTLY ASKED"
          boldTitle="QUESTIONS"
          subtitlePrefix="Clear answers to common questions"
          badgeText="FAQS"
          subtitleSuffix="before we start"
          className="mb-12 sm:mb-16"
        />

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5 sm:py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-medium text-base sm:text-lg text-white/90 group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <span className="font-mono text-sm text-white/70 group-hover:text-white group-hover:border-white/30 shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] transition-colors">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-4 text-xs sm:text-sm text-white/60 leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
