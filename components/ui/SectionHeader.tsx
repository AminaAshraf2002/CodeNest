import React from "react";

interface SectionHeaderProps {
  lightTitle: string; // e.g. "OUR", "SELECTED", "HOW WE", "GET IN"
  boldTitle: string; // e.g. "SERVICES", "WORK", "WORK", "TOUCH"
  subtitlePrefix?: string; // e.g. "That can take your"
  badgeText?: string; // e.g. "BRAND", "PROJECTS", "PROCESS"
  subtitleSuffix?: string; // e.g. "to the next level"
  className?: string;
  underlineWidth?: number | string;
  underlineMarginBottom?: number | string;
  align?: "center" | "left";
}

export default function SectionHeader({
  lightTitle,
  boldTitle,
  subtitlePrefix,
  badgeText,
  subtitleSuffix,
  className = "mb-10 sm:mb-14",
  underlineWidth = 110,
  underlineMarginBottom,
  align = "center",
}: SectionHeaderProps) {
  const isLeft = align === "left";
  const bottomMargin =
    underlineMarginBottom !== undefined
      ? typeof underlineMarginBottom === "number"
        ? `${underlineMarginBottom / 16}rem`
        : underlineMarginBottom
      : "0";
  const dividerWidth =
    typeof underlineWidth === "number"
      ? `${underlineWidth / 16}rem`
      : underlineWidth;

  return (
    <div
      data-anim="fade-up"
      className={`${isLeft ? "text-left" : "text-center"} ${className}`}
    >
      <h2
        className={`text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white flex ${
          isLeft ? "justify-start" : "justify-center"
        } items-baseline gap-[0.3em] mb-3`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <span style={{ fontWeight: 200 }}>{lightTitle}</span>
        <span style={{ fontWeight: 700 }}>{boldTitle}</span>
      </h2>

      {(subtitlePrefix || badgeText || subtitleSuffix) && (
        <div
          className={`text-sm sm:text-base flex items-center ${
            isLeft ? "justify-start" : "justify-center"
          } gap-2 text-[#b8b8c2]`}
          style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
        >
          {subtitlePrefix && <span>{subtitlePrefix}</span>}
          {badgeText && (
            <span
              style={{
                padding: "0.125rem 0.5rem",
                borderRadius: "0.25rem",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "0.85em",
                letterSpacing: "0.05em",
              }}
            >
              {badgeText}
            </span>
          )}
          {subtitleSuffix && <span>{subtitleSuffix}</span>}
        </div>
      )}

      {/* Underline / Divider */}
      <div
        style={{
          width: dividerWidth,
          height: 1,
          margin: isLeft ? `1.375rem 0 ${bottomMargin} 0` : `1.375rem auto ${bottomMargin}`,
          background: "rgba(255, 255, 255, 0.3)",
          transformOrigin: isLeft ? "left" : "center",
        }}
      />
    </div>
  );
}
