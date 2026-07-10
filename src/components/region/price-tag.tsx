"use client";

import { formatPrice } from "@/lib/region";
import { useRegion } from "@/components/region/region-context";

export function PriceTag({ amount }: { amount: number | null }) {
  const { region } = useRegion();
  return <>{formatPrice(amount, region)}</>;
}
