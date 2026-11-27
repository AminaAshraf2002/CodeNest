import type { Metadata } from "next";
import { spaceGrotesk, inter, syne, tenorSans, outfit, plusJakartaSans, anton, barlowCondensed } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollAnimations from "@/components/animations/ScrollAnimations";
import { FAQS } from "@/data/faqs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codenest.design";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CodeNest — Creative Technology Studio | India & UAE",
    template: "%s | CodeNest",
  },
  description:
    "Independent creative technology studio building custom Next.js websites, Shopify, WordPress & dynamic web applications in India and UAE. Basic SEO included.",
  keywords: [
    "website developer in India",
    "e-commerce website development India",
    "Shopify developer India",
    "WordPress developer India",
    "website design for small business India",
    "custom software development India",
    "web design Dubai",
    "website development UAE",
    "e-commerce website Dubai",
    "Shopify developer Dubai",
    "WordPress developer Dubai",
    "web design company Dubai",
    "dynamic website development",
    "business website design",
    "3D website design",
    "Three.js website",
    "website redesign",
    "website speed optimisation",
    "product upload services",
    "custom web application development",
  ],
  authors: [{ name: "CodeNest Creative Technology" }],
  creator: "CodeNest Creative Technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "CodeNest Creative Technology",
    title: "CodeNest — Creative Technology Studio | India & UAE",
    description: "Ideas into digital experiences. Serving businesses in India and the UAE.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeNest Creative Technology Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNest — Creative Technology Studio | India & UAE",
    description: "Ideas into digital experiences. Serving businesses in India and the UAE.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdProfessionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CodeNest Creative Technology",
  alternateName: "CodeNest",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  image: `${baseUrl}/og-image.png`,
  description:
    "Independent creative technology studio building custom Next.js websites, Shopify & WordPress stores, dynamic web applications, and 3D web experiences in India and the UAE. Basic SEO included free with every website.",
  email: "codenest.creative@gmail.com",
  telephone: "+971522953757",
  areaServed: [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "United Arab Emirates" },
  ],
  sameAs: ["https://www.instagram.com/codenest.design"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Creative Technology Services",
    itemListElement: [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Websites" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Websites" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dynamic Websites" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Coding & Software" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Shopify & WordPress Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Animated & 3D Websites" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Redesign" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Adding / Product Upload" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Performance Optimisation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Basic SEO (Included Free)" } },
    ],
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Array.isArray(FAQS)
    ? FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    : [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${syne.variable} ${tenorSans.variable} ${outfit.variable} ${plusJakartaSans.variable} ${anton.variable} ${barlowCondensed.variable} h-full antialiased dark`}
    >
      <head>
        <noscript>
          <style>{`[data-anim],[data-anim-stagger]>*{opacity:1!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfessionalService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-black text-brand-text font-sans antialiased selection:bg-olive-dark selection:text-brand-text"
      >
        <ScrollAnimations />
        <SmoothScroll>
          <Preloader />
          <Navbar />
          <main className="flex-1 w-full pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
