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
  "Clients own their domain, hosting, database, and payment accounts directly. No vendor lock-in.";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    name: "Enquiry",
    paymentTerm: "No initial commitment",
    subtitle: "DISCOVERY & ARCHITECTURE ALIGNMENT",
    description:
      "We begin with a direct discussion about your vision, functional requirements, technical architecture, and desired launch date.",
    details: [
      "Review project scope and target audience (India / UAE)",
      "Technical architecture assessment (Next.js, database, payments)",
      "Clarification of deliverables and brand expectations",
    ],
    image: "/process/step1.jpg",
    cards: [
      {
        title: "Technical Blueprint",
        desc: "Architecture specification for Next.js App Router, serverless Postgres, and regional CDNs.",
        icon: "compass",
      },
      {
        title: "Regional Alignment",
        desc: "Optimized for Indian and UAE markets, local payment rails, and multi-currency compliance.",
        icon: "globe",
      },
      {
        title: "Zero Financial Lock-in",
        desc: "Initial consultations and technical feasibility reviews come with zero financial obligation.",
        icon: "lock-open",
      },
      {
        title: "Account Sovereignty",
        desc: "All cloud, registrar, and database credentials remain 100% in your organization's name.",
        icon: "shield",
      },
    ],
    verificationPills: [
      "India & UAE Compliant",
      "Direct Account Ownership",
      "Zero Vendor Lock-in",
    ],
  },
  {
    step: "02",
    name: "Quotation",
    paymentTerm: "Transparent agreement",
    subtitle: "TRANSPARENT PROPOSAL & MILESTONES",
    description:
      "I prepare an itemized proposal with clear milestones, precise deliverables, and transparent pricing in INR or AED.",
    details: [
      "Itemized milestone roadmap and delivery schedule",
      "Exact technology choices and infrastructure requirements",
      "Written scope agreement with no hidden fees",
    ],
    image: "/process/step2.jpg",
    cards: [
      {
        title: "Itemized Milestones",
        desc: "Every feature and deliverable is clearly tied to concrete sprint dates and measurable targets.",
        icon: "file-lines",
      },
      {
        title: "Fixed Currency Rates",
        desc: "Transparent estimates in INR (₹) or AED (د.إ) with strict zero hidden fees guarantee.",
        icon: "credit-card",
      },
      {
        title: "Written Scope Contract",
        desc: "Legally clear scope agreement ensuring both parties are aligned on timelines and outcomes.",
        icon: "file-contract",
      },
      {
        title: "Milestone Protection",
        desc: "Payments are released strictly in stages upon client verification and approved milestone handovers.",
        icon: "handshake",
      },
    ],
    verificationPills: [
      "Transparent Milestone Terms",
      "Zero Hidden Surcharges",
      "Clear Written Deliverables",
    ],
  },
  {
    step: "03",
    name: "Advance 40%",
    paymentTerm: "40% Project Deposit",
    subtitle: "INFRASTRUCTURE & CORE CODE SETUP",
    description:
      "Upon proposal sign-off and receipt of the 40% initial deposit, project kickoff begins immediately with environment setup and core architecture.",
    details: [
      "Repository setup & dependency baseline configuration",
      "Information architecture and wireframe structuring",
      "Staging environment and client preview pipeline setup",
    ],
    image: "/process/step3.jpg",
    cards: [
      {
        title: "Private Git Repository",
        desc: "Setup of clean GitHub/GitLab repository with branch protection rules and CI/CD pipelines.",
        icon: "code-branch",
      },
      {
        title: "Live Edge Staging URL",
        desc: "Continuous preview deployments on Vercel Edge network for instant team review.",
        icon: "rocket",
      },
      {
        title: "Database Provisioning",
        desc: "Serverless Postgres / Neon database architecture initialized with automated migrations.",
        icon: "database",
      },
      {
        title: "Design System Foundation",
        desc: "Typography tokens, Tailwind variables, and responsive layout scaffolding locked in.",
        icon: "cubes",
      },
    ],
    verificationPills: [
      "Live Staging URL",
      "Protected Git Branching",
      "40% Kickoff Deposit",
    ],
  },
  {
    step: "04",
    name: "Design Approval 30%",
    paymentTerm: "30% Design Milestone",
    subtitle: "INTERACTIVE UI/UX REFINEMENT",
    description:
      "High-fidelity responsive UI/UX prototypes are presented for your review. Two revision rounds are included to ensure absolute aesthetic alignment.",
    details: [
      "Interactive high-fidelity prototypes review",
      "Two iterative revision rounds for design refinement",
      "Sign-off before final frontend and backend code buildout",
    ],
    image: "/process/step4.jpg",
    cards: [
      {
        title: "Tactile Prototyping",
        desc: "Review real responsive pages across mobile devices, tablets, and 4K desktop screens.",
        icon: "mobile-screen",
      },
      {
        title: "2 Revision Rounds",
        desc: "Two structured revision cycles dedicated to typography, layout, and visual perfection.",
        icon: "arrows-rotate",
      },
      {
        title: "Motion Choreography",
        desc: "GSAP scroll physics, micro-interactions, and 3D effects calibrated for smooth 60fps.",
        icon: "wand-sparkles",
      },
      {
        title: "Sign-Off Verification",
        desc: "Aesthetic sign-off before commencing full production database and checkout logic.",
        icon: "circle-check",
      },
    ],
    verificationPills: [
      "2 Iterative Revisions",
      "Cross-Device Fidelity",
      "30% Approval Milestone",
    ],
  },
  {
    step: "05",
    name: "Launch 30%",
    paymentTerm: "30% Final Handover",
    subtitle: "PRODUCTION LAUNCH & 95+ AUDIT",
    description:
      "Full production build, rigorous cross-device testing, SEO verification, and deployment to your production domain, followed by handover and a 30-day bug warranty.",
    details: [
      "90+ Lighthouse speed and Core Web Vitals audit",
      "Complete code handover and DNS / SSL configuration",
      "Client ownership of all cloud, hosting, and payment accounts",
      "30-day bug-fix warranty included with every build",
    ],
    image: "/process/step5.jpg",
    cards: [
      {
        title: "95+ Lighthouse Score",
        desc: "Sub-0.8s load times, zero layout shift (CLS), and green Core Web Vitals guaranteed.",
        icon: "gauge",
      },
      {
        title: "Domain & SSL Handover",
        desc: "Production DNS, edge caching headers, and automated SSL certificate provisioning.",
        icon: "lock",
      },
      {
        title: "Complete Code Transfer",
        desc: "100% transfer of source code, deployment scripts, and comprehensive developer handover.",
        icon: "box-archive",
      },
      {
        title: "30-Day Bug Warranty",
        desc: "Priority resolution for any edge-case defects or browser inconsistencies post-launch.",
        icon: "shield-heart",
      },
    ],
    verificationPills: [
      "95+ Lighthouse Speed",
      "30-Day Bug Warranty",
      "100% Source Code Handover",
    ],
  },
];
