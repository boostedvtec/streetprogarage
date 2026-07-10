"use client";

import { useState } from "react";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { ProductImagePlaceholder } from "@/components/product-tile";
import { products, categories } from "@/lib/products";
import { useCart } from "@/components/cart/cart-context";

export default function PartsPage() {
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");
  const { addItem } = useCart();

  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="border-b border-border bg-surface/50">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Shop</Eyebrow>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">
            Performance Parts
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Every part below is available with professional fitting and full
            diagnostics. Not sure what you need? Submit your build list and
            we&rsquo;ll recommend the right parts for your goals.
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === "All"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border-strong bg-surface text-foreground-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border-strong bg-surface text-foreground-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <div
                key={product.slug}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
              >
                <Link href={`/parts/${product.slug}`}>
                  <ProductImagePlaceholder className="aspect-[4/3] w-full" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {product.category}
                  </span>
                  <Link href={`/parts/${product.slug}`}>
                    <h2 className="font-display mt-2 text-xl hover:text-accent">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="mt-2 flex-1 text-sm text-foreground-muted">
                    {product.compatibility}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-2xl">
                      {product.price === null ? "Ask for Pricing" : `£${product.price}`}
                    </span>
                    {product.price === null ? (
                      <Link
                        href="/contact"
                        className="cursor-pointer rounded-md border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
                      >
                        Enquire
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addItem(product.slug)}
                        className="cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
