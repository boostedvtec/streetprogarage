import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { pageMeta } from "@/lib/seo";
import { paymentLinks } from "@/lib/payment-links";

export const metadata = pageMeta({
  title: "How Remote ECU Tuning Works | Street PRO Garage",
  description:
    "A plain-English guide to remote ECU tuning: live sessions vs road-logged tuning, what you need, the steps, revisions and how it compares with a dyno tune.",
  path: "/guides/remote-ecu-tuning",
  image: "/og/guide.jpg",
});

const steps = [
  ["Submit your build list", "Give us the full picture: engine, mods, ECU, fuel and your goals for the tune."],
  ["We confirm your method", "Live remote session or road-logged tuning, based on your ECU platform and setup."],
  [
    "Get set up",
    "You need a laptop that can run the tuning software, the correct ECU/USB interface cable, a stable connection and, for live sessions, a safe, legal place to drive.",
  ],
  ["Datalog it", "Follow our pre-tune checklist so we capture the right data on every run."],
  [
    "Revise until it is right",
    "We review your logs and send updated maps, repeating as many revisions as the build needs.",
  ],
  [
    "Accept the declaration",
    "Tuning is based on the information you provide, so read and accept our declaration and liability terms before we start.",
  ],
];

export default function RemoteTuningGuide() {
  return (
    <>
      <PageHero image="/images/builds/honda-ef-k24-awd-turbo.jpg" position="50% 35%">
        <Eyebrow>Guide</Eyebrow>
        <h1 className="font-display mt-5">How remote ECU tuning works</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          You do not need to visit the workshop. You send us your build details, log your own car with a laptop, and we
          write and refine the map from your data. Here is how it works, step by step.
        </p>
      </PageHero>

      <Section>
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-12 text-lg leading-relaxed text-foreground-muted">
            <div>
              <h2 className="font-display text-4xl text-foreground">What is remote tuning?</h2>
              <p className="mt-4">
                Remote ECU tuning works anywhere in the world with a laptop, the right ECU interface cable and a stable
                connection. We tune live over a remote session or from datalogs you record, and send back revised maps
                until it is right. It is used on Honda, Subaru, Toyota, Nissan, Mitsubishi and Mazda builds.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-foreground">Live remote session or road tuning?</h2>
              <p className="mt-4">
                <strong className="text-foreground">A live remote session</strong> is a tune over a remote connection while you drive or run the car.
                It suits standalone ECUs and HP Tuners-compatible platforms with a stable connection.
              </p>
              <p className="mt-4">
                <strong className="text-foreground">Road tuning</strong> is done from datalogs you record yourself following our checklist. You upload
                them, we return an updated map, and we repeat as many times as your build needs. No live connection is
                required. Your car must be roadworthy, because road tuning involves driving at higher speed on public
                roads to gather the data.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-foreground">The steps</h2>
              <ol className="mt-6 grid gap-5">
                {steps.map(([title, body], i) => (
                  <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-border-strong pt-4">
                    <span className="font-display text-3xl text-accent">{i + 1}</span>
                    <span>
                      <span className="font-display block text-2xl text-foreground">{title}</span>
                      <span className="text-base">{body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-display text-4xl text-foreground">Which ECUs can be tuned remotely?</h2>
              <p className="mt-4">
                Alongside stock ECU reflashing via HP Tuners, we work with Hondata FlashPro, KPro and S300, Ktuner, the P28
                (chipped), and standalone ECUs including AEM Infinity, Link ECU, MaxxECU, Haltech, Speeduino, Megasquirt,
                ME (Motorsport Electronics) and EcuMaster. If your ECU can be logged and tuned, we can very likely work
                with it. Submit your build list if you are not sure.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-foreground">Revisions</h2>
              <p className="mt-4">
                If you notice a cold-start issue or need a revision after your final tune, let us know within 14 days and
                it is free. After that window, revisions are chargeable at our standard revision rate.
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-foreground">Remote tune or dyno tune?</h2>
              <p className="mt-4">
                The tune price is one price for your build, the same for remote, road and dyno tuning. Dyno time is billed
                separately. Remote tuning avoids the travel, while a dyno session gives live, controlled load on the
                rolling road. See the{" "}
                <Link href="/#prices" className="text-accent underline underline-offset-4">
                  estimated prices
                </Link>{" "}
                or the{" "}
                <Link href="/tuning?type=rolling-road" className="text-accent underline underline-offset-4">
                  dyno tuning page
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="font-display text-4xl text-foreground">Ready to start?</h2>
              <p className="mt-4">
                Send your build list for a ballpark quote. Already agreed a price? You can pay securely online, then
                email info@streetprogarage.com with your vehicle and ECU details.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <LinkButton href="/quote" size="lg">
                  Get a quote
                  <ArrowRight size={18} weight="bold" aria-hidden />
                </LinkButton>
                <LinkButton href={paymentLinks.tuning} size="lg" variant="secondary">
                  Pay online
                </LinkButton>
                <LinkButton href="/pre-tune-checklist" size="lg" variant="secondary">
                  Pre-tune checklist
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
