"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { FieldWrap, TextInput, TextArea } from "@/components/form/fields";
import { useRegion } from "@/components/region/region-context";

const WORK_TYPES = [
  "Custom harness / standalone ECU wiring",
  "Engine-swap wiring",
  "Piggyback ECU integration",
  "Sensors, ignition or injector wiring",
  "Gauge installation",
  "Wiring repair or fault finding",
  "Not sure yet",
] as const;

const STAGES = ["Just planning", "Parts bought, not started", "Mid-build", "Built but not running right"] as const;
const USES = ["Road", "Road and track", "Track / competition", "Show or other"] as const;

const selectClass =
  "min-h-11 rounded-md border border-border-strong bg-surface-2 px-3 py-2 text-foreground outline-none focus:border-accent";

function SelectInput({
  value,
  onChange,
  options,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <select value={value} required={required} onChange={(e) => onChange(e.target.value)} className={selectClass}>
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/**
 * Short wiring-project enquiry. Posts to the existing /api/contact route (the
 * same one the contact page uses), so it reaches the same inbox. Only the
 * contact details, vehicle, engine and type of work are required.
 */
export function WiringEnquiryForm() {
  const { data } = useRegion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [engine, setEngine] = useState("");
  const [ecu, setEcu] = useState("");
  const [workType, setWorkType] = useState("");
  const [stage, setStage] = useState("");
  const [use, setUse] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          topic: "Wiring project enquiry",
          vehicle,
          engine,
          ecu,
          workType,
          stage,
          intendedUse: use,
          message: notes || `Wiring enquiry: ${workType}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-accent/40 bg-accent-soft p-8">
        <CheckCircle size={40} weight="fill" className="text-accent" aria-hidden />
        <h3 className="font-display mt-4 text-3xl">Enquiry sent</h3>
        <p className="mt-2 text-foreground-muted">
          Thanks {name || "there"}. We will reply to {email} once we have read your details. If you have photos of the
          car or the existing wiring, reply to that email with them.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 border border-border-strong bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label="Name" required>
          <TextInput value={name} onChange={setName} required />
        </FieldWrap>
        <FieldWrap label="Email" required>
          <TextInput type="email" value={email} onChange={setEmail} required />
        </FieldWrap>
      </div>
      <FieldWrap label="Phone or WhatsApp" hint="Optional">
        <TextInput value={phone} onChange={setPhone} />
      </FieldWrap>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label="Vehicle and year" required>
          <TextInput value={vehicle} onChange={setVehicle} placeholder="e.g. 1995 Civic EG" required />
        </FieldWrap>
        <FieldWrap label="Engine and configuration" required>
          <TextInput value={engine} onChange={setEngine} placeholder="e.g. K24 swap, single turbo" required />
        </FieldWrap>
      </div>
      <FieldWrap label="ECU make and model" hint="Optional. Say if you have not chosen one yet.">
        <TextInput value={ecu} onChange={setEcu} placeholder="e.g. MaxxECU Race, Haltech Elite" />
      </FieldWrap>
      <FieldWrap label="Type of wiring work" required>
        <SelectInput value={workType} onChange={setWorkType} options={WORK_TYPES} required />
      </FieldWrap>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label="Project stage" hint="Optional">
          <SelectInput value={stage} onChange={setStage} options={STAGES} />
        </FieldWrap>
        <FieldWrap label="Intended use" hint="Optional">
          <SelectInput value={use} onChange={setUse} options={USES} />
        </FieldWrap>
      </div>
      <FieldWrap label="Anything else we should know" hint="Optional. Photos can be emailed after you send this.">
        <TextArea value={notes} onChange={setNotes} rows={4} />
      </FieldWrap>

      {status === "error" && (
        <p role="alert" className="text-sm text-error">
          That did not send. Please try again, or email {data.email} directly.
        </p>
      )}
      <Button type="submit" size="lg" disabled={status === "submitting"} className="justify-self-start">
        {status === "submitting" ? "Sending…" : "Discuss your wiring project"}
      </Button>
    </form>
  );
}
