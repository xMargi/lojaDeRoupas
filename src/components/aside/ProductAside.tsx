import { Heart, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Link } from "react-router-dom";

interface ProductAsideProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ProductAside({ open, setOpen }: ProductAsideProps) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <>
      {/* Botão Flutuante */}
      <div className="fixed bottom-6 right-6 z-40 select-none">
        <button
          onClick={() => setOpen(true)}
          className="bg-white shadow-lg rounded-full p-4 hover:bg-[#09122C] transition"
          title="Favoritos"
        >
          <Heart className="text-[#09122C] hover:text-white transition" size={28} />
        </button>
      </div>

      {/* Aside */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 p-6 flex flex-col gap-6 z-50"
          >
            {/* Botão fechar */}
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-gray-500 hover:text-[#09122C] transition"
            >
              <X size={24} />
            </button>

            <div className="flex-1 overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">Seus Favoritos</h2>

              {favorites.length === 0 ? (
                <div className="text-sm text-gray-500">
                  Você ainda não adicionou produtos aos favoritos.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {favorites.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 transition"
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 flex-1"
                        onClick={() => setOpen(false)}
                      >
                        <img
                          src={product.imagem || "/placeholder.png"}
                          alt={product.nome || "Produto"}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <span className="text-sm font-medium">{product.nome || "Sem nome"}</span>
                      </Link>

                      <button
                        onClick={() => removeFavorite(product.id)}
                        title="Remover"
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
