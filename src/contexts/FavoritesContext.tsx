import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useUser } from "@/contexts/UserContext"
import axios from "axios"
import { Product } from "@/types/product"
import { ProductFromAPI } from "@/types/api" // ✅ tipo correto da API

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

 function mapApiToProduct(data: ProductFromAPI): Product {
  return {
    id: String(data.id),
    nome: data.name,
    preco: `R$ ${data.price.toFixed(2).replace(".", ",")}`,
    imagem: data.imagePath.startsWith("http")
      ? data.imagePath
      : `${import.meta.env.VITE_API_URL}${data.imagePath}`,
    images: [data.imagePath],
    sizes: ["P", "M", "G", "GG"],
    description: data.description,
  }
}

  useEffect(() => {
    if (isLoggedIn && user) {
      api
        .get("/favorites")
        .then((res) => {
          const parsed = res.data
            .filter((p: ProductFromAPI | null) => p !== null)
            .map((p: ProductFromAPI) => mapApiToProduct(p));
          setFavorites(parsed);
        })
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn, user])

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

 async function addFavorite(product: Product) {
  try {
    await api.post(`/favorites/${product.id}`); // ← salva no banco

    const baseUrl = import.meta.env.VITE_API_URL;

    const imageUrl = product.imagem.startsWith("http")
      ? product.imagem
      : `${baseUrl}${product.imagem.startsWith("/") ? "" : "/"}${product.imagem}`;

    const productWithFullUrl = { ...product, imagem: imageUrl };

    setFavorites((old) => {
      const alreadyExists = old.some((p) => p.id === product.id);
      if (alreadyExists) return old;
      return [...old, productWithFullUrl];
    });

    showToast("Produto adicionado aos favoritos", "success");
  } catch {
    showToast("Erro ao adicionar aos favoritos", "error");
  }
}
  

  async function removeFavorite(productId: string) {
    try {
      await api.delete(`/favorites/${productId}`);
      setFavorites((prev) =>
        prev.filter((p) => String(p.id) !== String(productId))
      );
      showToast("Produto removido dos favoritos", "error");
    } catch {
      showToast("Erro ao remover dos favoritos", "error");
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
