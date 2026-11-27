import React from "react";
import ContactPageContent from "@/components/contact/ContactPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Start Your Project | India & UAE | CodeNest",
  description:
    "Direct project enquiry with CodeNest. Discuss custom Next.js websites, headless e-commerce, and creative engineering for India and the UAE.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-[#050506]">
      <ContactPageContent />
    </div>
  );
}
