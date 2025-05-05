import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Product } from "@/data/products"
import { useUser } from "@/contexts/UserContext"
import axios from "axios"

interface FavoritesContextType {
  favorites: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn, user } = useUser()
  const [favorites, setFavorites] = useState<Product[]>([])
  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })

  // Carrega favoritos ao logar
  useEffect(() => {
    if (isLoggedIn && user) {
      api
        .get("/favorites")
        .then((res) => {
          const validProducts = res.data.filter(
            (p: Product | null) => p !== null
          );
          setFavorites(validProducts);
        })
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn, user]);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  async function addFavorite(product: Product) {
    try {
      await api.post(`/favorites/${product.id}`)
      setFavorites((prev) => {
        if (prev.some((p) => p.id === product.id)) return prev
        return [...prev, product]
      })
      showToast("Produto adicionado aos favoritos!", "success")
    } catch {
      showToast("Erro ao adicionar aos favoritos", "error")
    }
  }

  async function removeFavorite(productId: string) {
    try {
      await api.delete(`/favorites/${productId}`)
      setFavorites((prev) => prev.filter((p) => p.id !== productId))
      showToast("Produto removido dos favoritos", "error")
    } catch {
      showToast("Erro ao remover dos favoritos", "error")
    }
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-[9999] text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider")
  }
  return context
}
