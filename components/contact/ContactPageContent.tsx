"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaCheck,
} from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/site";

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    projectType: "",
    budget: "Standard Production (Flexible)",
    message: "",
    hp: "", // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  // Pre-fill from query parameters on client mount without suspending SSR
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const pkg = searchParams.get("package");
    const service = searchParams.get("service");

    if (pkg) {
      setFormData((prev) => ({
        ...prev,
        budget: `${pkg} Tier (Inquiry)`,
        projectType: "Bespoke Web Platform",
      }));
    } else if (service) {
      setFormData((prev) => ({
        ...prev,
        projectType: service.replace(/-/g, " "),
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });
    setErrors({});

    if (!formData.projectType) {
      setErrors({ projectType: "Please select a service." });
      setSubmitting(false);
      return;
    }

    // Fallback phone number if omitted
    const submissionPayload = {
      ...formData,
      whatsappNumber: formData.whatsappNumber.trim() || "+91 (Contact Request)",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatus({
          type: "error",
          message: data.message || "Failed to submit enquiry. Please try again or reach out on WhatsApp.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Thank you! Your enquiry has been received. I will reply within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        whatsappNumber: "",
        projectType: "",
        budget: "Standard Production (Flexible)",
        message: "",
        hp: "",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error occurred. Please try again or chat directly on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#050506] text-white overflow-hidden py-16 sm:py-24 px-5 sm:px-8 lg:px-12 select-none">
      <div className="max-w-6xl mx-auto w-full">
        {/* ======================================================== */}
        {/* 1. TOP EDITORIAL HERO HEADER (Matching Reference Image 1) */}
        {/* ======================================================== */}
        <div className="w-full mb-16 sm:mb-24 pt-8">
          <div data-anim="fade-down" className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs font-mono text-white/50">
            <span>2024 — PRESENT</span>
            <span className="uppercase tracking-widest">INDEX // CONTACT &amp; ARCHIVE</span>
          </div>

          {/* Clean stacked editorial title */}
          <div
            data-anim-stagger="fade-up"
            className="flex flex-col text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight leading-[0.98] select-none"
            style={FONT}
          >
            <span className="text-white/20 hover:text-white/40 transition-colors">All projects</span>
            <span className="text-white/35 hover:text-white/60 transition-colors">Strategy</span>
            <span className="text-white">Design</span>
            <span className="text-white/40 hover:text-white/70 transition-colors">Engineering</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. MAIN CONTACT SECTION (Matching Reference Image 2)      */}
        {/* ======================================================== */}
        <div className="relative w-full pt-12 pb-20">
          {/* Giant 'Contact Us' Watermark Text in Background with Radial Lighting & Deep Shadow Blending */}
          <div
            aria-hidden="true"
            className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 w-full flex justify-center items-center pointer-events-none select-none overflow-visible z-0"
          >
            {/* Soft Radial Backlight Spotlight behind the title */}
            <div
              className="absolute w-[37.5rem] sm:w-[59.375rem] h-[21.25rem] rounded-full pointer-events-none -top-10"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 75%)",
                filter: "blur(3.125rem)",
              }}
            />

            {/* Deep Ambient Backing Shadow Blob for contrast & depth */}
            <div
              className="absolute w-[31.25rem] sm:w-[50rem] h-[13.75rem] rounded-full pointer-events-none top-8"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 80%)",
                filter: "blur(2.5rem)",
              }}
            />

            {/* Dimensional 'Contact Us' with Gradient Blend */}
            <div
              data-anim="zoom-in"
              className="relative text-6xl sm:text-8xl md:text-[10rem] lg:text-[11.8rem] font-extrabold tracking-tighter whitespace-nowrap"
              style={{
                ...FONT,
                color: "transparent",
                backgroundImage:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 45%, rgba(0, 0, 0, 0.8) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Contact Us
            </div>
          </div>

          {/* Top Form Grid (Two Columns: Left Info + Right Form Card) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
            {/* Left Column: Reach Out + Checklist + Social Pills */}
            <div data-anim="from-left" className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-2 mb-4"
                  style={FONT}
                >
                  <span>Reach out</span>
                  <span className="text-white/80 text-3xl sm:text-4xl">↗</span>
                </h2>

                <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-md font-sans">
                  Have a question or need assistance? Reach out to our dedicated support team. We&apos;re here
                  to help with any inquiries you may have.
                </p>

                {/* Checklist */}
                <div className="space-y-3.5 mb-10">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                    <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[0.5625rem] text-white">
                      <FaCheck />
                    </span>
                    <span>Personalized assistance</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                    <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[0.5625rem] text-white">
                      <FaCheck />
                    </span>
                    <span>Timely response</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                    <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[0.5625rem] text-white">
                      <FaCheck />
                    </span>
                    <span>Comprehensive support</span>
                  </div>
                </div>
              </div>

              {/* Social Icons Row (Rounded Square Buttons) */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition-all hover:scale-105"
                >
                  <FaWhatsapp className="text-sm text-[#25D366]" />
                </a>

                <a
                  href={SITE_CONFIG.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition-all hover:scale-105"
                >
                  <FaInstagram className="text-sm" />
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  aria-label="Email"
                  className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition-all hover:scale-105"
                >
                  <FaEnvelope className="text-sm" />
                </a>
              </div>
            </div>

            {/* Right Column: Dark Glass Contact Card (Matching Image 2) */}
            <div data-anim="from-right" className="lg:col-span-7 rounded-3xl border border-white/15 bg-[#0b0c10]/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="hp"
                  value={formData.hp}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name & Phone Number Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-400 mt-1 block px-2">{errors.name}</span>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      placeholder="Phone / WhatsApp Number *"
                      required
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                    {errors.whatsappNumber && (
                      <span className="text-xs text-red-400 mt-1 block px-2">
                        {errors.whatsappNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email & Services Dropdown Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-400 mt-1 block px-2">{errors.email}</span>
                    )}
                  </div>

                  {/* Services Dropdown */}
                  <div className="relative">
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      aria-label="Select Service Discipline"
                      className={`w-full px-5 py-4 rounded-2xl border border-white/10 bg-[#0d0e14] text-sm focus:outline-none focus:border-white/30 transition-all cursor-pointer appearance-none ${formData.projectType ? "text-white" : "text-white/40"
                        }`}
                    >
                      <option value="" disabled className="bg-[#0e0f14] text-white/40">
                        Select a Service *
                      </option>
                      <option value="E-commerce Websites" className="bg-[#0e0f14] text-white">
                        E-commerce Websites
                      </option>
                      <option value="Business Websites" className="bg-[#0e0f14] text-white">
                        Business Websites
                      </option>
                      <option value="Dynamic Websites" className="bg-[#0e0f14] text-white">
                        Dynamic Websites
                      </option>
                      <option value="Custom Coding & Software" className="bg-[#0e0f14] text-white">
                        Custom Coding &amp; Software
                      </option>
                      <option value="Shopify & WordPress Development" className="bg-[#0e0f14] text-white">
                        Shopify &amp; WordPress Development
                      </option>
                      <option value="Animated & 3D Websites" className="bg-[#0e0f14] text-white">
                        Animated &amp; 3D Websites
                      </option>
                      <option value="Website Redesign" className="bg-[#0e0f14] text-white">
                        Website Redesign
                      </option>
                      <option value="Product Adding / Product Upload" className="bg-[#0e0f14] text-white">
                        Product Adding / Product Upload
                      </option>
                      <option value="Website Performance Optimisation" className="bg-[#0e0f14] text-white">
                        Website Performance Optimisation
                      </option>
                      <option value="Basic SEO Included Free" className="bg-[#0e0f14] text-white">
                        Basic SEO (Included Free With Every Site)
                      </option>
                    </select>

                    {/* Custom Down Arrow Icon */}
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-xs">
                      ▼
                    </div>

                    {errors.projectType && (
                      <span className="text-xs text-red-400 mt-1 block px-2">
                        {errors.projectType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message *"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-none"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400 mt-1 block px-2">{errors.message}</span>
                  )}
                </div>

                {/* Status Messages */}
                {status.type === "error" && (
                  <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300">
                    {status.message}
                  </div>
                )}

                {status.type === "success" && (
                  <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300">
                    {status.message}
                  </div>
                )}

                {/* Solid White Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={FONT}
                  className="w-full py-4 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-center"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. THREE CARDS ROW BELOW FORM (Matching Reference Image 2) */}
          {/* ======================================================== */}
          <div data-anim-stagger="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {/* Card 1: Email us */}
            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10]/70 backdrop-blur-xl flex flex-col justify-between hover:border-white/25 transition-colors">
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/90 mb-8">
                <FaEnvelope className="text-sm" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-1">
                  Email us
                </span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm font-medium text-white hover:underline block truncate"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Card 2: Call us */}
            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10]/70 backdrop-blur-xl flex flex-col justify-between hover:border-white/25 transition-colors">
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/90 mb-8">
                <FaPhone className="text-sm" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-1">
                  Call / WhatsApp
                </span>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:underline block truncate"
                >
                  {SITE_CONFIG.whatsappNumber}
                </a>
              </div>
            </div>

            {/* Card 3: Our location */}
            <div className="p-7 rounded-3xl border border-white/10 bg-[#0b0c10]/70 backdrop-blur-xl flex flex-col justify-between hover:border-white/25 transition-colors">
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/90 mb-8">
                <FaLocationDot className="text-sm" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-1">
                  Our location
                </span>
                <span className="text-sm font-medium text-white block">
                  India &amp; UAE (Remote Studio)
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 5. ARCHITECTURAL ARCHIVE TABLE (Verified Projects)        */}
          {/* ======================================================== */}
          
        </div>
      </div>
    </div>
  );
}
