"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";

export function ProductAddToCart({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      size="lg"
      onClick={() => {
        addItem(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? "Added to Cart" : "Add to Cart"}
    </Button>
  );
}
