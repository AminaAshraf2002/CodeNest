import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Selected Web & E-commerce Work | CodeNest",
  description:
    "Explore 11 live websites & e-commerce stores engineered by CodeNest for businesses in India, the UAE, and worldwide. Custom code, Shopify & WordPress.",
  openGraph: {
    title: "Portfolio — Selected Web & E-commerce Work | CodeNest",
    description: "Explore 11 live websites and e-commerce stores engineered for clients in India and the UAE.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CodeNest Portfolio" }],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
