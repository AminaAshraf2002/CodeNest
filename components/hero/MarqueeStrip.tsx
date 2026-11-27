"use client";

import React from "react";

export default function MarqueeStrip() {
  const items = [
    { text: "ONLINE STORES", outline: false },
    { text: "BUSINESS WEBSITES", outline: true },
    { text: "DYNAMIC WEBSITES", outline: false },
    { text: "CUSTOM WEB APPS", outline: true },
    { text: "SHOPIFY & WORDPRESS", outline: false },
    { text: "3D WEBSITES", outline: true },
    { text: "WEBSITE REDESIGN", outline: false },
    { text: "ADD YOUR PRODUCTS", outline: true },
    { text: "FASTER WEBSITES", outline: false },
    { text: "FREE BASIC SEO", outline: true },
  ];

  // Repeat 4 times to ensure seamless infinite looping across all screens up to 4K
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      data-anim="fade"
      className="relative z-20 w-full border-t border-b border-white/15 py-5 sm:py-6 overflow-hidden bg-[#070905] select-none"
    >
      <div className="animate-marquee flex items-center gap-8 sm:gap-14 whitespace-nowrap will-change-transform">
        {repeatedItems.map((item, i) => (
          <div key={`m-${i}`} className="flex items-center gap-8 sm:gap-14 shrink-0">
            <span
              className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase transition-colors ${
                item.outline
                  ? "text-stroke hover:text-[#C5D45A]"
                  : "text-[#F2F3EE] hover:text-white"
              }`}
            >
              {item.text}
            </span>
            <span className="text-[#94AB32] text-xl sm:text-2xl font-mono font-bold select-none opacity-80">
              /
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
