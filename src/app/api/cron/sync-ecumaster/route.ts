import { NextResponse } from "next/server";
import { fetchEcumasterCatalog } from "@/lib/ecumaster";
import { saveEcumasterProducts } from "@/lib/ecumaster-store";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const products = await fetchEcumasterCatalog();
    const saved = await saveEcumasterProducts(products);

    if (!saved) {
      return NextResponse.json(
        {
          status: "skipped",
          message: "BLOB_READ_WRITE_TOKEN isn't set — catalog was fetched but not stored.",
          count: products.length,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      status: "ok",
      count: products.length,
      syncedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[sync-ecumaster] Sync failed", err);
    return NextResponse.json({ error: "Sync failed — see server logs." }, { status: 500 });
  }
}
