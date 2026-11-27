import React from "react";
import PageHero from "@/components/hero/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import OperatingPrinciples from "@/components/about/OperatingPrinciples";
import TechStackSection from "@/components/about/TechStackSection";
import ContactCta from "@/components/contact/ContactCta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Creative Technology Studio | CodeNest",
  description:
    "CodeNest is an independent creative technology studio serving businesses in India and the UAE. Learn about our story, process, and client-first values.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* 1. CINEMATIC PAGE HERO (Interactive Three.js 3D Background) */}
      <PageHero
        titlePrefix="ABOUT"
        titleOutline="US"
        description="Independent creative technology studio serving forward-thinking businesses and brands across India and the United Arab Emirates. Direct craftsmanship, fast performance, and zero vendor lock-in."
        animationVariant="about"
        nextBgColor="#070905"
      />

      {/* 2. Story & Approach (Seamlessly melted from Hero without harsh top border) */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-[#070905]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div data-anim="from-left" className="lg:col-span-5">
              <SectionHeader
                lightTitle="THE"
                boldTitle="PHILOSOPHY"
                subtitlePrefix="Direct craftsmanship"
                badgeText="WITHOUT"
                subtitleSuffix="the layers"
                align="left"
                className="mb-6"
                underlineWidth={90}
              />
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-white/90">
                Creative Technology Studio &bull; Serving India &amp; UAE
              </div>
            </div>

            <div data-anim="from-right" data-anim-delay="0.15" className="lg:col-span-7 space-y-6 text-base text-brand-muted leading-relaxed">
              <p>
                CodeNest is an independent creative technology studio. We work directly with business owners, founders, brand directors, and innovators who value precision, reliable performance, and design distinction.
              </p>
              <p>
                Too often, web development gets bogged down in excessive management layers, generic templates, and fragile codebases that deteriorate after launch. We eliminate that friction. When you work with CodeNest, you collaborate directly with our core engineering team building your platform.
              </p>
              <p>
                From initial typography selection and responsive mobile architecture to secure payment integrations and SEO, every element is designed, developed, and created with meticulous attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Operating Principles - How We Work Style */}
      <OperatingPrinciples />

      {/* Tech Stack Deep-Dive - ServiceList Style with Watermark Icons */}
      <TechStackSection />

      {/* Contact CTA */}
      <ContactCta />
    </div>
  );
}
