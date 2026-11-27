"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Project } from "@/data/portfolio";

export default function PortfolioCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease",
      }}
      className="group relative rounded-2xl border border-white/10 bg-[#0B0D08] overflow-hidden will-change-transform flex flex-col justify-between"
    >
      {/* Cursor-following olive green glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 212, 90, 0.16), transparent 70%)`,
        }}
      />

      {/* Mini website mockup preview */}
      <div className="p-6 pb-0">
        <div className="rounded-xl border border-white/10 bg-[#050704] overflow-hidden shadow-2xl">
          {/* Browser header */}
          <div className="px-3 py-2 bg-black/60 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <div className="px-3 py-0.5 rounded-full bg-white/5 text-[0.625rem] font-mono text-brand-muted truncate max-w-[11.25rem]">
              https://{project.slug}.codenest.dev
            </div>
            <div className="w-6" />
          </div>

          {/* Mockup screen canvas */}
          <div className="h-56 sm:h-64 relative bg-gradient-to-b from-[#0F130B] to-[#070905] p-5 flex flex-col justify-between overflow-hidden">
            {/* Visual accent backdrop based on project */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-olive-main/10 blur-2xl pointer-events-none" />

            {project.slug === "aurum-atelier" && (
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[0.625rem] font-mono uppercase tracking-widest text-olive-highlight">
                      SPRING / SUMMER 2025
                    </span>
                    <h4 className="font-heading font-bold text-xl text-brand-text">
                      L&apos;Hiver Doré
                    </h4>
                  </div>
                  <div className="px-2 py-1 rounded border border-olive-main/30 bg-black/40 text-[0.625rem] font-mono text-olive-highlight">
                    AED 4,850
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="h-20 rounded bg-white/5 border border-white/10 p-2 flex flex-col justify-end">
                    <span className="text-[0.5625rem] font-mono text-brand-muted">SILK COAT</span>
                  </div>
                  <div className="h-20 rounded bg-olive-deep/20 border border-olive-main/30 p-2 flex flex-col justify-end">
                    <span className="text-[0.5625rem] font-mono text-olive-highlight">TAILORED</span>
                  </div>
                  <div className="h-20 rounded bg-white/5 border border-white/10 p-2 flex flex-col justify-end">
                    <span className="text-[0.5625rem] font-mono text-brand-muted">ACCESSORIES</span>
                  </div>
                </div>
              </div>
            )}

            {project.slug === "lumina-audio" && (
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[0.625rem] font-mono uppercase tracking-widest text-olive-highlight">
                      ACOUSTIC SERIES 01
                    </span>
                    <h4 className="font-heading font-bold text-xl text-brand-text">
                      Lumina Apex Monitor
                    </h4>
                  </div>
                  <div className="px-2 py-1 rounded border border-olive-main/30 bg-black/40 text-[0.625rem] font-mono text-olive-highlight">
                    ₹68,000
                  </div>
                </div>

                {/* Sound wave visualizer bars */}
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {[40, 65, 30, 85, 95, 55, 75, 45, 90, 60, 35, 70, 80, 50].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-olive-deep to-olive-highlight rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {project.slug === "elysian-estates" && (
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[0.625rem] font-mono uppercase tracking-widest text-olive-highlight">
                      PALM JUMEIRAH &bull; DUBAI
                    </span>
                    <h4 className="font-heading font-bold text-xl text-brand-text">
                      Villa Azure Monolith
                    </h4>
                  </div>
                  <div className="px-2 py-1 rounded border border-olive-main/30 bg-black/40 text-[0.625rem] font-mono text-olive-highlight">
                    AED 42,000,000
                  </div>
                </div>

                <div className="p-3 rounded bg-black/60 border border-white/10 flex items-center justify-between text-[0.625rem] font-mono">
                  <span className="text-brand-muted">6 BED &bull; 8 BATH</span>
                  <span className="text-brand-muted">14,200 SQ FT</span>
                  <span className="text-olive-highlight font-semibold">VIEWING ONLY</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project information */}
      <div className="p-6 relative z-10 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted mb-1.5">
            <span>{project.category}</span>
            <span>{project.location} &bull; {project.year}</span>
          </div>
          <h3 className="font-heading font-bold text-2xl text-brand-text group-hover:text-olive-highlight transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <span className="text-base text-brand-muted group-hover:text-olive-highlight group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
              ↗
            </span>
          </h3>
          <p className="text-sm text-brand-muted mt-2 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-brand-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/portfolio/${project.slug}`}
          className="btn-secondary w-full text-center text-xs justify-center py-2.5 mt-1"
        >
          Explore Case Study ↗
        </Link>
      </div>
    </div>
  );
}
