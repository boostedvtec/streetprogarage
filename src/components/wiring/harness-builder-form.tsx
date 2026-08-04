"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { FieldWrap, TextInput, TextArea, CheckboxGroup, RadioGroup } from "@/components/form/fields";

/**
 * Option lists researched from EMS-Shop's MaxxECU custom harness
 * configurator (ems-shop.se) — the closest real-world equivalent of this
 * form — then broadened to the ECU brands and coil-on-plug platforms
 * Street PRO Garage actually wires (Honda/Subaru/Toyota/Mitsubishi/Nissan
 * as well as VAG/LS/BMW), rather than staying MaxxECU-only.
 */
const ECU_OPTIONS = [
  "MaxxECU",
  "Link ECU",
  "Haltech",
  "AEM Infinity",
  "EcuMaster",
  "Megasquirt",
  "ME (Motorsport Electronics)",
  "Other",
] as const;

const CYLINDER_OPTIONS = ["3", "4", "5", "6", "8", "10", "12"] as const;

const TRIGGER_OPTIONS = ["Crank only", "Crank + Cam", "Crank + 2 Cams"] as const;

const COIL_OPTIONS = [
  "Distributor / single coil",
  "Wasted spark — 4 cylinder",
  "Wasted spark — 6 cylinder",
  "Coil-on-plug — Honda K-Series",
  "Coil-on-plug — Honda D/B-Series",
  "Coil-on-plug — Subaru EJ/FA",
  "Coil-on-plug — Toyota 2JZ/1JZ",
  "Coil-on-plug — Mitsubishi 4G63/EVO",
  "Coil-on-plug — Nissan RB/SR",
  "Coil-on-plug — VAG (VW/Audi)",
  "Coil-on-plug — LS/LSX (GM)",
  "Coil-on-plug — BMW",
  "Other / not sure yet",
] as const;

const VVT_OPTIONS = ["No", "Yes — Intake only", "Yes — Intake + Exhaust"] as const;

const RELAY_OPTIONS = ["No", "Yes — Main relay", "Yes — Main relay + fuel pump relay"] as const;

const IDLE_OPTIONS = [
  "No idle valve",
  "2-wire (on/off)",
  "3-wire (PWM)",
  "4-wire (stepper motor)",
] as const;

const BOOST_CONTROL_OPTIONS = ["No", "Yes — boost control solenoid"] as const;

const LAMBDA_OPTIONS = [
  "Bosch LSU 4.9 (most common)",
  "Bosch LSU 4.2",
  "Not sure / need advice",
] as const;

const EXTRA_SENSOR_OPTIONS = [
  "Oil pressure + temp",
  "Fuel pressure + temp",
  "Additional wideband / lambda",
  "Other (add details below)",
] as const;

const ETB_OPTIONS = [
  "No",
  "Yes — routed cables only",
  "Yes — complete with connectors (pedal + throttle body)",
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  engineCode: string;
  ecu: string;
  cylinders: string;
  trigger: string;
  coilConnectors: string;
  vvt: string;
  relay: string;
  idle: string;
  boostControl: string;
  lambda: string;
  extraSensors: string[];
  etb: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  engineCode: "",
  ecu: "",
  cylinders: "",
  trigger: "",
  coilConnectors: "",
  vvt: "",
  relay: "",
  idle: "",
  boostControl: "",
  lambda: "",
  extraSensors: [],
  etb: "",
  notes: "",
};

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-subtle">
        {label}
      </dt>
      <dd className="mt-0.5 text-foreground">{value}</dd>
    </div>
  );
}

const REQUIRED_KEYS: (keyof FormState)[] = [
  "name",
  "email",
  "engineCode",
  "ecu",
  "cylinders",
  "trigger",
  "coilConnectors",
  "vvt",
  "relay",
  "idle",
  "boostControl",
  "lambda",
  "etb",
];

export function HarnessBuilderForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isComplete = REQUIRED_KEYS.every((key) => Boolean(form[key]));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/wiring-harness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center sm:p-12">
        <CheckCircle size={48} weight="fill" className="mx-auto text-accent" aria-hidden />
        <h3 className="font-display mt-4 text-2xl">Harness Build Received</h3>
        <p className="mt-2 text-foreground-muted">
          Thanks {form.name || "there"} — we&rsquo;ll follow up at{" "}
          {form.email || "your email"} with pricing and lead time for your build.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <FieldWrap label="Full Name" required>
          <TextInput value={form.name} onChange={(v) => set("name", v)} required />
        </FieldWrap>
        <FieldWrap label="Email" required>
          <TextInput type="email" value={form.email} onChange={(v) => set("email", v)} required />
        </FieldWrap>
        <FieldWrap label="Phone Number">
          <TextInput type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
        </FieldWrap>
      </div>

      <FieldWrap
        label="Engine Code"
        required
        hint="e.g. Honda K24, Subaru EJ205, Evo 4G63T, Supra 2JZGTE"
      >
        <TextInput
          value={form.engineCode}
          onChange={(v) => set("engineCode", v)}
          placeholder="Honda K24, Subaru EJ205, Evo 4G63T, Supra 2JZGTE etc."
          required
        />
      </FieldWrap>

      <FieldWrap label="ECU" required>
        <RadioGroup name="ecu" options={ECU_OPTIONS} value={form.ecu} onChange={(v) => set("ecu", v)} />
      </FieldWrap>

      <FieldWrap label="Number of Cylinders" required>
        <RadioGroup
          name="cylinders"
          options={CYLINDER_OPTIONS}
          value={form.cylinders}
          onChange={(v) => set("cylinders", v)}
        />
      </FieldWrap>

      <FieldWrap label="Trigger" required>
        <RadioGroup
          name="trigger"
          options={TRIGGER_OPTIONS}
          value={form.trigger}
          onChange={(v) => set("trigger", v)}
        />
      </FieldWrap>

      <FieldWrap label="Ignition Coil Connectors" required>
        <RadioGroup
          name="coilConnectors"
          options={COIL_OPTIONS}
          value={form.coilConnectors}
          onChange={(v) => set("coilConnectors", v)}
        />
      </FieldWrap>

      <FieldWrap label="VVT" required>
        <RadioGroup name="vvt" options={VVT_OPTIONS} value={form.vvt} onChange={(v) => set("vvt", v)} />
      </FieldWrap>

      <FieldWrap
        label="Relay Pack"
        required
        hint="Main relay switches ECU power; fuel relay switches the pump separately"
      >
        <RadioGroup
          name="relay"
          options={RELAY_OPTIONS}
          value={form.relay}
          onChange={(v) => set("relay", v)}
        />
      </FieldWrap>

      <FieldWrap label="Idle Control Valve" required>
        <RadioGroup name="idle" options={IDLE_OPTIONS} value={form.idle} onChange={(v) => set("idle", v)} />
      </FieldWrap>

      <FieldWrap label="Boost Control" required>
        <RadioGroup
          name="boostControl"
          options={BOOST_CONTROL_OPTIONS}
          value={form.boostControl}
          onChange={(v) => set("boostControl", v)}
        />
      </FieldWrap>

      <FieldWrap label="Lambda / Wideband Sensor" required>
        <RadioGroup
          name="lambda"
          options={LAMBDA_OPTIONS}
          value={form.lambda}
          onChange={(v) => set("lambda", v)}
        />
      </FieldWrap>

      <FieldWrap label="Extra Sensors (Pressure, Temp, etc.)" hint="Optional — select any that apply">
        <CheckboxGroup
          options={EXTRA_SENSOR_OPTIONS}
          values={form.extraSensors}
          onChange={(v) => set("extraSensors", v)}
        />
      </FieldWrap>

      <FieldWrap label="ETB (Electronic Throttle Body)" required>
        <RadioGroup name="etb" options={ETB_OPTIONS} value={form.etb} onChange={(v) => set("etb", v)} />
      </FieldWrap>

      <FieldWrap
        label="Anything Else We Should Know"
        hint="Optional — moved sensors, special cable lengths, unusual routing, etc."
      >
        <TextArea value={form.notes} onChange={(v) => set("notes", v)} />
      </FieldWrap>

      {isComplete && (
        <div className="rounded-xl border border-accent/30 bg-accent-soft p-6">
          <h3 className="font-display text-xl">Review Your Selections</h3>
          <p className="mt-1 text-xs text-foreground-subtle">
            Double-check this before submitting.
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <SummaryRow label="Name" value={form.name} />
            <SummaryRow label="Email" value={form.email} />
            {form.phone && <SummaryRow label="Phone" value={form.phone} />}
            <SummaryRow label="Engine Code" value={form.engineCode} />
            <SummaryRow label="ECU" value={form.ecu} />
            <SummaryRow label="Cylinders" value={form.cylinders} />
            <SummaryRow label="Trigger" value={form.trigger} />
            <SummaryRow label="Ignition Coil Connectors" value={form.coilConnectors} />
            <SummaryRow label="VVT" value={form.vvt} />
            <SummaryRow label="Relay Pack" value={form.relay} />
            <SummaryRow label="Idle Control Valve" value={form.idle} />
            <SummaryRow label="Boost Control" value={form.boostControl} />
            <SummaryRow label="Lambda / Wideband Sensor" value={form.lambda} />
            <SummaryRow
              label="Extra Sensors"
              value={form.extraSensors.length ? form.extraSensors.join(", ") : "None"}
            />
            <SummaryRow label="ETB" value={form.etb} />
            {form.notes && <SummaryRow label="Notes" value={form.notes} />}
          </dl>
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-error">
          Something went wrong submitting your harness build — please try again.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting" || !isComplete}>
        {status === "submitting" ? "Submitting..." : "Submit Harness Build"}
      </Button>
    </form>
  );
}
