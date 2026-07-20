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

/**
 * Part-type and vehicle/engine tags inferred from the product name alone —
 * RRRShop's JSON doesn't give us a taxonomy, and their own description/spec
 * copy isn't ours to reuse, so this is pattern-matched from names only.
 */
const TAG_PATTERNS: [RegExp, string][] = [
  // Part type
  [/\bECU\b|\bEMU\b|plug[- ]in ecu|pnp ecu/i, "Aftermarket ECU"],
  [/\badu\b/i, "Dash Display"],
  [/\bpmu/i, "Power Management Unit"],
  [/wiring|loom/i, "Wiring/Loom"],
  [/adaptor|adapter/i, "Adaptor Harness"],
  [/keyboard|keypad/i, "Switch Panel"],
  [/comms cable|connection cable|dash cable|\bcable\b/i, "Cable"],
  [/lambda/i, "Wideband/Lambda"],
  [/\bgps\b|usb to can|serial bluetooth|canbus bluetooth|wheel speed to can/i, "CAN Module"],
  [/battery isolator/i, "Battery Isolator"],
  [/data logger|\bedl\b/i, "Data Logger"],
  [/steering wheel/i, "Steering Wheel"],
  [/digital gear|gear display/i, "Gear Display"],
  [/\bdbw\b/i, "Drive-By-Wire"],
  [/h-bridge/i, "H-Bridge Driver"],
  [/gdi driver/i, "GDI Driver"],
  [/vanos/i, "VANOS Adaptor"],
  [/potentiometer/i, "Potentiometer"],
  [/\bmount\b/i, "Mounting"],
  [/shirt/i, "Merchandise"],
  [/temperature camera/i, "IR Temperature Sensor"],
  [/\bmodule\b/i, "CAN Module"],
  [/\bsensor\b/i, "Sensor"],
  [/display|\bmfd\b/i, "Display"],
  [/\bswitch\b/i, "Switch"],

  // Vehicle / engine
  [/\bbmw\b|\be36\b|\bm50\b|\bs54\b/i, "BMW"],
  [/\btoyota\b|\bmr2\b|\bcelica\b|\bsupra\b|\b2jz\b|\b3sgte\b|\b1zz\b|\b2zz\b/i, "Toyota"],
  [/\bnissan\b|\brb20\b|\brb25\b|\brb26\b|\bsr20\b/i, "Nissan"],
  [/\bhonda\b|\bk20\b|\bcivic\b|\bintegra\b/i, "Honda"],
  [/\bford\b|fiesta st150/i, "Ford"],
  [/\bfiat\b|abarth|tjet/i, "Fiat"],
  [/\blotus\b|\belise\b|\bexige\b/i, "Lotus"],
  [/\bmini\b|\br50\b|\br53\b/i, "Mini"],
  [/\bvw\b|golf|volkswagen/i, "VW"],
  [/\baudi\b/i, "Audi"],
  [/\bsubaru\b/i, "Subaru"],
  [/\bmazda\b|\bmx5\b|\bmx-5\b/i, "Mazda"],
  [/\bmitsubishi\b|\bevo\b/i, "Mitsubishi"],
  [/\bvr6\b|1\.8t|\bbam\b|\bapy\b|\barx\b|\bary\b|\baum\b|\bauq\b/i, "VW/Audi VR6 & 1.8T"],
];

function deriveTags(name: string): string[] {
  const tags = new Set<string>();
  for (const [pattern, tag] of TAG_PATTERNS) {
    if (pattern.test(name)) tags.add(tag);
  }
  return Array.from(tags);
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
    brand: "EcuMaster",
    tags: deriveTags(item.name),
  };
}
