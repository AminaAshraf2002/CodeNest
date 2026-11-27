export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  location: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  features: string[];
  accentColor: string;
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    slug: "aurum-atelier",
    title: "Aurum Atelier",
    client: "Aurum High Fashion",
    category: "Luxury Fashion Store",
    year: "2025",
    location: "Dubai & Mumbai",
    tagline: "Editorial aesthetics meet sub-second headless commerce.",
    summary:
      "A digital flagship designed for a luxury fashion house bridging Dubai couture and contemporary Indian heritage. Engineered with Next.js, fluid micro-interactions, and instant checkout.",
    challenge:
      "Luxury apparel demands immersive high-resolution editorial imagery without sacrificing page load velocity or conversion efficiency. The client required multi-currency pricing (AED and INR) with regional taxes and bespoke lookbook transitions.",
    solution:
      "I developed a custom Next.js storefront using dynamic image optimization via Cloudinary, localized currency switching, zero-layout-shift motion, and a streamlined slide-over cart with regional payment gateways.",
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Conversion Lift", value: "+38%" },
      { label: "Median Page Load", value: "0.68s" },
    ],
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "GSAP", "Razorpay / Stripe", "Cloudinary"],
    features: [
      "Dynamic multi-currency switching (AED / INR)",
      "Editorial lookbook with swipeable interactive detail tags",
      "Headless checkout with automated order confirmation",
      "Custom cursor & fluid page transitions",
      "Instant inventory sync and size suggestion module",
    ],
    accentColor: "#94AB32",
  },
  {
    slug: "lumina-audio",
    title: "Lumina Audio",
    client: "Lumina Acoustics",
    category: "Modern Electronics Store",
    year: "2025",
    location: "Bengaluru & Abu Dhabi",
    tagline: "Precision acoustic engineering presented through tactile 3D interactions.",
    summary:
      "An audio hardware storefront designed for audiophile studio monitors and wireless headphones. Features an interactive 3D product visualizer, frequency spectrum previews, and frictionless checkout.",
    challenge:
      "Acoustic equipment buyers require technical depth—driver composition, frequency response charts, and finish materials—presented in a sensory, intuitive manner without cluttering the buyer journey.",
    solution:
      "I crafted a minimalist dark interface highlighting physical product textures with interactive 3D rotations, comparative acoustic spec sheets, and an instantaneous one-click checkout system.",
    metrics: [
      { label: "Interactive Engagement", value: "+54%" },
      { label: "Average Session Time", value: "3m 42s" },
      { label: "Cart Abandonment Drop", value: "-24%" },
    ],
    stack: ["Next.js", "React Three Fiber", "Tailwind CSS", "PostgreSQL", "Neon", "Vercel"],
    features: [
      "Real-time 3D product inspection and finish selection",
      "Interactive frequency response visualization",
      "Real-time inventory status by regional warehouse",
      "Express checkout with Apple Pay and UPI support",
      "Automated warranty registration system",
    ],
    accentColor: "#C5D45A",
  },
  {
    slug: "elysian-estates",
    title: "Elysian Estates",
    client: "Elysian Living Group",
    category: "Premium Real Estate Site",
    year: "2024",
    location: "Dubai Marina & Palm Jumeirah",
    tagline: "Architectural grandeur translated into high-performance web exploration.",
    summary:
      "An exclusive portal for ultra-prime residential villas and penthouses across the UAE. Built for private investors and international buyers seeking discreet property discovery and private viewing requests.",
    challenge:
      "High-net-worth real estate buyers expect ultra-refined typography, discreet lead acquisition, and fluid architectural floorplan exploration without lag across mobile and desktop.",
    solution:
      "I designed an editorial layout inspired by architectural monographs, paired with lightning-fast villa filtering, high-definition panoramic galleries, and end-to-end encrypted viewing enquiry workflows.",
    metrics: [
      { label: "Qualified Inquiries", value: "+62%" },
      { label: "First Contentful Paint", value: "0.45s" },
      { label: "User Retention", value: "4.8/5" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion / GSAP", "PostgreSQL", "Neon"],
    features: [
      "Bespoke architectural layout with cinematic imagery",
      "Interactive floor plan viewer with dimension toggle",
      "Direct VIP WhatsApp consultation and private calendar booking",
      "Multilingual ready structure (English & Arabic)",
      "Secure project inquiry handler with automated CRM forwarding",
    ],
    accentColor: "#789024",
  },
];
