import localFont from "next/font/local";
import { Outfit, Plus_Jakarta_Sans, Anton } from "next/font/google";

export const barlowCondensed = localFont({
  src: [
    {
      path: "../public/fonts/barlow-condensed-900-italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const spaceGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/space-grotesk-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/space-grotesk-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/space-grotesk-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const syne = localFont({
  src: [
    {
      path: "../public/fonts/syne-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/syne-800.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-syne",
  display: "swap",
});

export const tenorSans = localFont({
  src: [
    {
      path: "../public/fonts/tenor-sans-400.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tenor-sans",
  display: "swap",
});

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
