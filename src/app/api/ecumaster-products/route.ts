import { NextResponse } from "next/server";
import { getEcumasterProducts } from "@/lib/ecumaster-store";
import { toDisplayProduct } from "@/lib/ecumaster";

export async function GET() {
  const catalog = await getEcumasterProducts();
  return NextResponse.json({ products: catalog.products.map(toDisplayProduct) });
}
