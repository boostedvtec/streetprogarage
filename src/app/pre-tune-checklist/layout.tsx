import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-Tune Checklist | Street PRO Garage",
  description:
    "A self-check readiness list before booking remote or rolling road tuning at Street PRO Garage.",
};

export default function PreTuneChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
