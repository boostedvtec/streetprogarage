import { LocationPage } from "@/components/location/location-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Dyno Tuning & ECU Tuning in Manchester | Street PRO Garage",
  description:
    "Street PRO Garage in Manchester: rolling road dyno tuning, dyno hire, ECU tuning, standalone ECU wiring and parts with fitting. Remote tuning worldwide.",
  path: "/manchester",
  image: "/og/manchester.jpg",
});

export default function ManchesterPage() {
  return (
    <LocationPage
      region="uk"
      heroImage="/images/builds/d16-turbo.jpg"
      heroPosition="50% 55%"
      h1="Dyno tuning and ECU tuning in Manchester"
      intro="Our Manchester workshop runs a 2WD rolling road dyno with an eddy current brake, alongside ECU tuning, standalone ECU wiring and parts with fitting. Remote tuning is available worldwide."
      services={[
        {
          title: "Rolling road dyno tuning",
          text: "Tuned live on our in-house dyno with wideband AFR, full datalogs and real-time map changes.",
          href: "/tuning?type=rolling-road",
        },
        {
          title: "Dyno hire",
          text: "Dyno time only, per run or per hour, for power runs, diagnostics and before and after testing.",
          href: "/dyno-rental",
        },
        {
          title: "Remote and road tuning",
          text: "Live remote sessions or tuning from your own datalogs, anywhere in the world.",
          href: "/tuning",
        },
        {
          title: "Wiring and ECU installation",
          text: "Standalone ECU harnesses, installs, gauge wiring and Honda P28 ECU socketing.",
          href: "/custom-wiring",
        },
        {
          title: "Parts and fitting",
          text: "Performance parts with professional fitting and diagnostics.",
          href: "/parts",
        },
      ]}
    />
  );
}
