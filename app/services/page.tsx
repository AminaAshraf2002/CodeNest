import React from "react";
import PageHero from "@/components/hero/PageHero";
import ContactCta from "@/components/contact/ContactCta";
import ServiceList from "@/components/services/ServiceList";
import DisciplinesSection from "@/components/services/DisciplinesSection";
import FaqSection from "@/components/sections/FaqSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services | CodeNest",
  description:
    "E-commerce, Shopify, WordPress, dynamic websites & custom software for businesses in India & UAE. Basic SEO included free with every website.",
  openGraph: {
    title: "Web Design & Development Services | CodeNest",
    description: "E-commerce, Shopify, WordPress, dynamic websites & custom software. Basic SEO included free.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CodeNest Services" }],
  },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* 1. CINEMATIC PAGE HERO (Interactive Three.js 3D Background) */}
      <PageHero
        titlePrefix="OUR"
        titleOutline="SERVICES"
        description="E-commerce websites, business websites, Shopify & WordPress stores, dynamic web apps, and 3D websites for ambitious businesses across India and the UAE. Basic SEO included with every website."
        animationVariant="services"
        nextBgColor="#000000"
      />

      {/* 2. 3D INTERACTIVE SERVICES DECK */}
      <section className="relative w-full overflow-hidden">
        <ServiceList />
      </section>

      {/* 3. DETAILED DISCIPLINES (All 10 Core Services) */}
      <DisciplinesSection />

      {/* 4. Frequently Asked Questions */}
      <FaqSection />

      {/* 5. Contact CTA */}
      <ContactCta />
    </div>
  );
}
