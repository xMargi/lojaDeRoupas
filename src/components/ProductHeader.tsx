import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  X as CloseIcon,
  Heart,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ProductAside } from "@/components/aside/ProductAside";

export function ProductHeader() {
  const { items: cartItems, addItem, decrementItem, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { favorites } = useFavorites();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-[#09122C] shadow-md">
        <div className="w-10" />

        <Link to="/" className="mx-auto">
          <img
            src="/logoMaluPng.png"
            alt="Logo MonteLeste"
            className="h-10 object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Botão de Favoritos */}
          <button
            onClick={() => setIsFavoritesOpen(true)}
            className="relative p-1 hover:scale-110 transition"
            title="Favoritos"
          >
            <Heart
              size={26}
              className={`transition filter invert`}
            />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-2 text-[10px] bg-white text-red-500 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Botão do Carrinho */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1 hover:scale-110 transition"
          >
            <ShoppingBag size={28} className="filter invert cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-[11px] font-bold cursor-pointer">
              {cartItems.length}
            </span>
          </button>
        </div>
      </header>

      {/* Aside do Carrinho */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                Minha sacola ({cartItems.length})
              </h2>
              <button
                onClick={clearCart}
                className="text-sm text-gray-600 hover:underline"
              >
                Limpar sacola
              </button>
              <button onClick={() => setIsCartOpen(false)}>
                <CloseIcon size={24} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <ShoppingBag size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">
                  Poxa, sua sacola está vazia
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 border border-black hover:bg-black hover:text-white transition"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Tamanho: {item.size}
                      </p>
                      <p className="text-sm font-medium text-[#09122C]">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() =>
                          decrementItem(item.id, item.size)
                        }
                        className="px-2 py-1 hover:bg-gray-100 transition"
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          addItem({ ...item, quantity: 1 })
                        }
                        className="px-2 py-1 hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <>
                <div className="mt-4 border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <button className="mt-4 w-full bg-[#09122C] text-white py-3 rounded-lg font-semibold hover:bg-[#a9825e] transition">
                  Finalizar Pedido
                </button>
              </>
            )}
          </aside>
        </>
      )}

      {/* Aside de Favoritos */}
      {isFavoritesOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsFavoritesOpen(false)}
          />
          <ProductAside open={isFavoritesOpen} setOpen={setIsFavoritesOpen} />
        </>
      )}
    </>
  );
}
