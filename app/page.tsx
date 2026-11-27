import React from "react";
import Hero from "@/components/hero/Hero";
import NooziStatement from "@/components/sections/NooziStatement";
import MarqueeStrip from "@/components/hero/MarqueeStrip";
import ServiceList from "@/components/services/ServiceList";
import WorkSection from "@/components/work/WorkSection";
import HowWeWork from "@/components/process/HowWeWork";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeNest — Creative Technology Studio | India & UAE",
  description:
    "Creative technology studio building custom Next.js websites, Shopify & WordPress e-commerce, and 3D web experiences in India and the UAE. Basic SEO included.",
  openGraph: {
    title: "CodeNest — Creative Technology Studio",
    description: "Ideas into digital experiences. Serving businesses in India and the UAE.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CodeNest Creative Technology" }],
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

      {/* 4. Services Section */}
      <section id="services" className="relative z-30 w-full overflow-hidden">
        <ServiceList />
      </section>

      {/* 5. Selected Work Section */}
      <WorkSection />

      {/* 6. How We Work (5 Transparent Steps) */}
      <HowWeWork />
    </div>
  );
}
