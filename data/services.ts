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
  badge?: string;
}

export const SERVICES: Service[] = [
  {
    id: "ecommerce-websites",
    slug: "ecommerce-websites",
    number: "01",
    title: "E-commerce Websites",
    blockTitle: "E-COMMERCE WEBSITES",
    topSlogan: "ONLINE STORES THAT SELL",
    categoryTag: "E-COMMERCE",
    circuitHue: "cyan",
    image: "/services/services3.png",
    shortDesc:
      "Custom-coded, Shopify and WordPress (WooCommerce) stores with product pages, cart, secure checkout, payments and order management.",
    description:
      "We design and build high-converting online stores tailored to your brand. Whether you need a custom-coded store on Next.js, a bespoke Shopify store, or a flexible WordPress (WooCommerce) setup, we deliver fast product pages, smooth cart drawers, secure payment checkouts, and seamless order management for customers across India, the UAE, and worldwide.",
    techStack: ["Next.js", "Shopify", "WooCommerce", "Razorpay", "Stripe", "Tailwind CSS"],
    focus: [
      "Custom-coded stores, Shopify Liquid and WooCommerce setups",
      "Product showcase pages, collections and instant cart drawers",
      "Secure multi-currency checkouts (INR, AED, USD)",
      "Automated order management, invoicing and stock alerts",
    ],
    deliverables: [
      "Complete live e-commerce store ready for sales",
      "Payment gateway setup (UPI, Cards, Apple Pay)",
      "Mobile-optimized checkout flow",
      "Admin training and store management handover",
    ],
  },
  {
    id: "business-websites",
    slug: "business-websites",
    number: "02",
    title: "Business Websites",
    blockTitle: "BUSINESS WEBSITES",
    topSlogan: "CLEAN, PROFESSIONAL & CREDIBLE",
    categoryTag: "BUSINESS",
    circuitHue: "olive",
    image: "/services/services1.png",
    shortDesc:
      "Professional websites for companies, shops, clinics, restaurants, real estate and more.",
    description:
      "We build modern, credible business websites designed to turn visitors into enquiries and customers. Ideal for corporate firms, local shops, medical clinics, restaurants, and real estate agencies in India and the UAE looking for a standout online presence that loads fast and looks polished on every device.",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    focus: [
      "Clean corporate branding and service presentations",
      "Direct enquiry forms with WhatsApp integration",
      "Mobile-first responsive layouts tested across all viewports",
      "Fast load times with zero unnecessary plugin bloat",
    ],
    deliverables: [
      "Complete custom business website",
      "Lead generation contact form and WhatsApp click-to-chat",
      "Google Search Console & Google Maps integration",
      "Full ownership handover of domain and hosting accounts",
    ],
  },
  {
    id: "dynamic-websites",
    slug: "dynamic-websites",
    number: "03",
    title: "Dynamic Websites",
    blockTitle: "DYNAMIC WEBSITES",
    topSlogan: "EASY CONTENT YOU CAN UPDATE",
    categoryTag: "CONTENT & CMS",
    circuitHue: "emerald",
    image: "/services/services4.png",
    shortDesc:
      "Websites with admin panels, databases and content the client can update themselves.",
    description:
      "We build flexible dynamic websites backed by secure databases and intuitive admin dashboards. You can easily add new pages, update text, publish blogs, manage service listings, and upload media anytime without writing a single line of code or relying on a developer.",
    techStack: ["Next.js", "PostgreSQL", "Sanity / Strapi", "Supabase", "Node.js"],
    focus: [
      "Intuitive client admin panel for effortless daily updates",
      "Secure relational databases for listings, blogs and media",
      "Dynamic search, category filters and sorting options",
      "Role-based access controls for your team members",
    ],
    deliverables: [
      "Custom CMS or admin dashboard configured for your workflow",
      "Database setup and secure cloud hosting connection",
      "Video walkthrough showing how to edit and publish content",
      "100% direct client ownership of database and code",
    ],
  },
  {
    id: "custom-coding-software",
    slug: "custom-coding-software",
    number: "04",
    title: "Custom Coding & Software",
    blockTitle: "CUSTOM CODING & SOFTWARE",
    topSlogan: "BUILT TO YOUR EXACT NEEDS",
    categoryTag: "SOFTWARE",
    circuitHue: "violet",
    image: "/services/services4.png",
    shortDesc:
      "Web apps, dashboards, booking systems and custom business software.",
    description:
      "When off-the-shelf software and website builders cannot solve your workflow, we write custom software from the ground up. From bespoke customer portals and real-time dashboards to appointment booking systems and internal business tools, we engineer reliable solutions with clean, scalable code.",
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    focus: [
      "Custom web applications and interactive client portals",
      "Real-time operational dashboards and analytics views",
      "Automated appointment booking and scheduling logic",
      "Third-party API integrations and automated email notifications",
    ],
    deliverables: [
      "Custom software application built to your specifications",
      "Production deployment with automated backups",
      "Clear API documentation and technical handover",
      "Complete source code ownership with zero monthly platform lock-in",
    ],
  },
  {
    id: "shopify-wordpress-development",
    slug: "shopify-wordpress-development",
    number: "05",
    title: "Shopify & WordPress Development",
    blockTitle: "SHOPIFY & WORDPRESS",
    topSlogan: "PROVEN CMS PLATFORMS",
    categoryTag: "ECOMMERCE & CMS",
    circuitHue: "cyan",
    image: "/services/services3.png",
    shortDesc:
      "Setup, themes, customisation and plugins.",
    description:
      "We provide expert setup, custom theme design, and plugin configuration for Shopify and WordPress. Whether you want to launch a new store on Shopify or customize an existing WordPress site, we make sure your platform is secure, easy to manage, fast, and conversion-ready.",
    techStack: ["Shopify Liquid", "WordPress", "WooCommerce", "PHP", "CSS3", "JavaScript"],
    focus: [
      "Complete store setup from scratch or existing theme overhaul",
      "Bespoke theme customization matching your brand guidelines",
      "Essential plugin and app configuration without speed drag",
      "Payment gateways, shipping methods and tax rule setup",
    ],
    deliverables: [
      "Fully configured Shopify store or WordPress website",
      "Custom brand styling and typography adjustments",
      "Configured payment, checkout and notification emails",
      "Simple admin guide for managing products and pages",
    ],
  },
  {
    id: "animated-3d-websites",
    slug: "animated-3d-websites",
    number: "06",
    title: "Animated & 3D Websites",
    blockTitle: "ANIMATED & 3D WEBSITES",
    topSlogan: "STAND OUT WITH 3D & MOTION",
    categoryTag: "3D & MOTION",
    circuitHue: "violet",
    image: "/services/services2.png",
    shortDesc:
      "Three.js 3D experiences and scroll animations for brands that want to stand out.",
    description:
      "Make an unforgettable first impression. We build interactive 3D web experiences and fluid scroll-triggered animations using Three.js and GSAP. Perfect for premium brands, architecture studios, luxury real estate, and creative businesses that want their digital doorway to look extraordinary while remaining fast on mobile.",
    techStack: ["Three.js", "GSAP", "WebGL", "Framer Motion", "Tailwind CSS"],
    focus: [
      "Lightweight Three.js 3D models and interactive canvases",
      "Cinematic GSAP scroll choreographies and smooth reveals",
      "Optimized 60fps performance on laptops, tablets and phones",
      "Zero layout-shift motion design that keeps content accessible",
    ],
    deliverables: [
      "Interactive 3D elements and custom animation suite",
      "Cross-browser and mobile performance validation",
      "Optimized asset bundle with fast loading times",
      "Direct client code ownership with clean handoff",
    ],
  },
  {
    id: "website-redesign",
    slug: "website-redesign",
    number: "07",
    title: "Website Redesign",
    blockTitle: "WEBSITE REDESIGN",
    topSlogan: "MODERN LOOK, PROTECTED RANKINGS",
    categoryTag: "REDESIGN",
    circuitHue: "amber",
    image: "/services/services5.png",
    shortDesc:
      "Turning old, slow websites into modern, mobile-friendly ones without losing Google rankings.",
    description:
      "If your current website is slow, outdated, or difficult to use on mobile phones, we transform it into a fresh, modern experience. We carefully preserve your existing Google rankings, URLs, and SEO authority with proper 301 redirects, updated meta tags, and significantly faster load times.",
    techStack: ["Next.js", "React", "Tailwind CSS", "SEO 301 Redirects", "Core Web Vitals"],
    focus: [
      "Fresh modern design overhaul aligned with current standards",
      "Strict preservation of existing SEO rankings and traffic",
      "Mobile-friendly overhaul that works on every screen size",
      "Speed improvements and clean code migration",
    ],
    deliverables: [
      "Completely redesigned, modern website",
      "301 redirect map protecting your existing Google rankings",
      "Updated metadata, sitemap and search console submission",
      "Measurable performance and mobile usability improvements",
    ],
  },
  {
    id: "product-adding-upload",
    slug: "product-adding-upload",
    number: "08",
    title: "Product Adding / Product Upload",
    blockTitle: "PRODUCT UPLOAD",
    topSlogan: "ACCURATE & ORGANIZED CATALOGS",
    categoryTag: "CATALOG MANAGEMENT",
    circuitHue: "olive",
    image: "/services/services3.png",
    shortDesc:
      "Adding and organising products, images, prices and categories in online stores.",
    description:
      "Save time and avoid catalog errors. We professionally add, organize, and format your products across Shopify, WooCommerce, or custom storefronts. We handle product titles, detailed descriptions, high-resolution image uploads, price tiers, variant options (sizes, colors), and clean category structures.",
    techStack: ["Shopify Admin", "WooCommerce", "CSV Bulk Imports", "Image Optimization"],
    focus: [
      "Accurate product title, SKU, price and inventory setup",
      "Variant configuration (sizes, colors, materials, weights)",
      "High-resolution image optimization and alt tag assignment",
      "Logical category structuring and tag-based collection filters",
    ],
    deliverables: [
      "Fully uploaded and verified online store product catalog",
      "Optimized image files with consistent formatting",
      "Working variant options and inventory tracking",
      "Complete catalog review report before store launch",
    ],
  },
  {
    id: "website-performance-optimisation",
    slug: "website-performance-optimisation",
    number: "09",
    title: "Website Performance Optimisation",
    blockTitle: "PERFORMANCE OPTIMISATION",
    topSlogan: "FASTER SPEEDS & BETTER SCORES",
    categoryTag: "PERFORMANCE",
    circuitHue: "amber",
    image: "/services/services5.png",
    shortDesc:
      "Speed improvements, image optimisation, Core Web Vitals fixes.",
    description:
      "A fast website ranks higher on Google and converts more visitors into paying customers. We audit and optimize your website for real-world speed — reducing file sizes, serving next-gen WebP/AVIF images, eliminating code bottlenecks, and resolving Core Web Vitals issues for smooth mobile performance.",
    techStack: ["Google PageSpeed", "Core Web Vitals", "Image CDN", "Next.js", "Clean Code"],
    focus: [
      "Audit and repair of Largest Contentful Paint (LCP) and layout shifts",
      "Next-generation image compression (WebP / AVIF)",
      "Elimination of render-blocking scripts and unused code",
      "Caching configuration and content delivery optimization",
    ],
    deliverables: [
      "Before and after speed audit report",
      "Optimized image assets and streamlined scripts",
      "Passing Google Core Web Vitals assessment",
      "Ongoing performance recommendations checklist",
    ],
  },
  {
    id: "basic-seo-included",
    slug: "basic-seo-included",
    number: "10",
    title: "Basic SEO — INCLUDED FREE WITH EVERY WEBSITE",
    blockTitle: "BASIC SEO (FREE WITH EVERY SITE)",
    topSlogan: "BUILT-IN SEARCH VISIBILITY",
    categoryTag: "FREE INCLUDED SEO",
    circuitHue: "emerald",
    image: "/services/services1.png",
    badge: "Basic SEO included with every website",
    shortDesc:
      "Page titles, meta descriptions, headings, sitemap, Google Search Console setup and mobile-friendly structure.",
    description:
      "We believe every business website deserves to be discovered on Google from day one. That is why Basic SEO is included free with every single website we build — covering custom page titles, compelling meta descriptions, clean H1/H2 heading hierarchy, XML sitemap generation, Google Search Console verification, and mobile-friendly structure.",
    techStack: ["Google Search Console", "XML Sitemap", "Robots.txt", "Schema JSON-LD", "Semantic HTML5"],
    focus: [
      "Unique, keyword-researched page titles and meta descriptions",
      "Clean, semantic H1, H2, and H3 heading structure on every page",
      "Dynamic XML sitemap and automated robots.txt generation",
      "Google Search Console setup and mobile-friendly indexing validation",
    ],
    deliverables: [
      "Fully configured on-page SEO across all website pages",
      "Verified Google Search Console property setup",
      "Automated XML sitemap submitted to Google",
      "JSON-LD structured data for business search results",
    ],
  },
];
