import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ECU Tuning — AEM, MaxxECU, Hondata, Link, HP Tuners | Street PRO Garage",
  description:
    "Remote, road-logged and rolling road dyno tuning in Manchester. Stock ECU (HP Tuners, Hondata S300/KPro, Nistune) and standalone — AEM, Link, MaxxECU, Haltech, EcuMaster, TunerStudio — for Honda D/B/H/F/K/R-series, Evo I–IX, WRX/STI, Supra, MR2, Pulsar and MX5/Miata builds.",
};

export default function TuningLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
