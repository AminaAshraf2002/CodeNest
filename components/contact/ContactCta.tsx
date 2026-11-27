"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/site";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

const FONT = { fontFamily: "'Outfit', sans-serif" } as const;

export default function ContactCta() {
  return (
    <section
      className="relative py-10 sm:py-14 overflow-hidden border-t border-white/10 bg-black flex justify-center items-center"
    >
      <div
        data-anim="zoom-in"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "0.625rem 1.5rem",
            borderRadius: "1rem",
            border: "1px dashed rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <Link
            href="/contact"
            style={{
              ...FONT,
              padding: "0.25rem 0.875rem",
              borderRadius: "0.375rem",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.875rem",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            className="hover:scale-105 hover:bg-white/95"
          >
            Reach Us Today!
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:scale-110 transition-transform"
            >
              <FaWhatsapp style={{ color: "#25D366", fontSize: "1rem" }} />
            </a>
            <a
              href={SITE_CONFIG.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-110 hover:text-white transition-all"
            >
              <FaInstagram style={{ fontSize: "1rem" }} />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              aria-label="Email"
              className="hover:scale-110 hover:text-white transition-all"
            >
              <FaEnvelope style={{ fontSize: "1rem" }} />
            </a>
          </div>

          <span style={{ width: 1, height: "0.875rem", background: "rgba(255,255,255,0.2)" }} />

          <span
            style={{
              ...FONT,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            CodeNest Studio
          </span>
        </div>
      </div>
    </section>
  );
}
