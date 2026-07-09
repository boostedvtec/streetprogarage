import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build List & Quote | Street PRO Garage",
  description:
    "Submit your build list to get a ballpark quote for remote ECU tuning or rolling road tuning at Street PRO Garage.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
