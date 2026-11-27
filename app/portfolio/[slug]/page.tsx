import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio";
import ContactCta from "@/components/contact/ContactCta";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — ${project.category} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PORTFOLIO_PROJECTS[projectIndex];
  const nextProject =
    PORTFOLIO_PROJECTS[(projectIndex + 1) % PORTFOLIO_PROJECTS.length];
  const prevProject =
    PORTFOLIO_PROJECTS[
      (projectIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length
    ];

  return (
    <div className="flex flex-col w-full">
      {/* Project Header */}
      <section className="pt-20 pb-16 sm:pb-24 border-b border-white/10 bg-black relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Breadcrumb / Back Link */}
          <Link
            data-anim="fade-down"
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-olive-highlight transition-colors mb-8"
          >
            <span>←</span>
            <span>BACK TO ARCHIVE</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div data-anim="from-left" className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-olive-highlight mb-4">
                <span className="px-2.5 py-1 rounded-full border border-olive-main/30 bg-olive-deep/20">
                  {project.category}
                </span>
                <span className="text-brand-muted">&bull;</span>
                <span className="text-brand-muted">{project.location}</span>
                <span className="text-brand-muted">&bull;</span>
                <span className="text-brand-muted">{project.year}</span>
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-6xl md:text-7xl text-brand-text mb-6">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-brand-tagline font-normal leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
            </div>

            {/* Quick Meta Card */}
            <div data-anim="from-right" className="lg:col-span-4 p-6 rounded-2xl border border-white/10 bg-brand-surface space-y-4">
              <div>
                <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-brand-muted block">
                  Client Organization
                </span>
                <span className="font-heading font-semibold text-base text-brand-text">
                  {project.client}
                </span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-brand-muted block">
                  Platform Architecture
                </span>
                <span className="text-xs text-brand-text/90 font-mono">
                  {project.stack.slice(0, 3).join(" • ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="py-10 border-b border-white/10 bg-[#070905]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div data-anim-stagger="fade-up" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-white/5 bg-brand-surface flex flex-col"
              >
                <span className="text-xs font-mono text-brand-muted mb-1">
                  {metric.label}
                </span>
                <span className="font-heading font-bold text-3xl sm:text-4xl text-olive-highlight">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Deep Dive: Challenge & Solution */}
      <section className="py-20 sm:py-28 border-b border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* The Challenge */}
            <div data-anim="from-left" className="lg:col-span-6 flex flex-col">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                The Challenge
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-brand-text mb-4">
                Overcoming structural friction
              </h2>
              <p className="text-base text-brand-muted leading-relaxed mb-6">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div data-anim="from-right" className="lg:col-span-6 flex flex-col">
              <span className="text-xs font-mono uppercase tracking-widest text-olive-highlight mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-olive-highlight" />
                The Solution
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-brand-text mb-4">
                Architecture &amp; execution
              </h2>
              <p className="text-base text-brand-muted leading-relaxed mb-6">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 pt-16 border-t border-white/10">
            {/* Features */}
            <div className="lg:col-span-7 p-7 rounded-2xl border border-white/10 bg-brand-surface">
              <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-6">
                Key Features Delivered
              </h3>
              <ul className="space-y-3.5">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-brand-text/90">
                    <span className="text-olive-highlight font-mono mt-0.5">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="lg:col-span-5 p-7 rounded-2xl border border-white/10 bg-brand-surface flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-6">
                  Complete Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-brand-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  href={`/contact?project=${project.slug}`}
                  className="btn-primary w-full text-xs py-3 text-center justify-center"
                >
                  Request Similar Architecture ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next Project Navigation */}
      <section className="py-12 border-b border-white/10 bg-[#050704]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="flex flex-col group text-left"
            >
              <span className="text-[0.6875rem] font-mono text-brand-muted mb-1 group-hover:text-olive-highlight transition-colors">
                ← PREVIOUS PROJECT
              </span>
              <span className="font-heading font-bold text-lg text-brand-text group-hover:text-olive-highlight transition-colors">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="flex flex-col group text-right ml-auto"
            >
              <span className="text-[0.6875rem] font-mono text-brand-muted mb-1 group-hover:text-olive-highlight transition-colors">
                NEXT PROJECT →
              </span>
              <span className="font-heading font-bold text-lg text-brand-text group-hover:text-olive-highlight transition-colors">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCta />
    </div>
  );
}
