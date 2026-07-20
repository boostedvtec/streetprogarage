/**
 * Pulls EcuMaster's in-stock catalog from RRRShop's public Shopify storefront
 * JSON API (explicitly crawlable per their robots.txt — no login, no
 * scraping their authenticated dealer view). Only names, prices and stock
 * status are used — never their product descriptions or photos, which are
 * their copyrighted content.
 */

import type { Product } from "./products";

export type EcumasterProduct = {
  slug: string;
  name: string;
  /** Carried over 1:1 from RRRShop's own (VAT-inclusive) price — used as our ex-VAT base price. */
  priceExVat: number;
  sourceHandle: string;
};

type ShopifyVariant = {
  title: string;
  price: string;
  available: boolean;
};

type ShopifyProduct = {
  title: string;
  handle: string;
  variants: ShopifyVariant[];
};

type ShopifyCollectionResponse = {
  products: ShopifyProduct[];
};

const COLLECTION_URL = "https://rrrshop.co.uk/collections/ecumaster/products.json";
const PAGE_LIMIT = 250;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchPage(page: number): Promise<ShopifyProduct[]> {
  const url = `${COLLECTION_URL}?limit=${PAGE_LIMIT}&page=${page}`;
  const res = await fetch(url, {
    headers: { "user-agent": "StreetProGarageCatalogSync/1.0" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`RRRShop catalog fetch failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as ShopifyCollectionResponse;
  return data.products;
}

/** Fetches every page of the EcuMaster collection (Shopify caps each page at 250 products). */
async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const all: ShopifyProduct[] = [];
  for (let page = 1; page <= 20; page++) {
    const products = await fetchPage(page);
    if (products.length === 0) break;
    all.push(...products);
    if (products.length < PAGE_LIMIT) break;
  }
  return all;
}

/** Fetches the current in-stock EcuMaster catalog, one entry per in-stock variant. */
export async function fetchEcumasterCatalog(): Promise<EcumasterProduct[]> {
  const products = await fetchAllProducts();
  const items: EcumasterProduct[] = [];

  for (const product of products) {
    for (const variant of product.variants) {
      if (!variant.available) continue;
      const isDefault = variant.title === "Default Title";
      const name = isDefault ? product.title : `${product.title} — ${variant.title}`;
      const slug = `ecumaster-${product.handle}${isDefault ? "" : `-${slugify(variant.title)}`}`;
      items.push({
        slug,
        name,
        priceExVat: Number(variant.price),
        sourceHandle: product.handle,
      });
    }
  }

  return items;
}

/** Maps a synced EcuMaster catalog entry into the shared Product shape used across the site. */
export function toDisplayProduct(item: EcumasterProduct): Product {
  return {
    slug: item.slug,
    name: item.name,
    category: "Engine Management",
    price: item.priceExVat,
    description: `${item.name} — genuine EcuMaster hardware, available to order.`,
    fitting: true,
    compatibility: "EcuMaster ecosystem — confirm compatibility before ordering",
    exVat: true,
  };
}
