"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    projectType: "Custom Next.js Website",
    budget: "₹16,000 – ₹28,000 / AED 1,000 – 1,800 (Business)",
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

  // Pre-fill from query params if coming from pricing or services
  useEffect(() => {
    const pkg = searchParams.get("package");
    const service = searchParams.get("service");

    if (pkg) {
      if (pkg === "starter") {
        setFormData((prev) => ({
          ...prev,
          budget: "₹5,000 – ₹10,000 / AED 350 – 650 (Starter)",
          projectType: "Custom Next.js Website",
        }));
      } else if (pkg === "business") {
        setFormData((prev) => ({
          ...prev,
          budget: "₹16,000 – ₹28,000 / AED 1,000 – 1,800 (Business)",
          projectType: "Custom Next.js Website",
        }));
      } else if (pkg === "ecommerce") {
        setFormData((prev) => ({
          ...prev,
          budget: "₹30,000 – ₹50,000 / AED 2,000 – 3,300 (E-commerce)",
          projectType: "Headless E-commerce",
        }));
      } else if (pkg === "advanced-commerce") {
        setFormData((prev) => ({
          ...prev,
          budget: "₹50,000 – ₹90,000 / AED 3,300 – 6,000 (Advanced Commerce)",
          projectType: "Headless E-commerce",
        }));
      }
    } else if (service) {
      if (service === "nextjs-web") {
        setFormData((prev) => ({ ...prev, projectType: "Custom Next.js Website" }));
      } else if (service === "ecommerce") {
        setFormData((prev) => ({ ...prev, projectType: "Headless E-commerce" }));
      } else if (service === "ui-ux") {
        setFormData((prev) => ({ ...prev, projectType: "UI/UX & Design System" }));
      } else if (service === "brand-design") {
        setFormData((prev) => ({ ...prev, projectType: "Brand and Creative Design" }));
      } else if (service === "maintenance") {
        setFormData((prev) => ({ ...prev, projectType: "Maintenance and Support" }));
      }
    }
  }, [searchParams]);

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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatus({
          type: "error",
          message: data.message || "Failed to submit enquiry. Please try again.",
        });
      } else {
        setStatus({
          type: "success",
          message: data.message,
        });
        setFormData({
          name: "",
          email: "",
          whatsappNumber: "",
          projectType: "Custom Next.js Website",
          budget: "₹16,000 – ₹28,000 / AED 1,000 – 1,800 (Business)",
          message: "",
          hp: "",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error occurred. Please try again or reach out via WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {status.type === "success" ? (
        <div className="p-8 sm:p-10 rounded-2xl border border-olive-main/40 bg-olive-deep/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-olive-main/30 border border-olive-highlight text-olive-highlight flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h3 className="font-heading font-bold text-2xl text-brand-text">
            Enquiry Received
          </h3>
          <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
            {status.message}
          </p>
          <button
            onClick={() => setStatus({ type: "idle", message: "" })}
            className="btn-secondary text-xs py-2 px-6 mt-4"
          >
            Send Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot hidden input */}
          <input
            type="text"
            name="hp"
            value={formData.hp}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {status.type === "error" && (
            <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 text-xs font-mono text-red-300">
              {status.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2"
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Liam Sterling"
                className={`w-full px-4 py-3 rounded-xl bg-brand-surface border text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:border-olive-highlight focus:outline-none ${
                  errors.name ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.name && (
                <span className="text-[0.6875rem] font-mono text-red-400 mt-1 block">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. liam@venture.com"
                className={`w-full px-4 py-3 rounded-xl bg-brand-surface border text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:border-olive-highlight focus:outline-none ${
                  errors.email ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.email && (
                <span className="text-[0.6875rem] font-mono text-red-400 mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* WhatsApp Number */}
            <div>
              <label
                htmlFor="whatsappNumber"
                className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2"
              >
                WhatsApp / Phone *
              </label>
              <input
                id="whatsappNumber"
                type="text"
                name="whatsappNumber"
                required
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+971 50 ... / +91 98 ..."
                className={`w-full px-4 py-3 rounded-xl bg-brand-surface border text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:border-olive-highlight focus:outline-none ${
                  errors.whatsappNumber ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.whatsappNumber && (
                <span className="text-[0.6875rem] font-mono text-red-400 mt-1 block">
                  {errors.whatsappNumber}
                </span>
              )}
            </div>

            {/* Project Type */}
            <div>
              <label
                htmlFor="projectType"
                className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2"
              >
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#0B0D08] border border-white/10 text-sm text-brand-text transition-colors focus:border-olive-highlight focus:outline-none"
              >
                <option value="Custom Next.js Website">Custom Next.js Website</option>
                <option value="Headless E-commerce">Headless E-commerce</option>
                <option value="UI/UX & Design System">UI/UX &amp; Design System</option>
                <option value="Brand and Creative Design">Brand &amp; Creative Design</option>
                <option value="Maintenance and Support">Maintenance and Support</option>
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label
              htmlFor="budget"
              className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2"
            >
              Estimated Investment Scope *
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#0B0D08] border border-white/10 text-sm text-brand-text transition-colors focus:border-olive-highlight focus:outline-none"
            >
              <option value="₹5,000 – ₹10,000 / AED 350 – 650 (Starter)">
                ₹5,000 – ₹10,000 / AED 350 – 650 (Starter)
              </option>
              <option value="₹16,000 – ₹28,000 / AED 1,000 – 1,800 (Business)">
                ₹16,000 – ₹28,000 / AED 1,000 – 1,800 (Business - Most Popular)
              </option>
              <option value="₹30,000 – ₹50,000 / AED 2,000 – 3,300 (E-commerce)">
                ₹30,000 – ₹50,000 / AED 2,000 – 3,300 (E-commerce)
              </option>
              <option value="₹50,000 – ₹90,000 / AED 3,300 – 6,000 (Advanced Commerce)">
                ₹50,000 – ₹90,000 / AED 3,300 – 6,000 (Advanced Commerce)
              </option>
              <option value="Enterprise / Custom Architectural Scope">
                Custom Architectural Scope
              </option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-2"
            >
              Project Overview &amp; Goals *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your product, your target launch date, and specific functional requirements..."
              className={`w-full px-4 py-3 rounded-xl bg-brand-surface border text-sm text-brand-text placeholder-brand-muted/40 transition-colors focus:border-olive-highlight focus:outline-none resize-none ${
                errors.message ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.message && (
              <span className="text-[0.6875rem] font-mono text-red-400 mt-1 block">
                {errors.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-4 text-sm justify-center cursor-pointer disabled:opacity-50"
          >
            {submitting ? "Sending Enquiry..." : "Submit Project Enquiry ↗"}
          </button>
        </form>
      )}
    </div>
  );
}
