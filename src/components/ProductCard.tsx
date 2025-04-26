import { useState } from "react"
import { Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/contexts/UserContext"
import { useCart, CartItem } from "@/contexts/CartContext"

interface Produto {
  id: string
  nome: string
  preco: string    // <— continua string
  imagem: string
}

interface ProductCardProps {
  produto: Produto
}

export function ProductCard({ produto }: ProductCardProps) {
  const navigate = useNavigate()
  const { isLoggedIn } = useUser()
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isFavorited, setIsFavorited] = useState(false)
  const [animate, setAnimate] = useState(false)
  const tamanhos = ["P", "M", "G", "GG"]

  const handleFavorite = () => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
    setIsFavorited(!isFavorited)
    setAnimate(true)
    setTimeout(() => setAnimate(false), 300)
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
    if (!selectedSize) {
      alert("Selecione um tamanho antes de adicionar.")
      return
    }
    // converter preco string em número (ex: "R$ 89,90" -> 89.90)
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
    <div className="min-w-[200px] max-w-[220px] flex-shrink-0 group relative">
      <div className="bg-white border shadow-md transition overflow-hidden relative">
        <div className="aspect-[3/4] relative">
          <button
            key={animate ? "animate" : "static"}
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

          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
            <div className="text-center text-sm font-medium text-gray-700">
              Selecione o tamanho
            </div>
            <div className="flex justify-center gap-2 my-2">
              {tamanhos.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
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
              className="mt-2 bg-black text-white text-xs uppercase py-2 w-full transition hover:bg-zinc-800"
            >
              Adicionar à sacola
            </button>
          </div>
        </div>

        <div className="p-3 text-center">
          <h3 className="text-sm font-semibold">{produto.nome}</h3>
          <p className="text-sm text-[#BC9977] font-medium">
            {produto.preco}
          </p>
        </div>
      </div>
    </div>
  )
}
