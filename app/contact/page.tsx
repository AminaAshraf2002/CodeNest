import React from "react";
import ContactPageContent from "@/components/contact/ContactPageContent";
import FaqSection from "@/components/sections/FaqSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Website Quote | CodeNest",
  description:
    "Get in touch with CodeNest for a free consultation and fixed quote. Reach us on WhatsApp at +971 52 295 3757 or email codenest.creative@gmail.com.",
  openGraph: {
    title: "Contact Us — Get a Free Website Quote | CodeNest",
    description: "Get in touch for a free consultation and fixed quote for your business website.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact CodeNest" }],
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-[#050506]">
      <ContactPageContent />
      <FaqSection />
    </div>
  );
}
