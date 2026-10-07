"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section>
      <Container>
        <Eyebrow>Payment received</Eyebrow>
        <h1 className="font-display mt-4 text-4xl">Thank you — your order is confirmed</h1>
        <p className="mt-4 max-w-xl text-foreground-muted">
          Your card payment went through and Stripe will email your receipt. We&rsquo;ll be in
          touch shortly to confirm dispatch or booking details.
        </p>
        <Link href="/parts">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </Container>
    </Section>
  );
}
