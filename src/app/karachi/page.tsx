import { LocationPage } from "@/components/location/location-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "ECU Tuning & Engine Swaps in Karachi | Street PRO Garage",
  description:
    "Street PRO Garage in Karachi: custom ECU tuning, dyno tuning, wiring and JDM engine swaps at our Gulberg Town workshop. Remote tuning worldwide.",
  path: "/karachi",
  image: "/og/karachi.jpg",
});

export default function KarachiPage() {
  return (
    <LocationPage
      region="pk"
      heroImage="/images/builds/toyota-aristo-2jzge-turbo.jpg"
      heroPosition="50% 45%"
      h1="ECU tuning and engine swaps in Karachi"
      intro="Our Karachi workshop on Shamim Street, Gulberg Town handles ECU tuning, dyno tuning, custom wiring and full JDM engine swaps, with remote tuning available worldwide."
      services={[
        {
          title: "ECU tuning",
          text: "Custom maps written from scratch for your engine, parts and fuel, remote, road-logged or on the dyno.",
          href: "/tuning",
        },
        {
          title: "Dyno tuning",
          text: "Live tuning with datalogging and real-time map changes on our in-house dyno.",
          href: "/tuning?type=rolling-road",
        },
        {
          title: "Custom wiring and ECU installs",
          text: "Standalone ECU harnesses, installs and gauge wiring, built to last.",
          href: "/custom-wiring",
        },
        {
          title: "Engine swaps and builds",
          text: "From a straightforward donor engine swap to a full custom build: fitment, wiring, fuelling and cooling, then tuned.",
          href: "/engine-swaps",
        },
      ]}
    />
  );
}
