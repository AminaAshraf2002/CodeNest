export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  quoteLabel: string;
  turnaround: string;
  features: string[];
  deliverables: string[];
}

export const PRICING_NOTE =
  "Every project is unique. We provide a transparent, fixed quote tailored to your exact needs with zero hidden fees. Clients own their domain, hosting, database, and code directly.";

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "business-website",
    name: "Business Website",
    tagline: "Professional digital presence engineered for companies, shops, clinics, and firms.",
    popular: false,
    quoteLabel: "Get a free quote",
    turnaround: "1 – 2 weeks",
    features: [
      "Custom responsive design tailored for mobile & desktop",
      "Lead generation contact form with WhatsApp integration",
      "Basic SEO included: meta tags, titles, headings & sitemap",
      "Google Search Console setup & indexing verification",
      "Direct client ownership of domain, hosting & code",
      "30 days of free bug fixes after launch",
    ],
    deliverables: [
      "Production-ready website on your custom domain",
      "Configured DNS, SSL certificate & sitemap",
      "Source code repository access & full handover",
    ],
  },
  {
    id: "ecommerce-store",
    name: "E-Commerce Store",
    tagline: "High-conversion online stores built with Shopify, WooCommerce, or custom code.",
    popular: true,
    quoteLabel: "Get a free quote",
    turnaround: "2 – 3 weeks",
    features: [
      "Shopify, WooCommerce, or custom Next.js storefront",
      "Product pages, instant cart drawer & secure checkout",
      "Payment gateway integration (UPI, Cards, Apple Pay, UAE rails)",
      "Basic SEO included: product schema, sitemap & meta tags",
      "Product upload and category organization assistance",
      "30 days of free bug fixes after launch",
    ],
    deliverables: [
      "Complete live online store ready to accept orders",
      "Payment gateway & automated receipt pipeline",
      "Admin guide on managing products, inventory & orders",
    ],
  },
  {
    id: "dynamic-web-app",
    name: "Dynamic Website / App",
    tagline: "Custom web applications, dashboards, booking systems, and client portals.",
    popular: false,
    quoteLabel: "Get a free quote",
    turnaround: "2 – 4 weeks",
    features: [
      "Custom admin dashboard & secure database integration",
      "Bespoke business logic, calculators, or booking workflows",
      "Role-based authentication & client management",
      "Basic SEO included & responsive mobile optimization",
      "100% intellectual property & code ownership",
      "30 days of free bug fixes after launch",
    ],
    deliverables: [
      "Custom web application built to your specifications",
      "Secure database architecture (PostgreSQL / Supabase)",
      "Technical handover & admin training session",
    ],
  },
  {
    id: "redesign-performance",
    name: "Redesign & SEO Tuning",
    tagline: "Transform old, slow sites into modern platforms while protecting Google rankings.",
    popular: false,
    quoteLabel: "Get a free quote",
    turnaround: "1 – 2 weeks",
    features: [
      "Complete visual and responsive mobile overhaul",
      "Preservation of existing Google rankings with 301 redirects",
      "Image optimization & Core Web Vitals speed tuning",
      "Basic SEO included: updated meta titles, sitemap & headings",
      "Zero monthly lock-in or proprietary agency fees",
      "30 days of free bug fixes after launch",
    ],
    deliverables: [
      "Modernized, fast-loading mobile-friendly website",
      "301 redirect map protecting your existing search rankings",
      "Speed improvements & Core Web Vitals audit pass",
    ],
  },
];
