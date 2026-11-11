import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/quote" },
  title: "Build List & Quote | Street PRO Garage",
  description:
    "Submit your build list to get a ballpark quote for remote ECU tuning, road tuning or rolling road tuning at Street PRO Garage, UK and Pakistan.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
