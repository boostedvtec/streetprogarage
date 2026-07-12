import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ECU Tuning — AEM, MaxxECU, Hondata, HP Tuners | Street PRO Garage",
  description:
    "Remote, road-logged and rolling road dyno tuning in Manchester. Stock ECU (HP Tuners, Hondata S300, Honda P28) and standalone ECUs — AEM, Link, MaxxECU, EcuMaster DET3+ — for Civic, Integra, Supra, Evo, WRX/STI and MX5 builds.",
};

export default function TuningLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
