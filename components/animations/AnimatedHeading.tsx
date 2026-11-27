"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  tag?: string;
}

export default function AnimatedHeading({
  children,
  className = "",
  as: Component = "h2",
  tag,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word-inner");
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          yPercent: 105,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children]);

  const words = children.split(" ");

  return (
    <div className="flex flex-col items-start">
      {tag && (
        <span className="text-xs font-mono uppercase tracking-wider text-olive-main mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-olive-highlight" />
          {tag}
        </span>
      )}
      <Component
        ref={containerRef}
        className={`font-heading font-bold tracking-tight text-brand-text ${className}`}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
          >
            <span className="word-inner inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Component>
    </div>
  );
}
