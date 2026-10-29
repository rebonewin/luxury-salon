import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import JsonLd from "@/components/layout/JsonLd";
import { site } from "@/lib/site";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  axes: ["opsz"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Luxury Salon — The Beauty Atelier in Masuri, Meerut",
    template: "%s — Luxury Salon",
  },
  description: site.description,
  applicationName: site.name,
  category: "beauty",
  keywords: [
    "luxury salon Meerut",
    "salon in Masuri",
    "bridal makeup Meerut",
    "hair salon Meerut",
    "facial Meerut",
    "Luxury Salon",
    "luxury unisex salon Meerut",
    "beauty atelier Meerut",
    "wedding makeup Uttar Pradesh",
  ],
  authors: [{ name: "Luxury Salon — The Beauty Atelier" }],
  creator: "Luxury Salon — The Beauty Atelier",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Luxury Salon — The Beauty Atelier",
    title: "Luxury Salon — The Beauty Atelier in Masuri, Meerut",
    description: site.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Salon — a luxury salon for hair, skin and bridal artistry in Masuri, Meerut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Salon — The Beauty Atelier in Masuri, Meerut",
    description: site.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0a08",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${bodoni.variable} ${jost.variable} h-full antialiased`}
    >
      <body id="top" className="flex min-h-full flex-col bg-cream-light text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[300] focus:bg-gold focus:px-5 focus:py-3 focus:text-[0.7rem] focus:uppercase focus:tracking-[0.2em] focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <JsonLd />
      </body>
    </html>
  );
}
