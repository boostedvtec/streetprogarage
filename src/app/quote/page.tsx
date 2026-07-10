"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FieldWrap, TextInput, TextArea, CheckboxGroup, RadioGroup } from "@/components/form/fields";
import { tuningAddOns, preDynoTests, rollingRoad, forcedInductionUplifts, variablePriceNote, dynoHoursGuidance } from "@/lib/site-config";
import { estimateQuote, type EcuType, type ServiceType, type EngineInternals } from "@/lib/quote";
import { formatRegionPrice, formatResolvedAmount, resolveRegionPrice, dynoServiceLabel, type Region } from "@/lib/region";
import { useRegion } from "@/components/region/region-context";

const ASPIRATION_OPTIONS = ["Turbo", "Nitrous", "Supercharged", "N/A"] as const;
const FORCED_INDUCTION_ASPIRATIONS = ["Turbo", "Nitrous", "Supercharged"] as const;
const ENGINE_INTERNALS_OPTIONS: { value: EngineInternals; label: string }[] = [
  { value: "stock", label: "Stock Internals" },
  { value: "built", label: "Built / Forged Internals" },
];
const FUEL_TYPE_OPTIONS = ["Pump Gas Premium", "E85", "Flex Fuel (Pump Gas + E85)"] as const;
const INJECTOR_STATUS_OPTIONS = ["New", "Used or not sure", "Used (flow tested in the past 6 months)"] as const;
const YES_NO = ["Yes", "No"] as const;
const WIDEBAND_OPTIONS = ["Yes", "No", "Yes, but I need help installing/integrating it"] as const;
const VEHICLE_APPLICATION_OPTIONS = [
  "Daily Driver",
  "I live my life a quarter mile at a time",
  "Daily Driver / occasional track use",
  "Extreme rally conditions",
] as const;
function getServiceTypeOptions(region: Region, city: string): { value: ServiceType; label: string }[] {
  return [
    { value: "remote", label: "Remote Tuning" },
    { value: "rolling-road", label: `${dynoServiceLabel(region)} (${city})` },
    { value: "both", label: "Both" },
  ];
}
const ECU_TYPE_OPTIONS: { value: EcuType; label: string }[] = [
  { value: "stock", label: "Stock ECU (HP Tuners reflash)" },
  { value: "standalone", label: "Standalone ECU" },
  { value: "unsure", label: "Not sure yet" },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  vehicle: string;
  engineCode: string;
  bottomEnd: string;
  cylinderHead: string;
  aspiration: string[];
  engineInternals: EngineInternals;
  powerAdder: string;
  ignition: string;
  sparkPlugs: string;
  injectorSizeBrand: string;
  fuelSystem: string;
  fuelType: string;
  injectorStatus: string;
  ecuConfig: string;
  ecuType: EcuType;
  catchCan: string;
  wideband: string;
  oilSystem: string;
  transmission: string;
  chassisSuspension: string;
  wheelsTires: string;
  vehicleApplication: string[];
  goals: string;
  specialRequirement: string;
  serviceType: ServiceType;
  rollingRoadHours: number;
  rollingRoadHoursTouched: boolean;
  addOns: string[];
  preDyno: string[];
  declarationAccepted: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  postcode: "",
  vehicle: "",
  engineCode: "",
  bottomEnd: "",
  cylinderHead: "",
  aspiration: [],
  engineInternals: "stock",
  powerAdder: "",
  ignition: "",
  sparkPlugs: "",
  injectorSizeBrand: "",
  fuelSystem: "",
  fuelType: "",
  injectorStatus: "",
  ecuConfig: "",
  ecuType: "unsure",
  catchCan: "",
  wideband: "",
  oilSystem: "",
  transmission: "",
  chassisSuspension: "",
  wheelsTires: "",
  vehicleApplication: [],
  goals: "",
  specialRequirement: "",
  serviceType: "remote",
  rollingRoadHours: 2,
  rollingRoadHoursTouched: false,
  addOns: [],
  preDyno: [],
  declarationAccepted: false,
};

const STEP_LABELS = ["Vehicle", "Engine", "Fuel & ECU", "Chassis & Goals", "Service & Quote"];

export default function QuotePage() {
  const { region, data } = useRegion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const serviceTypeOptions = getServiceTypeOptions(region, data.city);
  const stockUplift = forcedInductionUplifts.find((u) => u.key === "stock")?.amount ?? {
    uk: null,
    pk: null,
  };
  const builtUplift = forcedInductionUplifts.find((u) => u.key === "built")?.amount ?? {
    uk: null,
    pk: null,
  };

  const isForcedInduction = form.aspiration.some((a) =>
    (FORCED_INDUCTION_ASPIRATIONS as readonly string[]).includes(a)
  );
  // Naturally aspirated engines without a power adder typically need less
  // dyno time than forced induction or otherwise complex builds.
  const suggestedHours = isForcedInduction ? 2 : 1;
  const effectiveHours = form.rollingRoadHoursTouched ? form.rollingRoadHours : suggestedHours;

  const quote = estimateQuote({
    region,
    serviceType: form.serviceType,
    ecuType: form.ecuType,
    aspiration: form.aspiration,
    engineInternals: form.engineInternals,
    addOns: form.addOns,
    preDyno: form.preDyno,
    rollingRoadHours: effectiveHours,
  });

  const isLastStep = step === STEP_LABELS.length - 1;

  async function handleSubmit() {
    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimate: quote }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitStatus("done");
    } catch {
      setSubmitStatus("error");
    }
  }

  if (submitStatus === "done") {
    return (
      <Section>
        <Container className="max-w-2xl text-center">
          <CheckCircle size={56} weight="fill" className="mx-auto text-accent" aria-hidden />
          <h1 className="font-display mt-6 text-4xl">Build List Received</h1>
          <p className="mt-4 text-foreground-muted">
            {region === "pk" ? (
              <>
                Thanks {form.name || "there"} — we&rsquo;ve received your build
                list. We&rsquo;ll follow up by email at {form.email} with your
                quote.
              </>
            ) : (
              <>
                Thanks {form.name || "there"} — we&rsquo;ve received your build list and
                ballpark estimate of <strong className="text-foreground">{formatResolvedAmount(quote.low, region)}&ndash;{formatResolvedAmount(quote.high, region)}</strong>.
                We&rsquo;ll follow up by email at {form.email} with your exact quote.
              </>
            )}
          </p>
          <Button className="mt-8" onClick={() => window.location.assign("/")}>
            Back to Home
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Eyebrow>Build List &amp; Quote</Eyebrow>
        <h1 className="font-display mt-4 text-5xl">
          {region === "pk" ? "Submit Your Build List" : "Get Your Ballpark Quote"}
        </h1>
        <p className="mt-4 max-w-2xl text-foreground-muted">
          {region === "pk"
            ? "Tell us about your build — every tune is custom-written, so the more detail you give us, the more accurate your quote will be. We'll confirm pricing directly once we've reviewed it."
            : "Tell us about your build — every tune is custom-written, so the more detail you give us, the more accurate your estimate will be."}
        </p>

        {/* Progress */}
        <ol className="mt-10 flex flex-wrap gap-2 text-xs font-medium" aria-label="Form progress">
          {STEP_LABELS.map((label, i) => (
            <li
              key={label}
              className={`rounded-full border px-3 py-1.5 ${
                i === step
                  ? "border-accent bg-accent-soft text-accent"
                  : i < step
                  ? "border-border-strong bg-surface-2 text-foreground-muted"
                  : "border-border bg-surface text-foreground-subtle"
              }`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8">
          {step === 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldWrap label="Full Name" required>
                  <TextInput value={form.name} onChange={(v) => set("name", v)} required />
                </FieldWrap>
                <FieldWrap label="Email" required>
                  <TextInput type="email" value={form.email} onChange={(v) => set("email", v)} required />
                </FieldWrap>
                <FieldWrap label="Phone Number">
                  <TextInput type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
                </FieldWrap>
                <FieldWrap label="Postal Code">
                  <TextInput value={form.postcode} onChange={(v) => set("postcode", v)} />
                </FieldWrap>
                <FieldWrap label="Address" hint="Optional">
                  <TextInput value={form.address} onChange={(v) => set("address", v)} />
                </FieldWrap>
              </div>
              <FieldWrap label="Year Make Model" required>
                <TextInput
                  value={form.vehicle}
                  onChange={(v) => set("vehicle", v)}
                  placeholder="e.g. 2006 Honda Civic Type R"
                  required
                />
              </FieldWrap>
              <FieldWrap label="Engine Code" required>
                <TextInput
                  value={form.engineCode}
                  onChange={(v) => set("engineCode", v)}
                  placeholder="D16Z6, K24A3, 2JZGTE etc."
                  required
                />
              </FieldWrap>
            </>
          )}

          {step === 1 && (
            <>
              <FieldWrap label="Bottom End Modifications" required>
                <TextArea value={form.bottomEnd} onChange={(v) => set("bottomEnd", v)} required />
              </FieldWrap>
              <FieldWrap label="Cylinder Head Modifications" required>
                <TextArea value={form.cylinderHead} onChange={(v) => set("cylinderHead", v)} required />
              </FieldWrap>
              <FieldWrap label="Aspiration" required>
                <RadioGroup
                  name="aspiration"
                  options={ASPIRATION_OPTIONS}
                  value={form.aspiration[0] ?? ""}
                  onChange={(v) => set("aspiration", [v])}
                />
              </FieldWrap>
              {form.aspiration.some((a) =>
                (FORCED_INDUCTION_ASPIRATIONS as readonly string[]).includes(a)
              ) && (
                <FieldWrap
                  label="Engine Internals"
                  required
                  hint={`Stock internal +${formatRegionPrice(stockUplift, region)}, built/forged internal +${formatRegionPrice(builtUplift, region)} — added on top of the basic tune price`}
                >
                  <RadioGroup
                    name="engineInternals"
                    options={ENGINE_INTERNALS_OPTIONS.map((o) => o.label)}
                    value={
                      ENGINE_INTERNALS_OPTIONS.find((o) => o.value === form.engineInternals)
                        ?.label ?? ""
                    }
                    onChange={(label) =>
                      set(
                        "engineInternals",
                        ENGINE_INTERNALS_OPTIONS.find((o) => o.label === label)?.value ?? "stock"
                      )
                    }
                  />
                </FieldWrap>
              )}
              <FieldWrap
                label="Power Adder Details"
                hint="Wastegate size and spring, boost control, nitrous kit spec"
                required
              >
                <TextArea value={form.powerAdder} onChange={(v) => set("powerAdder", v)} required />
              </FieldWrap>
              <FieldWrap label="Ignition System Upgrades" required>
                <TextInput value={form.ignition} onChange={(v) => set("ignition", v)} required />
              </FieldWrap>
              <FieldWrap label="Spark Plugs and Gap" required>
                <TextInput value={form.sparkPlugs} onChange={(v) => set("sparkPlugs", v)} required />
              </FieldWrap>
            </>
          )}

          {step === 2 && (
            <>
              <FieldWrap label="Fuel Injector Size and Brand" required>
                <TextInput
                  value={form.injectorSizeBrand}
                  onChange={(v) => set("injectorSizeBrand", v)}
                  required
                />
              </FieldWrap>
              <FieldWrap label="Fuel System Details" required>
                <TextArea value={form.fuelSystem} onChange={(v) => set("fuelSystem", v)} required />
              </FieldWrap>
              <FieldWrap label="Fuel Type" required>
                <RadioGroup
                  name="fuelType"
                  options={FUEL_TYPE_OPTIONS}
                  value={form.fuelType}
                  onChange={(v) => set("fuelType", v)}
                />
              </FieldWrap>
              <FieldWrap label="Injector Status" required>
                <RadioGroup
                  name="injectorStatus"
                  options={INJECTOR_STATUS_OPTIONS}
                  value={form.injectorStatus}
                  onChange={(v) => set("injectorStatus", v)}
                />
              </FieldWrap>
              <FieldWrap label="ECU Configuration" required hint="Make/model of ECU or tuning suite">
                <TextInput value={form.ecuConfig} onChange={(v) => set("ecuConfig", v)} required />
              </FieldWrap>
              <FieldWrap label="ECU Platform Type" required hint="Used to scope your ballpark estimate">
                <RadioGroup
                  name="ecuType"
                  options={ECU_TYPE_OPTIONS.map((o) => o.label)}
                  value={ECU_TYPE_OPTIONS.find((o) => o.value === form.ecuType)?.label ?? ""}
                  onChange={(label) =>
                    set("ecuType", ECU_TYPE_OPTIONS.find((o) => o.label === label)?.value ?? "unsure")
                  }
                />
              </FieldWrap>
              <FieldWrap label="Catch Can Installed?" required>
                <RadioGroup name="catchCan" options={YES_NO} value={form.catchCan} onChange={(v) => set("catchCan", v)} />
              </FieldWrap>
              <FieldWrap label="Wideband Gauge?" required>
                <RadioGroup
                  name="wideband"
                  options={WIDEBAND_OPTIONS}
                  value={form.wideband}
                  onChange={(v) => set("wideband", v)}
                />
              </FieldWrap>
              <FieldWrap label="Oil System Upgrades" required>
                <TextInput value={form.oilSystem} onChange={(v) => set("oilSystem", v)} required />
              </FieldWrap>
              <FieldWrap label="Transmission Details" required>
                <TextInput value={form.transmission} onChange={(v) => set("transmission", v)} required />
              </FieldWrap>
            </>
          )}

          {step === 3 && (
            <>
              <FieldWrap label="Chassis / Suspension" required>
                <TextArea value={form.chassisSuspension} onChange={(v) => set("chassisSuspension", v)} required />
              </FieldWrap>
              <FieldWrap label="Wheels / Tires" required>
                <TextArea value={form.wheelsTires} onChange={(v) => set("wheelsTires", v)} required />
              </FieldWrap>
              <FieldWrap label="Vehicle Application" required hint="Select all that apply">
                <CheckboxGroup
                  options={VEHICLE_APPLICATION_OPTIONS}
                  values={form.vehicleApplication}
                  onChange={(v) => set("vehicleApplication", v)}
                />
              </FieldWrap>
              <FieldWrap label="Goals for the Tune" required>
                <TextArea value={form.goals} onChange={(v) => set("goals", v)} required />
              </FieldWrap>
              <FieldWrap label="Any Special Requirement" hint="Optional">
                <TextArea value={form.specialRequirement} onChange={(v) => set("specialRequirement", v)} />
              </FieldWrap>
            </>
          )}

          {step === 4 && (
            <>
              <FieldWrap label="Service Type" required>
                <RadioGroup
                  name="serviceType"
                  options={serviceTypeOptions.map((o) => o.label)}
                  value={serviceTypeOptions.find((o) => o.value === form.serviceType)?.label ?? ""}
                  onChange={(label) =>
                    set("serviceType", serviceTypeOptions.find((o) => o.label === label)?.value ?? "remote")
                  }
                />
              </FieldWrap>

              {form.serviceType === "both" && (
                <div className="rounded-lg border border-border-strong bg-surface-2 p-4 text-sm text-foreground-muted">
                  Your car is set up and pre-tuned remotely before it goes on
                  the dyno, so everything&rsquo;s confirmed working first. Once
                  it&rsquo;s on the dyno, we focus on maximising power to make the
                  most of the session — saving dyno time and diagnostics.
                  After the final dyno tune, the car is retested on the road
                  with datalogs to double-check everything&rsquo;s running
                  correctly.
                </div>
              )}

              {form.serviceType !== "remote" && (
                <FieldWrap
                  label={`Estimated ${dynoServiceLabel(region)} Hours`}
                  hint={
                    resolveRegionPrice(rollingRoad.ratePerHour, region) === null
                      ? `Ask for pricing. ${dynoHoursGuidance}`
                      : `${formatRegionPrice(rollingRoad.ratePerHour, region)}/hr, billed separately from the tune price. ${dynoHoursGuidance}`
                  }
                >
                  <TextInput
                    type="number"
                    value={String(effectiveHours)}
                    onChange={(v) => {
                      set("rollingRoadHours", Number(v) || 1);
                      set("rollingRoadHoursTouched", true);
                    }}
                  />
                </FieldWrap>
              )}

              <FieldWrap label="Add-Ons" hint="Optional — select any that apply">
                <CheckboxGroup
                  options={tuningAddOns.map((a) => a.name)}
                  values={form.addOns}
                  onChange={(v) => set("addOns", v)}
                />
              </FieldWrap>
              {form.addOns.some((name) => {
                const addOn = tuningAddOns.find((a) => a.name === name);
                return addOn && resolveRegionPrice(addOn.price, region) === null;
              }) && <p className="-mt-2 text-xs text-foreground-subtle">{variablePriceNote}</p>}

              {form.serviceType !== "remote" && (
                <FieldWrap label="Pre-Dyno Engine Health Checks" hint="Optional — additional charge">
                  <CheckboxGroup
                    options={preDynoTests.map((t) => t.name)}
                    values={form.preDyno}
                    onChange={(v) => set("preDyno", v)}
                  />
                </FieldWrap>
              )}

              {region === "pk" ? (
                <div className="rounded-xl border border-accent/30 bg-accent-soft p-6">
                  <h2 className="font-display text-2xl">Pricing Confirmed After Review</h2>
                  <p className="mt-3 text-sm text-foreground-muted">
                    Every tune is custom-written, so we&rsquo;ll quote you
                    directly based on your build details rather than showing
                    an automatic estimate here. Submit your build list below
                    and we&rsquo;ll get back to you with pricing.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-accent/30 bg-accent-soft p-6">
                  <h2 className="font-display text-2xl">
                    Ballpark Estimate: {formatResolvedAmount(quote.low, region)}&ndash;{formatResolvedAmount(quote.high, region)}
                  </h2>
                  <ul className="mt-3 space-y-1 text-sm text-foreground-muted">
                    {quote.breakdown.map((b) => (
                      <li key={b.label} className="flex justify-between gap-4">
                        <span>{b.label}</span>
                        <span>{formatResolvedAmount(b.amount, region)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-foreground-subtle">
                    This is a ballpark estimate based on your answers — every
                    tune is custom, so your exact quote is confirmed after we
                    review your full build.
                  </p>
                </div>
              )}

              <label className="flex items-start gap-3 rounded-xl border border-border-strong bg-surface-2 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={form.declarationAccepted}
                  onChange={(e) => set("declarationAccepted", e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--color-accent)]"
                  required
                />
                <span>
                  I have read and accept the{" "}
                  <Link href="/declaration" className="text-accent underline" target="_blank">
                    Declaration &amp; Liability
                  </Link>{" "}
                  terms — tuning is carried out based on the information I have
                  provided, and Street PRO Garage is not responsible for
                  pre-existing engine or vehicle issues.
                </span>
              </label>

              {submitStatus === "error" && (
                <p className="text-sm text-error">
                  Something went wrong submitting your build list — please try again.
                </p>
              )}
            </>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft size={18} aria-hidden />
            Back
          </Button>

          {!isLastStep ? (
            <Button type="button" onClick={() => setStep((s) => Math.min(STEP_LABELS.length - 1, s + 1))}>
              Next
              <ArrowRight size={18} weight="bold" aria-hidden />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!form.declarationAccepted || !form.name || !form.email || submitStatus === "submitting"}
            >
              {submitStatus === "submitting" ? "Submitting..." : "Submit Build List"}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
