import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/lib/products";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { ProductImagePlaceholder } from "@/components/product-tile";
import { LinkButton } from "@/components/ui/button";
import { ProductAddToCart } from "./add-to-cart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/parts/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Street PRO Garage`,
    description: product.description,
  };
}

export default async function ProductPage(props: PageProps<"/parts/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

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
              {product.price === null ? "Ask for Pricing" : `£${product.price}`}
            </p>
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
