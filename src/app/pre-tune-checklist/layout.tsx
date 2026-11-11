import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/pre-tune-checklist" },
  title: "Pre-Tune Checklist | Street PRO Garage",
  description:
    "A readiness checklist to work through before booking remote, road or rolling road ECU tuning, so your car is ready and your datalogs are useful.",
};

export default function PreTuneChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
