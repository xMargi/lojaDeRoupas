import { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void; // já soma 1 se existir
  removeItem: (id: string, size: string) => void; // remove totalmente
  decrementItem: (id: string, size: string) => void; // subtrai 1 ou remove
  clearCart: () => void;
  total: number; // ✅ novo campo
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(newItem: CartItem) {
    setItems((old) => {
      const exists = old.find((i) => i.id === newItem.id && i.size === newItem.size);
      if (exists) {
        return old.map((i) =>
          i.id === newItem.id && i.size === newItem.size
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...old, newItem];
    });
  }

  function decrementItem(id: string, size: string) {
    setItems((old) =>
      old
        .map((i) =>
          i.id === id && i.size === size ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(id: string, size: string) {
    setItems((old) => old.filter((i) => !(i.id === id && i.size === size)));
  }

  function clearCart() {
    setItems([]);
  }

  // ✅ Calcula o total com base nos items
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, decrementItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
