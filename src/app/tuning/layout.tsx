import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Remote & Dyno ECU Tuning | Street PRO Garage",
  description: "Custom ECU tuning written from scratch, remote (live or road-logged) or on our Manchester rolling road. Honda, Subaru, Toyota, Nissan. Get a quote.",
  path: "/tuning",
  image: "/og/tuning.jpg",
});

export default function TuningLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
