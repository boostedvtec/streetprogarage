import { HomePage } from "@/components/home/home-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "JDM ECU Tuning, Remote & Dyno | Street PRO Garage",
  description:
    "Custom JDM ECU tuning for Honda, Toyota, Subaru, Nissan, Mitsubishi and Mazda. Remote worldwide, rolling road dyno in Manchester, plus wiring and engine swaps.",
  path: "",
  image: "/og/home.jpg",
});

export default function Page() {
  return <HomePage />;
}
