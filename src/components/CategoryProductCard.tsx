// src/components/CategoryProductCard.tsx
import { useState } from "react"
import { Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/contexts/UserContext"
import { useCart, CartItem } from "@/contexts/CartContext"
import { Product } from "@/data/products"

interface CategoryProductCardProps {
  produto: Product
}

export function CategoryProductCard({ produto }: CategoryProductCardProps) {
  const navigate = useNavigate()
  const { isLoggedIn } = useUser()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [animate, setAnimate] = useState(false)
  const tamanhos = ["P", "M", "G", "GG"]

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) return navigate("/login")
    setIsFavorited(!isFavorited)
    setAnimate(true)
    setTimeout(() => setAnimate(false), 300)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) return navigate("/login")
    if (!selectedSize) {
      alert("Selecione um tamanho antes de adicionar.")
      return
    }
    const numericPrice = Number(
      produto.preco
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim()
    )
    const item: CartItem = {
      id: produto.id,
      name: produto.nome,
      price: numericPrice,
      image: produto.imagem,
      size: selectedSize,
      quantity: 1,
    }
    addItem(item)
  }

  return (
    <div
      onClick={() => navigate(`/product/${produto.id}`)}
      className="min-w-[240px] max-w-[260px] shrink-0 relative group bg-white border shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <button
          onClick={handleFavorite}
          className={`absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow hover:scale-110 transition ${
            animate ? "animate-[pingOnce_0.3s_ease-out]" : ""
          }`}
        >
          <Heart
            size={20}
            fill={isFavorited ? "red" : "none"}
            color={isFavorited ? "red" : "black"}
          />
        </button>

        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-white/95 px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          <div className="flex justify-center gap-2 mb-3">
            {tamanhos.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedSize(size)
                }}
                className={`w-8 h-8 border text-sm font-semibold transition ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white text-xs py-2 uppercase hover:bg-zinc-800 transition"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-base font-semibold">{produto.nome}</h3>
        <p className="text-base text-[#BC9977] font-medium">{produto.preco}</p>
      </div>
    </div>
  )
}
