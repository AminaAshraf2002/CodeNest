import React from "react";
import Hero from "@/components/hero/Hero";
import NooziStatement from "@/components/sections/NooziStatement";
import MarqueeStrip from "@/components/hero/MarqueeStrip";
import ServiceList from "@/components/services/ServiceList";
import WorkSection from "@/components/work/WorkSection";
import HowWeWork from "@/components/process/HowWeWork";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeNest — Creative Technology Developer | India & UAE",
  description:
    "Independent creative technology developer serving India and the UAE. Bespoke Next.js websites, high-conversion headless e-commerce, and tactile 3D experiences.",
  openGraph: {
    title: "CodeNest — Creative Technology Developer",
    description: "Ideas into digital experiences. Serving India & the UAE.",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Scroll-Driven Video Hero Section */}
      <Hero />

      {/* 2. Noozi-Style Scroll Statement Section */}
      <NooziStatement />

      {/* 3. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. Services Section - Full Screen Blueprint Poster Replica */}
      <section id="services" className="relative z-30 w-full overflow-hidden">
        <ServiceList />
      </section>

      {/* 4. Selected Work Section (After Services with Laptop Mockup) */}
      <WorkSection />

      {/* 5. How We Work */}
      <HowWeWork />
    </div>
  );
}
