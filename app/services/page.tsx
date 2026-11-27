import React from "react";
import PageHero from "@/components/hero/PageHero";
import ContactCta from "@/components/contact/ContactCta";
import ServiceList from "@/components/services/ServiceList";
import DisciplinesSection from "@/components/services/DisciplinesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Bespoke Engineering & Creative Design | CodeNest",
  description:
    "Custom Next.js, React, and Angular web platforms, high-conversion Shopify & WordPress e-commerce, custom full-stack coding, and tactile 3D experiences.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* 1. CINEMATIC PAGE HERO (Interactive Three.js 3D Background) */}
      <PageHero
        titlePrefix="OUR"
        titleOutline="SERVICES"
        description="End-to-end digital solutions across Next.js, React, and Angular, high-converting storefronts on Shopify and WordPress, custom full-stack architecture, and tactile 3D spatial web experiences across India and the UAE."
        animationVariant="services"
        nextBgColor="#000000"
      />

      {/* 2. 3D INTERACTIVE SERVICES DECK (Full-Width Edge-to-Edge) */}
      <section className="relative w-full overflow-hidden">
        <ServiceList />
      </section>

      {/* 3. DETAILED DISCIPLINES (Editorial Window Frame matching reference design) */}
      <DisciplinesSection />

      {/* Contact CTA */}
      <ContactCta />
    </div>
  );
}
