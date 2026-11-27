export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  blockTitle: string;
  topSlogan: string;
  categoryTag: string;
  shortDesc: string;
  description: string;
  techStack: string[];
  focus: string[];
  deliverables: string[];
  circuitHue: "olive" | "cyan" | "emerald" | "amber" | "violet";
  image?: string;
}

export const SERVICES: Service[] = [
  {
    id: "business-websites",
    slug: "business-websites",
    number: "01",
    title: "Business Websites & Web Apps",
    blockTitle: "BUSINESS WEBSITES",
    topSlogan: "FAST SITES THAT WIN CLIENTS",
    categoryTag: "WEB / DEV",
    circuitHue: "olive",
    image: "/services/services1.png",
    shortDesc:
      "High-performance digital platforms engineered with Next.js, React, and Angular. Clean code, sub-second load times, and custom architecture.",
    description:
      "I build bespoke business websites and scalable web applications across Next.js, React, and Angular tailored to your business goals. Not limited to any single tool, I engineer tailored solutions with zero template bloat—structured for sub-second page loads, SEO dominance, and fluid responsiveness from mobile screens to 4K displays.",
    techStack: ["Next.js", "React", "Angular", "TypeScript", "Tailwind CSS", "Node.js"],
    focus: [
      "Next.js (App Router), React & Angular engineering",
      "Sub-0.8s load times & 95+ Core Web Vitals",
      "Enterprise SEO architecture & dynamic metadata",
      "Strict WCAG AA accessibility & responsive fluidity",
    ],
    deliverables: [
      "Production Next.js / React / Angular codebase",
      "High-velocity cloud deployment (Vercel / AWS)",
      "SEO schema markup & Core Web Vitals audit",
      "Full documentation & developer handover",
    ],
  },
  {
    id: "animated-3d-websites",
    slug: "animated-and-3d-websites",
    number: "02",
    title: "Animated & 3D Websites",
    blockTitle: "ANIMATED & 3D WEBSITES",
    topSlogan: "IMMERSIVE WEBGL EXPERIENCES",
    categoryTag: "3D / MOTION",
    circuitHue: "violet",
    image: "/services/services2.png",
    shortDesc:
      "Spatial web experiences, interactive 3D graphics, and cinematic GSAP motion design that command attention.",
    description:
      "Design and motion that captivates. I build spatial 3D web experiences using CSS 3D transforms, GSAP scroll choreography, and lightweight Three.js shaders. Elevate brand prestige with tactile micro-interactions that leave a lasting impression while preserving 95+ Google Lighthouse speed scores.",
    techStack: ["GSAP", "CSS 3D Transforms", "Three.js", "Framer Motion", "WebGL", "Figma"],
    focus: [
      "CSS 3D perspective & isometric cuboid choreographies",
      "GSAP timeline animations & scroll-triggered physics",
      "Lightweight WebGL & shader optimizations",
      "Zero layout-shift performance & 60fps fluidity",
    ],
    deliverables: [
      "Custom 3D components & motion assets",
      "Complete GSAP animation suite with clean teardown",
      "Interactive 3D showcases & product visualizers",
      "Cross-browser 60fps performance validation",
    ],
  },
  {
    id: "ecommerce-solutions",
    slug: "ecommerce-solutions",
    number: "03",
    title: "E-Commerce (Shopify, WordPress & Custom Code)",
    blockTitle: "SHOPIFY & CUSTOM E-COMMERCE",
    topSlogan: "STORES THAT SELL",
    categoryTag: "E-COMM",
    circuitHue: "cyan",
    image: "/services/services3.png",
    shortDesc:
      "High-conversion online stores engineered with custom code, Shopify Liquid, and WordPress (WooCommerce) with seamless checkouts.",
    description:
      "Turn casual visitors into loyal repeat customers. Whether engineering custom-coded headless storefronts on Next.js/React, bespoke Shopify themes with Liquid, or robust WordPress (WooCommerce) platforms, I deliver frictionless checkouts, multi-currency support (INR, AED, USD), automated inventory pipelines, and regional payment gateway integrations.",
    techStack: [
      "Custom Coded Next.js",
      "Shopify (Liquid)",
      "WordPress",
      "WooCommerce",
      "Razorpay / Stripe",
      "Headless Commerce",
    ],
    focus: [
      "Custom coded Next.js / React full-stack storefronts",
      "Shopify bespoke theme engineering & Liquid customization",
      "WordPress & WooCommerce high-conversion setups",
      "Multi-currency checkout: Razorpay, UPI, Stripe, UAE regional gateways",
    ],
    deliverables: [
      "Full custom-coded, Shopify, or WooCommerce storefront",
      "Secure payment gateway & webhook handlers",
      "Instant cart drawer & dynamic catalog filters",
      "Automated order confirmation & invoice pipeline",
    ],
  },
  {
    id: "custom-coding-apps",
    slug: "custom-coding-web-apps",
    number: "04",
    title: "Custom Coding & Dynamic Systems",
    blockTitle: "CUSTOM CODING & WEB APPS",
    topSlogan: "DASHBOARDS, CRMS, SAAS",
    categoryTag: "FULL / STACK",
    circuitHue: "emerald",
    image: "/services/services4.png",
    shortDesc:
      "Tailored full-stack development, custom business logic, interactive portals, and scalable database integrations.",
    description:
      "When off-the-shelf templates and plugins fall short, I write custom code from the ground up. From interactive portals, calculation engines, and real estate showrooms to custom booking systems and secure API backends, everything is built to your exact business specifications with zero unnecessary dependencies.",
    techStack: ["Node.js", "Next.js", "PostgreSQL", "REST / GraphQL", "Supabase", "Tailwind CSS"],
    focus: [
      "Bespoke full-stack logic & microservices",
      "Interactive calculators, portals & booking engines",
      "Custom REST & GraphQL API integrations",
      "Relational database modeling (PostgreSQL / Supabase)",
    ],
    deliverables: [
      "Tailored backend APIs & database schemas",
      "Role-based authentication & admin dashboards",
      "Comprehensive API documentation & unit tests",
      "100% intellectual property & code ownership",
    ],
  },
  {
    id: "performance-support",
    slug: "performance-and-support",
    number: "05",
    title: "Performance & Technical Support",
    blockTitle: "PERFORMANCE & OPS",
    topSlogan: "SUB-SECOND SPEEDS & 99.9% UPTIME",
    categoryTag: "OPS / SPEED",
    circuitHue: "amber",
    image: "/services/services5.png",
    shortDesc:
      "Core Web Vitals tuning, security patching, cloud infrastructure maintenance, and direct WhatsApp developer support.",
    description:
      "Your digital platform is a living business asset. I provide ongoing technical stewardship to ensure your platform remains lightning-fast, fully secured, and up-to-date with evolving web standards—with direct communication via WhatsApp and email across India and the UAE.",
    techStack: ["Core Web Vitals", "Vercel / Cloudflare", "Lighthouse", "WhatsApp Support", "Security"],
    focus: [
      "Core Web Vitals auditing (LCP < 0.8s, zero CLS)",
      "Next.js, React, Angular, Shopify & WordPress updates",
      "Edge caching, CDN routing & image optimization",
      "Direct priority developer communication",
    ],
    deliverables: [
      "Monthly performance & security audit report",
      "Rapid bug resolution & feature enhancements",
      "Automated database backups & monitoring",
      "Dedicated priority WhatsApp / Slack channel",
    ],
  },
];
