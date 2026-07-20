"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Wrench, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { ProductImagePlaceholder } from "@/components/product-tile";
import { useCart } from "@/components/cart/cart-context";
import { useRegion } from "@/components/region/region-context";

export default function PartsPage() {
  const { data } = useRegion();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [search, setSearch] = useState("");
  const { addItem, allProducts } = useCart();

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (!query) return true;
      const haystack = [p.name, p.brand, p.category, p.compatibility, ...(p.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [allProducts, activeCategory, search]);

  if (!data.services.parts) {
    return (
      <Section>
        <Container className="max-w-2xl text-center">
          <Wrench size={48} className="mx-auto text-foreground-subtle" aria-hidden />
          <h1 className="font-display mt-6 text-4xl">Parts Shop Not Available Here</h1>
          <p className="mt-4 text-foreground-muted">
            Our parts shop currently serves UK customers only. In{" "}
            {data.country}, we offer remote tuning, dyno tuning, custom
            wiring and ECU installation, and engine swaps/builds at our{" "}
            {data.city} workshop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/tuning" size="lg">
              Explore Tuning
            </LinkButton>
            <LinkButton href="/engine-swaps" size="lg" variant="secondary">
              Engine Swaps
            </LinkButton>
          </div>
        </Container>
      </Section>
    );
  }

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
          <div className="relative">
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search parts — try a brand, engine code or car (e.g. AEM, 4G63T, BMW)…"
              aria-label="Search parts"
              className="h-11 w-full rounded-md border border-border-strong bg-surface pl-10 pr-3 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-sm text-foreground-subtle">
              {visibleProducts.length} part{visibleProducts.length === 1 ? "" : "s"}
            </p>
            {activeCategory && (
              <Link
                href="/parts"
                className="inline-flex items-center gap-1 rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
              >
                {activeCategory}
                <X size={12} weight="bold" aria-hidden />
              </Link>
            )}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="mt-2 flex-1">
                    <p className="text-sm text-foreground-muted">{product.compatibility}</p>
                    {(product.brand || (product.tags && product.tags.length > 0)) && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.brand && (
                          <span className="rounded-full bg-graphite px-2.5 py-0.5 text-[11px] font-semibold text-graphite-foreground">
                            {product.brand}
                          </span>
                        )}
                        {product.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border-strong px-2.5 py-0.5 text-[11px] font-medium text-foreground-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-2xl">
                      {product.price === null ? "Ask for Pricing" : `£${product.price.toFixed(2)}`}
                      {product.price !== null && (
                        <span className="ml-1.5 block text-xs font-normal text-foreground-subtle">
                          excl. VAT
                        </span>
                      )}
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

          {visibleProducts.length === 0 && (
            <div className="mt-10 rounded-xl border border-dashed border-border-strong bg-surface p-12 text-center">
              <p className="text-foreground-muted">
                No parts found
                {search.trim() && ` for “${search.trim()}”`}
                {activeCategory && ` in ${activeCategory}`}.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
