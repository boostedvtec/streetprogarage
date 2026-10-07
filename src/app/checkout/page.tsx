"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, CreditCard, Truck } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";
import { deliveryOptions, defaultDeliveryOptionId, getDeliveryOption } from "@/lib/delivery";

export default function CheckoutPage() {
  const { detailedLines, subtotal, vatTotal, grandTotal, lines, clear } = useCart();
  const router = useRouter();
  const [deliveryOptionId, setDeliveryOptionId] = useState(defaultDeliveryOptionId);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [status, setStatus] = useState<"idle" | "submitting" | "message">("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [bank, setBank] = useState<{
    accountName: string;
    sortCode: string;
    accountNumber: string;
  } | null>(null);

  const deliveryCost = getDeliveryOption(deliveryOptionId)?.price ?? 0;
  const payTotal = grandTotal + deliveryCost;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          postcode: formData.get("postcode"),
        },
        lines,
        deliveryOptionId,
        paymentMethod,
      }),
    });
    const data = await res.json();
    if (data.status === "redirect" && data.url) {
      window.location.href = data.url;
      return;
    }
    if (!res.ok) {
      setError(data.error ?? "Something went wrong — please try again.");
      setStatus("idle");
      return;
    }
    setError("");
    setMessage(data.message ?? data.error ?? "Something went wrong — please try again.");
    setReference(data.reference ?? "");
    setBank(data.bank ?? null);
    setStatus("message");
  }

  if (detailedLines.length === 0 && status === "idle") {
    return (
      <Section>
        <Container>
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="font-display mt-4 text-4xl">Your cart is empty</h1>
          <Button onClick={() => router.push("/parts")} className="mt-6">
            Browse Parts
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Eyebrow>Checkout</Eyebrow>
        <h1 className="font-display mt-4 text-5xl">Checkout</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="font-display text-xl">Contact &amp; Delivery</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                  Full Name
                  <input
                    name="name"
                    required
                    className="h-11 rounded-md border border-border-strong bg-surface-2 px-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="h-11 rounded-md border border-border-strong bg-surface-2 px-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="h-11 rounded-md border border-border-strong bg-surface-2 px-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                  Delivery Address
                  <input
                    name="address"
                    required
                    className="h-11 rounded-md border border-border-strong bg-surface-2 px-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  Postcode
                  <input
                    name="postcode"
                    required
                    className="h-11 rounded-md border border-border-strong bg-surface-2 px-3 text-foreground outline-none focus:border-accent"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2">
                <Truck size={20} className="text-accent" aria-hidden />
                <h2 className="font-display text-xl">Delivery Options</h2>
              </div>
              <label className="mt-4 flex flex-col gap-1.5 text-sm">
                Choose a delivery method
                <select
                  name="deliveryOptionId"
                  value={deliveryOptionId}
                  onChange={(e) => setDeliveryOptionId(e.target.value)}
                  className="h-11 cursor-pointer rounded-md border border-border-strong bg-surface-2 px-3 text-foreground outline-none focus:border-accent"
                >
                  {(["UK", "Europe", "Rest of World"] as const).map((region) => (
                    <optgroup key={region} label={region}>
                      {deliveryOptions
                        .filter((o) => o.region === region)
                        .map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.name} — £{o.price.toFixed(2)}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </label>
              <p className="mt-2 text-xs text-foreground-subtle">
                Large or oversized parts may need a bespoke courier rate — we&rsquo;ll
                confirm before dispatch if that applies. See{" "}
                <a href="/delivery-information" className="text-accent underline">
                  Delivery Information
                </a>
                .
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-accent" aria-hidden />
                <h2 className="font-display text-xl">Payment</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    { id: "card", title: "Pay by card", note: "Visa, Mastercard, Amex, Apple Pay, Google Pay — secure checkout by Stripe. Works worldwide." },
                    { id: "bank", title: "Bank transfer", note: "UK Faster Payments — no fees. We dispatch once the payment clears." },
                  ] as const
                ).map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer flex-col gap-1 rounded-lg border p-4 text-sm ${
                      paymentMethod === m.id ? "border-accent bg-accent-soft" : "border-border-strong bg-surface-2"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                      />
                      {m.title}
                    </span>
                    <span className="text-foreground-muted">{m.note}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "bank" && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-border-strong bg-surface-2 p-4 text-sm text-foreground-muted">
                  <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>
                    Place your order and we&rsquo;ll show you our bank details and a
                    payment reference. Pay by online or mobile banking and we
                    dispatch as soon as the payment clears.
                  </span>
                </div>
              )}
            </div>

            {status === "message" ? (
              <div className="rounded-xl border border-accent/30 bg-accent-soft p-6 text-sm text-foreground">
                <p>{message}</p>
                {bank && (
                  <dl className="mt-4 grid gap-2 rounded-lg border border-border-strong bg-surface p-4 sm:grid-cols-[auto_1fr] sm:gap-x-6">
                    <dt className="text-foreground-subtle">Account name</dt>
                    <dd className="font-semibold">{bank.accountName}</dd>
                    <dt className="text-foreground-subtle">Sort code</dt>
                    <dd className="font-semibold">{bank.sortCode}</dd>
                    <dt className="text-foreground-subtle">Account number</dt>
                    <dd className="font-semibold">{bank.accountNumber}</dd>
                    <dt className="text-foreground-subtle">Payment reference</dt>
                    <dd className="font-semibold">{reference}</dd>
                    <dt className="text-foreground-subtle">Amount</dt>
                    <dd className="font-semibold">&pound;{payTotal.toFixed(2)}</dd>
                  </dl>
                )}
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-4"
                  onClick={() => {
                    clear();
                    router.push("/parts");
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
              {error && (
                <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}
              <Button type="submit" size="lg" disabled={status === "submitting"}>
                {status === "submitting"
                  ? "Please wait..."
                  : paymentMethod === "card"
                    ? `Pay by Card — £${payTotal.toFixed(2)}`
                    : `Place Order — £${payTotal.toFixed(2)}`}
              </Button>
              </>
            )}
          </form>

          <div className="h-fit rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl">Order Summary</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {detailedLines.map(({ product, quantity, lineTotal }) => (
                <li key={product.slug} className="flex justify-between gap-2">
                  <span className="text-foreground-muted">
                    {product.name} &times; {quantity}
                  </span>
                  <span>&pound;{lineTotal.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm text-foreground-muted">
              <span>Subtotal</span>
              <span>&pound;{subtotal.toFixed(2)}</span>
            </div>
            {vatTotal > 0 && (
              <div className="mt-1 flex justify-between text-sm text-foreground-muted">
                <span>VAT</span>
                <span>&pound;{vatTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="mt-1 flex justify-between text-sm text-foreground-muted">
              <span>Delivery</span>
              <span>&pound;{deliveryCost.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
              <span>Total</span>
              <span>&pound;{payTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
