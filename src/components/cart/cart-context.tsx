"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  detailedLines: { product: Product; quantity: number; lineTotal: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "spg-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen post-mount (it doesn't exist during
    // SSR) — starting `lines` empty and syncing here avoids a hydration
    // mismatch that a useState lazy initializer would cause instead.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = (slug: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { slug, quantity }];
    });
  };

  const removeItem = (slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  };

  const setQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug);
      return;
    }
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, quantity } : l)));
  };

  const clear = () => setLines([]);

  const detailedLines = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.slug === line.slug);
          if (!product) return null;
          return {
            product,
            quantity: line.quantity,
            lineTotal: product.price * line.quantity,
          };
        })
        .filter((l): l is { product: Product; quantity: number; lineTotal: number } => l !== null),
    [lines]
  );

  const itemCount = detailedLines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = detailedLines.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, setQuantity, clear, itemCount, subtotal, detailedLines }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
