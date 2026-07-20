"use client";

import Link from "next/link";
import { Trash, Minus, Plus, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { ProductImagePlaceholder } from "@/components/product-tile";
import { useCart } from "@/components/cart/cart-context";
import { displayPrice } from "@/lib/vat";

export default function CartPage() {
  const { detailedLines, setQuantity, removeItem, subtotal, vatTotal, grandTotal, itemCount } =
    useCart();

  return (
    <Section>
      <Container>
        <Eyebrow>Your Cart</Eyebrow>
        <h1 className="font-display mt-4 text-5xl">
          Cart {itemCount > 0 && `(${itemCount})`}
        </h1>

        {detailedLines.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border-strong bg-surface p-12 text-center">
            <p className="text-foreground-muted">Your cart is empty.</p>
            <LinkButton href="/parts" className="mt-6 inline-flex">
              Browse Parts
            </LinkButton>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <ul className="flex flex-col gap-4">
              {detailedLines.map(({ product, quantity, lineGrandTotal }) => (
                <li
                  key={product.slug}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-4"
                >
                  <ProductImagePlaceholder className="h-24 w-24 shrink-0 rounded-lg" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/parts/${product.slug}`}
                          className="font-semibold hover:text-accent"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-foreground-muted">
                          {product.price === null
                            ? "Ask for pricing"
                            : `£${displayPrice(product.price, Boolean(product.exVat)).toFixed(2)} each${
                                product.exVat ? " (inc. VAT)" : ""
                              }`}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={`Remove ${product.name} from cart`}
                        className="cursor-pointer text-foreground-subtle hover:text-error"
                      >
                        <Trash size={20} aria-hidden />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-md border border-border-strong">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-9 w-9 cursor-pointer items-center justify-center text-foreground-muted hover:text-foreground"
                        >
                          <Minus size={14} aria-hidden />
                        </button>
                        <span className="min-w-4 text-center text-sm">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(product.slug, quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-9 w-9 cursor-pointer items-center justify-center text-foreground-muted hover:text-foreground"
                        >
                          <Plus size={14} aria-hidden />
                        </button>
                      </div>
                      <span className="font-display text-xl">&pound;{lineGrandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="h-fit rounded-xl border border-border bg-surface p-6">
              <h2 className="font-display text-xl">Order Summary</h2>
              <div className="mt-4 flex justify-between text-sm text-foreground-muted">
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
              <p className="mt-2 text-xs text-foreground-subtle">
                Fitting labour and shipping are quoted at checkout.
              </p>
              <LinkButton href="/checkout" size="lg" className="mt-6 w-full">
                Checkout
                <ArrowRight size={18} weight="bold" aria-hidden />
              </LinkButton>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
