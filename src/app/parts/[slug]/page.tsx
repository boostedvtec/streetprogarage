import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products, type Product } from "@/lib/products";
import { getEcumasterProducts } from "@/lib/ecumaster-store";
import { toDisplayProduct } from "@/lib/ecumaster";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { ProductImagePlaceholder } from "@/components/product-tile";
import { LinkButton } from "@/components/ui/button";
import { displayPrice } from "@/lib/vat";
import { ProductAddToCart } from "./add-to-cart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/** Static products resolve instantly; EcuMaster products (synced separately) are looked up as a fallback. */
async function resolveProduct(slug: string): Promise<Product | undefined> {
  const staticMatch = getProductBySlug(slug);
  if (staticMatch) return staticMatch;

  const catalog = await getEcumasterProducts();
  const match = catalog.products.find((p) => p.slug === slug);
  return match ? toDisplayProduct(match) : undefined;
}

export async function generateMetadata(
  props: PageProps<"/parts/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await resolveProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Street PRO Garage`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/parts/[slug]">) {
  const { slug } = await props.params;
  const product = await resolveProduct(slug);

  if (!product) notFound();

  return (
    <Section>
      <Container>
        <Eyebrow>{product.category}</Eyebrow>
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <ProductImagePlaceholder className="aspect-square w-full rounded-xl" />
          <div>
            <h1 className="font-display text-4xl sm:text-5xl">{product.name}</h1>
            <p className="font-display mt-4 text-3xl text-accent">
              {product.price === null
                ? "Ask for Pricing"
                : `£${displayPrice(product.price, Boolean(product.exVat)).toFixed(2)}`}
            </p>
            {product.exVat && product.price !== null && (
              <p className="mt-1 text-sm text-foreground-subtle">
                £{product.price.toFixed(2)} + VAT
              </p>
            )}
            <p className="mt-6 text-foreground-muted leading-relaxed">
              {product.description}
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Compatibility:</dt>
                <dd className="text-foreground-muted">{product.compatibility}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-foreground">Fitting:</dt>
                <dd className="text-foreground-muted">
                  {product.fitting
                    ? "Professional fitting available — request at checkout or via the quote form."
                    : "Supplied part only."}
                </dd>
              </div>
            </dl>
            <div className="mt-8">
              {product.price === null ? (
                <LinkButton href="/contact" size="lg">
                  Enquire for Pricing
                </LinkButton>
              ) : (
                <ProductAddToCart slug={product.slug} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
