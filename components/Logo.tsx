import React from "react";

export default function Logo({
  height,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    <>
      {/* Mobile & Tablet Logo (< 1024px): Compact, razor-sharp, never overflows */}
      <div className="flex lg:hidden items-center gap-2 max-w-[60vw] max-w-[13rem] h-[2.5rem] select-none shrink-0">
        <img
          src="/cn-mark.png"
          alt="CN"
          className="w-[2rem] h-auto object-contain shrink-0"
        />
        <div className="flex flex-col justify-center leading-none">
          <div className="font-heading font-bold text-[1.15rem] sm:text-[1.25rem] leading-none tracking-tight">
            <span className="text-white">Code</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#C5D45A] via-[#94AB32] to-[#789024]">
              Nest
            </span>
          </div>
          <span className="hidden min-[380px]:block text-[0.4rem] font-semibold tracking-[0.22em] text-[#C0C0C0] uppercase mt-1 leading-none font-sans">
            CREATIVE TECHNOLOGY DEVELOPER
          </span>
        </div>
      </div>

      {/* Desktop Logo (>= 1024px): 100% Untouched original branding */}
      <span
        className={`hidden lg:inline-block overflow-hidden xl:scale-105 origin-left ${className}`}
        style={{
          width: height ? `${(height * (766 / 135)) / 16}rem` : "15.584rem",
          height: height ? `${height / 16}rem` : "2.75rem",
          aspectRatio: "766 / 135",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="CodeNest"
          draggable={false}
          className="w-full h-full object-contain select-none"
        />
      </span>
    </>
  );
}
