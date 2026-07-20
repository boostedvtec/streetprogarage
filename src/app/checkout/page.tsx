"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, CreditCard } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";

export default function CheckoutPage() {
  const { detailedLines, subtotal, vatTotal, grandTotal, lines, clear } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  const [status, setStatus] = useState<"idle" | "submitting" | "message">("idle");
  const [message, setMessage] = useState("");

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
        paymentMethod,
      }),
    });
    const data = await res.json();
    setMessage(data.message ?? "Something went wrong — please try again.");
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
              <h2 className="font-display text-xl">Payment Method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(["stripe", "paypal"] as const).map((method) => (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-sm font-medium ${
                      paymentMethod === method
                        ? "border-accent bg-accent-soft"
                        : "border-border-strong"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="accent-[color:var(--color-accent)]"
                    />
                    <CreditCard size={20} aria-hidden />
                    {method === "stripe" ? "Card (Stripe)" : "PayPal"}
                  </label>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-border-strong bg-surface-2 p-4 text-xs text-foreground-subtle">
                <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  Payment processing is not yet connected on this site. Add live
                  Stripe and PayPal API keys to enable real transactions.
                </span>
              </div>
            </div>

            {status === "message" ? (
              <div className="rounded-xl border border-accent/30 bg-accent-soft p-6 text-sm text-foreground">
                {message}
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
              <Button type="submit" size="lg" disabled={status === "submitting"}>
                {status === "submitting" ? "Processing..." : `Pay £${grandTotal.toFixed(2)}`}
              </Button>
            )}
          </form>

          <div className="h-fit rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-xl">Order Summary</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {detailedLines.map(({ product, quantity, lineGrandTotal }) => (
                <li key={product.slug} className="flex justify-between gap-2">
                  <span className="text-foreground-muted">
                    {product.name} &times; {quantity} (inc. VAT)
                  </span>
                  <span>&pound;{lineGrandTotal.toFixed(2)}</span>
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
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
              <span>Total</span>
              <span>&pound;{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
