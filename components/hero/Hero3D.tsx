"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the 3D canvas with ssr: false
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
  loading: () => <Hero3DFallback />,
});

function Hero3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      <div className="absolute w-56 h-56 rounded-full bg-olive-main/15 blur-3xl pointer-events-none" />
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 p-4 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="CodeNest 3D Monogram"
          width={280}
          height={280}
          className="object-contain drop-shadow-[0_15px_30px_rgba(148,171,50,0.25)] transition-transform duration-700 hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [useFallback, setUseFallback] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect prefers-reduced-motion or very narrow screens
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmallScreen = window.innerWidth < 640;

    if (prefersReducedMotion || isSmallScreen) {
      setUseFallback(true);
    }
  }, []);

  if (!mounted) {
    return <Hero3DFallback />;
  }

  if (useFallback) {
    return <Hero3DFallback />;
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
      <Hero3DCanvas />
    </div>
  );
}
