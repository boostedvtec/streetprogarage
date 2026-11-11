import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & Book ECU Tuning | Street PRO Garage",
  description: "Contact Street PRO Garage to book remote ECU tuning, dyno tuning, ECU installs or engine swaps. Manchester UK, Karachi and remote worldwide.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
