"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { MenuItem } from "@/lib/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: MenuItem) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((item: MenuItem) => {
    setLines((prev) => {
      const found = prev.find((l) => l.item.id === item.id);
      if (found) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }, []);

  const inc = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((l) => (l.item.id === id ? { ...l, qty: l.qty + 1 } : l)),
    );
  }, []);

  const dec = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.item.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, total } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const l of lines) {
      count += l.qty;
      total += l.qty * l.item.price;
    }
    return { count, total };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    total,
    open,
    setOpen,
    add,
    inc,
    dec,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
