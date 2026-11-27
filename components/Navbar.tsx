"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/data/site";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 lg:h-auto flex items-center transition-all duration-300 ${isOpen
        ? "bg-[#070905] border-b border-white/10 shadow-2xl"
        : scrolled
        ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] lg:py-3"
        : "bg-transparent lg:py-5"
        }`}
    >
      <div
        data-anim="fade-down"
        className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex items-center justify-between gap-4"
      >
        {/* Brand Graphic Logo (Single unified logo component) */}
        <Link
          href="/"
          className="flex shrink-0 items-center focus:outline-none"
          aria-label="CodeNest"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation Links (Glassmorphic Pill) */}
        <nav
          className="hidden lg:flex shrink-0 items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#0B0D08]/70 backdrop-blur-md shadow-inner"
          aria-label="Main Navigation"
        >
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap px-4 py-1.5 text-xs lg:text-sm font-medium tracking-normal transition-all duration-200 rounded-full ${isActive
                    ? "text-brand-text bg-white/10 font-semibold shadow-sm"
                    : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex shrink-0 items-center gap-4">
          <Link
            href="/contact"
            className="btn-primary whitespace-nowrap text-xs tracking-wide py-2.5 px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          >
            {SITE_CONFIG.primaryCta}
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-brand-text hover:text-olive-highlight focus:outline-none rounded-xl border border-white/10 bg-brand-surface/80 backdrop-blur-md cursor-pointer transition-colors"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`w-full h-0.5 bg-current transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile & Tablet Full-Screen Dark Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 bg-[#070905]/98 border-t border-white/10 backdrop-blur-2xl transition-all duration-300 z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-2 pt-2">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 text-lg sm:text-xl font-medium tracking-tight transition-colors rounded-xl flex items-center justify-between min-h-[44px] ${isActive
                  ? "text-white bg-white/10 font-semibold"
                  : "text-brand-muted hover:text-brand-text hover:bg-white/5"
                  }`}
              >
                <span>{link.label}</span>
                <span className="text-sm text-white/40">↗</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 pb-2 border-t border-white/10 flex flex-col gap-3">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full text-center py-3.5 text-sm justify-center shadow-lg shadow-olive-main/20 whitespace-nowrap min-h-[44px]"
          >
            {SITE_CONFIG.primaryCta}
          </Link>
          <div className="text-center font-mono text-[0.6875rem] text-white/40 pt-2">
            CodeNest Creative Technology &bull; India &amp; UAE
          </div>
        </div>
      </div>
    </header>
  );
}
