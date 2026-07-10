import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartProvider } from "@/components/cart/cart-context";
import { RegionProvider } from "@/components/region/region-context";
import { RegionGate } from "@/components/region/region-gate";

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
  title: "Street PRO Garage | Remote ECU Tuning, Rolling Road Dyno Tuning & Performance Parts",
  description:
    "Street PRO Garage delivers custom-built remote ECU tuning worldwide, rolling road dyno tuning in Manchester UK, and performance parts sales, fitting and diagnostics.",
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
        <RegionProvider>
          <CartProvider>
            <RegionGate />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
