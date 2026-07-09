import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Parts | Street PRO Garage",
  description:
    "Shop performance parts with professional fitting and diagnostics — turbos, fuelling, engine management, cooling, exhaust and drivetrain.",
};

export default function PartsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
