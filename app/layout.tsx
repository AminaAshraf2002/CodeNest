import type { Metadata } from "next";
import { spaceGrotesk, inter, syne, tenorSans, outfit, plusJakartaSans, anton, barlowCondensed } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollAnimations from "@/components/animations/ScrollAnimations";

export const metadata: Metadata = {
  metadataBase: new URL("https://codenest.dev"),
  title: {
    default: "CodeNest — Creative Technology Developer | India & UAE",
    template: "%s | CodeNest",
  },
  description:
    "CodeNest is an independent creative technology developer serving India and the UAE. Bespoke Next.js websites, headless e-commerce, and tactile 3D experiences. Ideas into digital experiences.",
  keywords: [
    "Next.js Developer India",
    "Next.js Developer UAE",
    "Creative Technology Developer",
    "Headless E-commerce Dubai",
    "Tailwind CSS",
    "Three.js React",
    "Web Design Mumbai",
    "Web Design Dubai",
  ],
  authors: [{ name: "CodeNest" }],
  creator: "CodeNest",
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
    url: "https://codenest.dev",
    siteName: "CodeNest",
    title: "CodeNest — Creative Technology Developer",
    description: "Ideas into digital experiences. Serving India & the UAE.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CodeNest Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNest — Creative Technology Developer",
    description: "Ideas into digital experiences. Serving India & the UAE.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
