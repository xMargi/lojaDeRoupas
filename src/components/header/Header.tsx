import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  User as UserIcon,
  X as CloseIcon,
} from "lucide-react";
import { useSearchHeader } from "@/hooks/useSearchHeader";
import { useUser } from "@/contexts/UserContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { UserDropdown } from "./UserDropdown";
import { ShopSubmenu } from "./ShopPopOver";
import { ProductAside } from "@/components/aside/ProductAside";

export function Header() {
  const [query, setQuery] = useState("");
  const { handleSubmit } = useSearchHeader(query, setQuery);
  const { isLoggedIn, logout } = useUser();
  const { items: cartItems, addItem, decrementItem, clearCart } = useCart();
  const { favorites } = useFavorites();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // calcula o total do carrinho
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <header className="absolute top-0 left-0 w-full px-6 py-4 z-50 bg-transparent hover:bg-[#BC9977] transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="h-8 md:h-10 flex items-center">
            <img
              src="/logoMaluPng.png"
              alt="Logo"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Menu */}
          <nav className="hidden md:flex gap-6 text-white text-base uppercase items-center">
            <ShopSubmenu />
            <a href="#" className="hover:underline">Collections</a>
            <a href="#" className="text-red-500 font-semibold hover:underline">Sale</a>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-6 text-white text-base">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Procurar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent border-b border-white/30 focus:outline-none focus:border-white text-sm placeholder-white/50 w-32"
              />
              <button type="submit">
                <Search size={22} className="cursor-pointer hover:scale-110 transition" />
              </button>
            </form>

            {/* Botão de Favoritos */}
            <button
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-1 hover:scale-110 transition"
              title="Favoritos"
            >
              <Heart
                size={24}
                className={`transition text-white`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-white text-red-500 rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Usuário */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <UserIcon size={22} className="cursor-pointer hover:scale-110 transition" />
                  <button onClick={logout} className="flex items-center gap-1 text-sm font-bold hover:underline">
                    <span className="underline">LOGOUT</span>
                  </button>
                </>
              ) : (
                <UserDropdown />
              )}
            </div>

            {/* Carrinho */}
            <button onClick={() => setIsCartOpen(true)} className="relative p-1 hover:scale-110 transition">
              <ShoppingBag size={24} />
              <span className="absolute -top-1 -right-2 text-[11px] bg-white text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Aside do Carrinho */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          {/* Aside */}
          <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Minha sacola ({cartItems.length})</h2>
              <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">
                Limpar sacola
              </button>
              <button onClick={() => setIsCartOpen(false)}>
                <CloseIcon size={24} />
              </button>
            </div>

            {/* Itens do Carrinho */}
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <ShoppingBag size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Poxa, sua sacola está vazia</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 border border-black hover:bg-black hover:text-white transition"
                >
                  Continuar comprando
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                      <p className="text-sm font-medium text-[#BC9977]">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => decrementItem(item.id, item.size)}
                        className="px-2 py-1 hover:bg-gray-100 transition"
                      >
                        −
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => addItem({ ...item, quantity: 1 })}
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
                  <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
                </div>
                <button className="mt-4 w-full bg-[#BC9977] text-white py-3 rounded-lg font-semibold hover:bg-[#a9825e] transition">
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
          {/* Backdrop */}
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
