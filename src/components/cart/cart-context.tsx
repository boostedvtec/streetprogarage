"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as staticProducts, type Product } from "@/lib/products";
import { vatAmount } from "@/lib/vat";

export type CartLine = {
  slug: string;
  quantity: number;
};

export type DetailedCartLine = {
  product: Product;
  quantity: number;
  /** Ex-VAT line total. */
  lineTotal: number;
  /** VAT on this line — applied to every product's price. */
  lineVat: number;
  /** lineTotal + lineVat. */
  lineGrandTotal: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  /** Ex-VAT subtotal across all lines. */
  subtotal: number;
  /** Total VAT across all lines — every product's price is treated as ex-VAT. */
  vatTotal: number;
  /** subtotal + vatTotal — the amount actually charged. */
  grandTotal: number;
  detailedLines: DetailedCartLine[];
  /** Static catalog merged with the live EcuMaster catalog. */
  allProducts: Product[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "spg-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [ecumasterProducts, setEcumasterProducts] = useState<Product[]>([]);

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

  useEffect(() => {
    fetch("/api/ecumaster-products")
      .then((res) => res.json())
      .then((data: { products?: Product[] }) => {
        setEcumasterProducts(data.products ?? []);
      })
      .catch(() => {
        // No live catalog available — the static products list still works fine.
      });
  }, []);

  const allProducts = useMemo(
    () => [...staticProducts, ...ecumasterProducts],
    [ecumasterProducts]
  );

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
          const product = allProducts.find((p) => p.slug === line.slug);
          if (!product) return null;
          const lineTotal = (product.price ?? 0) * line.quantity;
          const lineVat = vatAmount(lineTotal);
          return {
            product,
            quantity: line.quantity,
            lineTotal,
            lineVat,
            lineGrandTotal: lineTotal + lineVat,
          };
        })
        .filter((l): l is DetailedCartLine => l !== null),
    [lines, allProducts]
  );

  const itemCount = detailedLines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = detailedLines.reduce((sum, l) => sum + l.lineTotal, 0);
  const vatTotal = detailedLines.reduce((sum, l) => sum + l.lineVat, 0);
  const grandTotal = subtotal + vatTotal;

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        setQuantity,
        clear,
        itemCount,
        subtotal,
        vatTotal,
        grandTotal,
        detailedLines,
        allProducts,
      }}
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
