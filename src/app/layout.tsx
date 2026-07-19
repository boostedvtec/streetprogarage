import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/components/cart/cart-context";
import { RegionProvider } from "@/components/region/region-context";
import { RegionGate } from "@/components/region/region-gate";
import { TidioWidget } from "@/components/chat/tidio-widget";
import { siteUrl } from "@/lib/site-config";

/**
 * Topics the business has genuine expertise in — gives search and AI answer
 * engines a clearer topical signal than free-text descriptions alone.
 */
const knowsAbout = [
  "ECU Tuning",
  "Rolling Road Dyno Tuning",
  "Remote ECU Tuning",
  "Honda P28",
  "Hondata S300",
  "AEM Infinity",
  "Link ECU",
  "MaxxECU",
  "EcuMaster DET3+",
  "HP Tuners",
  "Turbo Tuning",
  "Flex Fuel Tuning",
];

/**
 * Two AutoRepair listings (one per workshop) so both locations can surface
 * independently in local search / Google Business results.
 */
const businessJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Street PRO Garage",
    image: `${siteUrl}/images/Logo.png`,
    url: siteUrl,
    telephone: "+44 7438 483559",
    email: "info@streetprogarage.com",
    priceRange: "££",
    knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manchester",
      addressCountry: "GB",
    },
    areaServed: ["United Kingdom", "Worldwide (remote tuning)"],
  },
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Street PRO Garage",
    image: `${siteUrl}/images/Logo.png`,
    url: siteUrl,
    telephone: "+92 346 2767382",
    email: "info@streetprogarage.com",
    knowsAbout,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shamim Street, Gulberg Town",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.9290278,
      longitude: 67.0648889,
    },
    areaServed: ["Pakistan", "Worldwide (remote tuning)"],
  },
];

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Street PRO Garage | Remote ECU Tuning, Rolling Road Dyno Tuning & Performance Parts",
  description:
    "Street PRO Garage delivers custom-built remote ECU tuning worldwide, rolling road dyno tuning in Manchester UK, and performance parts sales, fitting and diagnostics.",
  openGraph: {
    siteName: "Street PRO Garage",
    title: "Street PRO Garage | Remote ECU Tuning, Rolling Road Dyno Tuning & Performance Parts",
    description:
      "Custom-built remote ECU tuning worldwide, rolling road dyno tuning in Manchester UK, and performance parts sales, fitting and diagnostics.",
    url: siteUrl,
    type: "website",
    images: [`${siteUrl}/images/Logo.png`],
  },
  twitter: {
    card: "summary",
    title: "Street PRO Garage | Remote ECU Tuning, Rolling Road Dyno Tuning & Performance Parts",
    description:
      "Custom-built remote ECU tuning worldwide, rolling road dyno tuning in Manchester UK, and performance parts sales, fitting and diagnostics.",
    images: [`${siteUrl}/images/Logo.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <RegionProvider>
          <CartProvider>
            <RegionGate />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <TidioWidget />
          </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
