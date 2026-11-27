export interface ProcessCard {
  title: string;
  desc: string;
  icon: string;
}

export interface ProcessStep {
  step: string;
  name: string;
  paymentTerm: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  cards: ProcessCard[];
  verificationPills: string[];
}

export const PROCESS_NOTE =
  "Clients own their domain, hosting, database, code and payment accounts directly. Zero vendor lock-in.";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    name: "Free Consultation",
    paymentTerm: "Free Consultation",
    subtitle: "DISCOVERY & REQUIREMENTS",
    description:
      "We begin with a free consultation to understand your business goals, target audience, required features, and ideal launch timeline.",
    details: [
      "Review your business needs, goals, and target audience in India, the UAE, or globally",
      "Discuss platform choice: custom Next.js code, Shopify, or WordPress",
      "Clarify all required features, pages, integrations, and deliverables",
    ],
    image: "/process/step1.jpg",
    cards: [
      {
        title: "Free Discussion",
        desc: "An open, friendly consultation with zero financial commitment or pushy sales tactics.",
        icon: "comments",
      },
      {
        title: "Tailored Architecture",
        desc: "Selecting the right technology stack whether Shopify, WordPress, or custom code.",
        icon: "compass",
      },
      {
        title: "Clear Scope Plan",
        desc: "Every feature and page is discussed and agreed upon before any work begins.",
        icon: "list-check",
      },
      {
        title: "Direct Client Ownership",
        desc: "All domain, hosting, database, and payment accounts will be 100% in your own name.",
        icon: "shield",
      },
    ],
    verificationPills: [
      "Free Consultation",
      "Direct Client Ownership",
      "Zero Vendor Lock-in",
    ],
  },
  {
    step: "02",
    name: "Fixed Quote",
    paymentTerm: "Transparent Fixed Quote",
    subtitle: "PROPOSAL & TRANSPARENT MILESTONES",
    description:
      "We prepare a clear, itemized proposal with a fixed quote and guaranteed delivery schedule. No surprises, no hidden fees.",
    details: [
      "Clear milestone roadmap with exact delivery dates",
      "Detailed breakdown of all pages, features, and integrations",
      "Fixed written quote with guaranteed zero hidden charges",
    ],
    image: "/process/step2.jpg",
    cards: [
      {
        title: "Fixed Price Guarantee",
        desc: "The quote we provide is the exact price you pay. No unexpected add-ons or hidden fees.",
        icon: "file-invoice-dollar",
      },
      {
        title: "Transparent Milestones",
        desc: "Payments are linked directly to approved deliverables at each stage of the project.",
        icon: "handshake",
      },
      {
        title: "Written Scope",
        desc: "A straightforward written scope agreement so everyone is aligned from day one.",
        icon: "file-contract",
      },
      {
        title: "Flexible Tech Choice",
        desc: "Shopify, WordPress, or custom Next.js code chosen based on what best serves your business.",
        icon: "code",
      },
    ],
    verificationPills: [
      "Fixed Quote Guarantee",
      "No Hidden Charges",
      "Clear Written Milestones",
    ],
  },
  {
    step: "03",
    name: "40% Advance Kickoff",
    paymentTerm: "40% Advance",
    subtitle: "ARCHITECTURE & DEVELOPMENT KICKOFF",
    description:
      "Work begins with a 40% advance payment. We set up your project repository, establish the design system, and configure your infrastructure.",
    details: [
      "40% advance payment to officially start the project",
      "Setup of code repository, design system, and responsive layout foundations",
      "Initial wireframe structuring and core page architecture",
    ],
    image: "/process/step3.jpg",
    cards: [
      {
        title: "Sprint Kickoff",
        desc: "Development begins immediately with structured sprints and clear communication.",
        icon: "rocket",
      },
      {
        title: "Responsive Foundation",
        desc: "Mobile-first layouts tested to ensure smooth performance across all phone and screen sizes.",
        icon: "mobile-screen",
      },
      {
        title: "Direct Team Access",
        desc: "Direct communication on WhatsApp and email with fast 24-hour reply times.",
        icon: "headset",
      },
      {
        title: "Basic SEO Setup",
        desc: "SEO foundations, semantic markup, and page metadata prepared right from the start.",
        icon: "magnifying-glass",
      },
    ],
    verificationPills: [
      "40% Advance",
      "Mobile-First Build",
      "Direct Communication",
    ],
  },
  {
    step: "04",
    name: "Design Approval (30%)",
    paymentTerm: "30% Design Approval",
    subtitle: "REVIEW & 2 REVISION ROUNDS",
    description:
      "We present the complete design and working prototype for your review. We include 2 full revision rounds to ensure everything matches your vision.",
    details: [
      "Interactive prototype and live staging review",
      "2 complete revision rounds included to refine design, copy, and layout",
      "30% milestone payment released upon your full design approval",
    ],
    image: "/process/step4.jpg",
    cards: [
      {
        title: "Interactive Review",
        desc: "Preview your website on a private staging link before it ever goes public to the world.",
        icon: "eye",
      },
      {
        title: "2 Revision Rounds",
        desc: "We incorporate your feedback and refine typography, imagery, and layouts until you approve.",
        icon: "palette",
      },
      {
        title: "Approval Milestone",
        desc: "The 30% milestone is only due once you are completely satisfied with the design.",
        icon: "circle-check",
      },
      {
        title: "Cross-Device QA",
        desc: "Verification across mobile phones, tablets, laptops, and large monitors.",
        icon: "laptop-code",
      },
    ],
    verificationPills: [
      "2 Revision Rounds Included",
      "30% Milestone",
      "Client Approval First",
    ],
  },
  {
    step: "05",
    name: "Launch (30%) & Support",
    paymentTerm: "Final 30% Upon Launch",
    subtitle: "PRODUCTION LAUNCH & 30 DAYS FREE FIXES",
    description:
      "Upon final 30% payment, we launch your website live to the world. Every website includes 30 days of free bug fixes and complete account handover.",
    details: [
      "Domain connection, SSL configuration, and production launch",
      "Final 30% payment upon successful live deployment",
      "30 days of free bug fixes and post-launch technical support",
      "Complete handover of code, credentials, domain, and hosting accounts",
    ],
    image: "/process/step5.jpg",
    cards: [
      {
        title: "Production Launch",
        desc: "Live deployment on your own domain with SSL security, Google Search Console, and sitemap.",
        icon: "flag-checkered",
      },
      {
        title: "30 Days Free Fixes",
        desc: "30 days of complimentary post-launch support and bug fixes so you launch with confidence.",
        icon: "wrench",
      },
      {
        title: "100% Account Handover",
        desc: "You receive full admin credentials and custody of all domains, hosting, code, and payments.",
        icon: "key",
      },
      {
        title: "No Vendor Lock-in",
        desc: "You own everything outright. You are never locked in or dependent on a single agency.",
        icon: "unlock",
      },
    ],
    verificationPills: [
      "Final 30% at Launch",
      "30 Days Free Bug Fixes",
      "100% Client Custody",
    ],
  },
];
