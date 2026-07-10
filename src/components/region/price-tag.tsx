"use client";

import { formatRegionPrice, type RegionPrice } from "@/lib/region";
import { useRegion } from "@/components/region/region-context";

export function PriceTag({ price }: { price: RegionPrice }) {
  const { region } = useRegion();
  return <>{formatRegionPrice(price, region)}</>;
}
