// src/contexts/CartContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import axios from "axios"
import { useUser } from "./UserContext"

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number, size: string) => void
  decrementItem: (id: number, size: string) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useUser()
  const [items, setItems] = useState<CartItem[]>([])

  const baseUrl = import.meta.env.VITE_API_URL

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  useEffect(() => {
    if (isLoggedIn) {
      api
        .get("/cart")
        .then((res) => {
          const parsed = res.data.map((item: {
            productId: number;
            product: {
              name: string;
              price: number;
              imagePath: string;
            };
            size: string;
            quantity: number;
          }) => ({
            id: item.productId,
            title: item.product.name,
            price: item.product.price,
            image: `${baseUrl}${item.product.imagePath.startsWith("/") ? "" : "/"}${item.product.imagePath}`,
            size: item.size,
            quantity: item.quantity,
          }))
          setItems(parsed)
        })
        .catch(() => setItems([]))
    } else {
      setItems([])
    }
  }, [isLoggedIn])

  function addItem(newItem: CartItem) {
    const baseUrl = import.meta.env.VITE_API_URL;
  
    const imageUrl = newItem.image.startsWith("http")
      ? newItem.image
      : `${baseUrl}${newItem.image.startsWith("/") ? "" : "/"}${newItem.image}`;
  
    const newItemWithUrl = { ...newItem, image: imageUrl };
  
    setItems((old) => {
      const exists = old.find(
        (i) => i.id === newItem.id && i.size === newItem.size
      );
  
      if (exists) {
        return old.map((i) =>
          i.id === newItem.id && i.size === newItem.size
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
  
      return [...old, newItemWithUrl];
    });
  
    api.post("/cart", {
      productId: newItem.id,
      quantity: newItem.quantity,
      size: newItem.size,
    });
  }
  

  function decrementItem(id: number, size: string) {
    setItems((old) => {
      const item = old.find((i) => i.id === id && i.size === size);
      if (!item) return old;
  
      if (item.quantity > 1) {
        const updated = old.map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
  
        api.put(`/cart/${item.id}`, {
          quantity: item.quantity - 1,
          size: item.size,
        });
  
        return updated;
      } else {
        // quantidade 1 → remover
        api.delete("/cart", {
          data: { productId: id, size },
        });
  
        return old.filter((i) => !(i.id === id && i.size === size));
      }
    });
  }

  function removeItem(id: number, size: string) {
    setItems((old) => old.filter((i) => !(i.id === id && i.size === size)));
  
    api.delete("/cart", {
      data: { productId: id, size },
    });
  }

  function clearCart() {
    setItems([]);
    api.delete("/cart/all");
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, decrementItem, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
