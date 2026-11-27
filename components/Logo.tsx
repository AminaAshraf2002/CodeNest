import React from "react";

export default function Logo({
  height = 44,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const heightRem = height / 16;
  const widthRem = (height * (766 / 135)) / 16;
  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ width: `${widthRem}rem`, height: `${heightRem}rem` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="CodeNest"
        draggable={false}
        className="w-full h-full object-contain select-none"
      />
    </span>
  );
}
