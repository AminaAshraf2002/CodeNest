export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  price: {
    INR: {
      min: number;
      max: number;
      display: string;
    };
    AED: {
      min: number;
      max: number;
      display: string;
    };
  };
  turnaround: string;
  features: string[];
  deliverables: string[];
}

export const PRICING_NOTE =
  "Starting ranges. The final quote depends on features, content and integrations. Domain and hosting are billed separately.";

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Essential digital presence for emerging brands and personal ventures.",
    popular: false,
    price: {
      INR: {
        min: 5000,
        max: 10000,
        display: "₹5,000 – ₹10,000",
      },
      AED: {
        min: 350,
        max: 650,
        display: "AED 350 – 650",
      },
    },
    turnaround: "5 – 7 business days",
    features: [
      "1 – 3 bespoke responsive pages",
      "Tailored modern design (no generic themes)",
      "Interactive enquiry / contact form",
      "Essential on-page SEO & metadata",
      "Lightning-fast Vercel deployment",
      "Cross-browser & mobile testing",
    ],
    deliverables: [
      "Production-ready Next.js codebase",
      "Configured DNS & SSL",
      "Source code repository access",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "High-impact digital architecture engineered for growth and authority.",
    popular: true,
    price: {
      INR: {
        min: 16000,
        max: 28000,
        display: "₹16,000 – ₹28,000",
      },
      AED: {
        min: 1000,
        max: 1800,
        display: "AED 1,000 – 1,800",
      },
    },
    turnaround: "10 – 16 business days",
    features: [
      "5 – 8 custom-crafted pages",
      "Bespoke UI/UX design in Figma",
      "Micro-animations & GSAP scroll interactions",
      "Custom forms & dynamic integrations",
      "Complete technical SEO & Open Graph suite",
      "Google Analytics & speed optimisation (95+ score)",
      "CMS / Headless blog integration option",
    ],
    deliverables: [
      "Interactive prototype approval",
      "Next.js App Router repository",
      "30-day post-launch bug warranty",
      "Admin & content guide",
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    tagline: "Custom digital storefront engineered for conversion and velocity.",
    popular: false,
    price: {
      INR: {
        min: 30000,
        max: 50000,
        display: "₹30,000 – ₹50,000",
      },
      AED: {
        min: 2000,
        max: 3300,
        display: "AED 2,000 – 3,300",
      },
    },
    turnaround: "3 – 4 weeks",
    features: [
      "Custom Next.js high-speed storefront",
      "Full shopping cart & smooth checkout flow",
      "Razorpay / Stripe / local UAE payment gateways",
      "Real-time order management & automated receipts",
      "Product catalogue with filters & instant search",
      "Intuitive admin dashboard for catalogue & inventory",
      "Transactional email notifications",
    ],
    deliverables: [
      "Dedicated merchant store configuration",
      "Automated payment webhook infrastructure",
      "Client training & handover documentation",
      "30-day priority bug-fix warranty",
    ],
  },
  {
    id: "advanced-commerce",
    name: "Advanced Commerce",
    tagline: "Enterprise-grade digital infrastructure with custom workflows and scale.",
    popular: false,
    price: {
      INR: {
        min: 50000,
        max: 90000,
        display: "₹50,000 – ₹90,000",
      },
      AED: {
        min: 3300,
        max: 6000,
        display: "AED 3,300 – 6,000",
      },
    },
    turnaround: "5 – 7 weeks",
    features: [
      "Custom backend architecture & secure REST/GraphQL APIs",
      "Multi-currency support (INR, AED, USD)",
      "Automated multi-warehouse inventory tracking",
      "Customer accounts, order history & saved wishlists",
      "Advanced sales analytics & conversion reporting",
      "PostgreSQL / Neon database integration",
      "Cloudinary media optimization pipeline",
      "Sub-second global performance CDN tuning",
    ],
    deliverables: [
      "Full API documentation & architecture schema",
      "Production database cluster configuration",
      "Comprehensive handover & credentials security audit",
      "60-day priority support & warranty",
    ],
  },
];
