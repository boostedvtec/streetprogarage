import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Remote ECU Tuning & Dyno Tuning — Honda, Subaru, Toyota, Nissan | Street PRO Garage",
  description:
    "Custom ECU tuning written from scratch: remote (live or road-logged) or on our Manchester rolling road. Hondata KPro, HP Tuners, Nistune, MaxxECU, Link, Haltech, AEM, EcuMaster for Honda K/B/D/H/R-series, WRX/STI, Evo, Supra, MR2, SR20DET and MX-5. Get a quote.",
};

export default function TuningLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
