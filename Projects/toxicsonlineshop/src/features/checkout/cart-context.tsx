"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { products, type Product } from "@/content/products";

type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  detailedItems: Array<{ product: Product; quantity: number }>;
  count: number;
  total: number;
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "toxics-cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      setItems(JSON.parse(stored) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((slug: string) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === slug);
      if (existing) {
        return current.map((item) =>
          item.slug === slug
            ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
            : item
        );
      }
      return [...current, { slug, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((candidate) => candidate.slug === item.slug);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((item): item is { product: Product; quantity: number } => Boolean(item)),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      detailedItems,
      count: items.reduce((total, item) => total + item.quantity, 0),
      total: detailedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      addItem,
      removeItem,
      clear
    }),
    [addItem, clear, detailedItems, items, removeItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
