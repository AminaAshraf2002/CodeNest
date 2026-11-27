"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fromVars = (type: string, d: number): gsap.TweenVars => {
  switch (type) {
    case "fade-down":
      return { y: -d };
    case "from-left":
      return { x: -d };
    case "from-right":
      return { x: d };
    case "zoom-in":
      return { scale: 0.92 };
    case "img-reveal":
      return { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 };
    case "fade":
      return {};
    default:
      return { y: d }; // fade-up
  }
};

const toVars = (type: string): gsap.TweenVars =>
  type === "img-reveal"
    ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1 };

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dist = window.matchMedia("(max-width: 767px)").matches ? 30 : 60;
    let ctx: gsap.Context | undefined;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const raf = requestAnimationFrame(() => {
      timer = setTimeout(() => {
        ctx = gsap.context(() => {
          const singles = gsap.utils.toArray<HTMLElement>("[data-anim]");
          const groups = gsap.utils.toArray<HTMLElement>("[data-anim-stagger]");

          if (reduce) {
            gsap.set(
              [...singles, ...groups.flatMap((g) => Array.from(g.children))],
              { opacity: 1 }
            );
            return;
          }

          groups.forEach((g) => {
            const type = g.dataset.animStagger || "fade-up";
            gsap.fromTo(
              Array.from(g.children),
              { opacity: 0, ...fromVars(type, dist) },
              {
                ...toVars(type),
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12,
                scrollTrigger: {
                  trigger: g,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          });

          singles.forEach((el) => {
            const type = el.dataset.anim || "fade-up";
            gsap.fromTo(
              el,
              { opacity: 0, ...fromVars(type, dist) },
              {
                ...toVars(type),
                duration: parseFloat(el.dataset.animDuration || "0.9"),
                delay: parseFloat(el.dataset.animDelay || "0"),
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });
        });

        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 600);
      }, 0);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
