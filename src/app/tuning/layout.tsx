import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tuning Services | Street PRO Garage",
  description:
    "Remote ECU tuning, road-logged tuning, and rolling road dyno tuning in Manchester — custom-built maps for stock and standalone ECUs, written from scratch.",
};

export default function TuningLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
