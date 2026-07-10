"use client";

import { useState } from "react";
import { Phone, EnvelopeSimple, MapPin, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FieldWrap, TextInput, TextArea, RadioGroup } from "@/components/form/fields";
import { siteConfig } from "@/lib/site-config";

const TOPICS = ["General Enquiry", "Remote Tuning", "Rolling Road Dyno Tune", "Parts"] as const;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Get In Touch</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">Contact</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Questions about tuning, parts, or booking a rolling road session?
            Reach out and we&rsquo;ll get back to you.
          </p>
        </Container>
      </div>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-start gap-3">
                <MapPin size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h2 className="font-semibold">Location</h2>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {siteConfig.location.city}, {siteConfig.location.country}
                  </p>
                  <p className="mt-1 text-xs text-foreground-subtle">
                    {siteConfig.location.note}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-start gap-3">
                <Phone size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h2 className="font-semibold">Phone</h2>
                  <a href={siteConfig.phoneHref} className="mt-1 block text-sm text-foreground-muted hover:text-foreground">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-start gap-3">
                <EnvelopeSimple size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <h2 className="font-semibold">Email</h2>
                  <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-foreground-muted hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-border-strong bg-surface p-6">
              <div className="flex items-start gap-3">
                <InstagramLogo size={22} className="mt-0.5 shrink-0 text-foreground-subtle" aria-hidden />
                <div>
                  <h2 className="font-semibold">Social</h2>
                  <p className="mt-1 text-sm text-foreground-subtle">{siteConfig.social.note}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-8">
            {status === "done" ? (
              <div className="py-12 text-center">
                <h2 className="font-display text-3xl">Message Sent</h2>
                <p className="mt-3 text-foreground-muted">
                  Thanks {name || "there"} — we&rsquo;ll get back to you as soon as we can.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldWrap label="Full Name" required>
                    <TextInput value={name} onChange={setName} required />
                  </FieldWrap>
                  <FieldWrap label="Email" required>
                    <TextInput type="email" value={email} onChange={setEmail} required />
                  </FieldWrap>
                  <FieldWrap label="Phone" hint="Optional">
                    <TextInput type="tel" value={phone} onChange={setPhone} />
                  </FieldWrap>
                </div>
                <FieldWrap label="What's this about?" required>
                  <RadioGroup name="topic" options={TOPICS} value={topic} onChange={setTopic} />
                </FieldWrap>
                <FieldWrap label="Message" required>
                  <TextArea value={message} onChange={setMessage} rows={5} required />
                </FieldWrap>
                {status === "error" && (
                  <p className="text-sm text-error">
                    Something went wrong sending your message — please try again.
                  </p>
                )}
                <Button type="submit" size="lg" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
