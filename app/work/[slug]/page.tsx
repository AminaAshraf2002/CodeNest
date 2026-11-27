import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import LaptopMockup from "@/components/work/LaptopMockup";
import SectionHeader from "@/components/ui/SectionHeader";
import { barlowCondensed } from "@/lib/fonts";
import { PROJECTS } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found | CodeNest" };

  return {
    title: `${project.title} — ${project.type} | CodeNest`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = PROJECTS[currentIndex];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4ef] pt-32 pb-24 px-[5vw] relative overflow-hidden">
      {/* Blurred Olive Glow in Background */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[40.625rem] h-[22.5rem] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(163,184,52,0.15) 0%, rgba(163,184,52,0.03) 55%, transparent 75%)",
          filter: "blur(8.75rem)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[75rem] mx-auto w-full">
        {/* Back Link */}
        <div data-anim="fade-down" className="mb-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[rgba(244,244,239,0.6)] hover:text-[#c4d84a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a3b834] rounded-md px-1 py-0.5"
          >
            <span>←</span>
            <span>All projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div data-anim-stagger="fade-up" className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#a3b834] uppercase tracking-wider mb-3">
            <span>●</span>
            <span>{project.category}</span>
          </div>
          <h1
            className={`uppercase tracking-tight mb-4 ${barlowCondensed.className}`}
            style={{
              fontFamily: "var(--font-barlow-condensed), 'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2.8rem, 6.5vw, 5.2rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.01em",
              color: "#D0CED6",
            }}
          >
            {project.title}
          </h1>
          <p className="font-mono text-sm sm:text-base text-[rgba(244,244,239,0.6)]">
            {project.type} · {project.meta}
          </p>
        </div>

        {/* Large Laptop Mockup Showcase (Centered, Max-Width 760px) */}
        <div data-anim="zoom-in" className="max-w-[47.5rem] mx-auto my-10 sm:my-14">
          <LaptopMockup project={project} compact={false} priority={true} />
        </div>

        {/* Two Columns Below (No Card Backgrounds) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-12 sm:gap-16 pt-12 border-t border-white/10 items-start">
          {/* Left Column: Overview */}
          <div data-anim="from-left">
            <SectionHeader
              lightTitle="PROJECT"
              boldTitle="OVERVIEW"
              subtitlePrefix="Technical architecture & execution for"
              badgeText={project.title}
              subtitleSuffix="production build"
              align="left"
              className="mb-8"
              underlineWidth={90}
            />
            <p className="text-base sm:text-lg text-[rgba(244,244,239,0.85)] leading-relaxed whitespace-pre-line">
              {project.longDesc}
            </p>
          </div>

          {/* Right Column: Meta, Tags, Live Link */}
          <div data-anim="from-right" className="flex flex-col gap-8 md:pl-6 md:border-l md:border-white/10">
            {/* Tech Tags */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[rgba(244,244,239,0.55)] mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[rgba(244,244,239,0.8)] font-mono text-xs tracking-tight"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Location & Year */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[rgba(244,244,239,0.55)] mb-2">
                Location &amp; Timeline
              </h3>
              <p className="font-mono text-sm text-[#f4f4ef]">
                {project.meta}
              </p>
            </div>

            {/* Visit Live Site Button */}
            <div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-heading font-bold text-black text-sm shadow-[0_10px_30px_-8px_rgba(163,184,52,0.6)] hover:scale-[1.04] active:scale-[0.98] transition-transform duration-200"
                  style={{
                    background: "linear-gradient(135deg, #c4d84a 0%, #8fa326 100%)",
                  }}
                >
                  <span>Visit live site</span>
                  <span className="text-base leading-none">↗</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-mono text-xs border border-white/10 text-[rgba(244,244,239,0.35)] bg-white/[0.02] cursor-not-allowed">
                  <span>Confidential Deployment</span>
                  <span>🔒</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation: Next project & All projects */}
        <div className="mt-28 pt-16 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a3b834] rounded-lg p-1"
          >
            <span className="font-mono text-xs uppercase tracking-wider text-[#a3b834] mb-2 flex items-center gap-1.5">
              <span>Next project</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <span className="font-heading font-bold text-3xl sm:text-5xl text-[#f4f4ef] group-hover:text-[#c4d84a] transition-colors tracking-tight">
              {nextProject.title}
            </span>
          </Link>

          <Link
            href="/work"
            className="font-mono text-xs sm:text-sm text-[rgba(244,244,239,0.6)] hover:text-[#c4d84a] transition-colors shrink-0"
          >
            View all projects ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
