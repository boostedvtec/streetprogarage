import { put, head, BlobNotFoundError } from "@vercel/blob";
import type { EcumasterProduct } from "./ecumaster";

const BLOB_PATH = "ecumaster-products.json";

type StoredCatalog = {
  products: EcumasterProduct[];
  syncedAt: string;
};

/** Overwrites the stored EcuMaster catalog. No-ops (returns false) if Blob isn't configured. */
export async function saveEcumasterProducts(products: EcumasterProduct[]): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return false;

  const payload: StoredCatalog = { products, syncedAt: new Date().toISOString() };
  await put(BLOB_PATH, JSON.stringify(payload), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60, // short cache — a fresher sync should show up quickly
  });
  return true;
}

/** Reads the currently stored EcuMaster catalog. Returns an empty catalog if not yet synced or Blob isn't configured. */
export async function getEcumasterProducts(): Promise<StoredCatalog> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { products: [], syncedAt: "" };

  try {
    const blob = await head(BLOB_PATH);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return { products: [], syncedAt: "" };
    return (await res.json()) as StoredCatalog;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return { products: [], syncedAt: "" };
    console.error("[ecumaster-store] Failed to read catalog", err);
    return { products: [], syncedAt: "" };
  }
}
