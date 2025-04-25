import { useState } from "react"
import { ShoppingBag, Heart, Search, User as UserIcon } from "lucide-react"
import { useSearchHeader } from "@/hooks/useSearchHeader"
import { useUser } from "@/contexts/UserContext"
import { UserDropdown } from "./UserDropdown"
import { ShopSubmenu } from "./ShopPopOver"

export function Header() {
  const [query, setQuery] = useState("")
  const { handleSubmit } = useSearchHeader(query, setQuery)
  const { isLoggedIn, logout } = useUser()

  return (
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

          <Heart size={22} className="hover:scale-110 transition" />

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <UserIcon size={22} className="cursor-pointer hover:scale-110 transition" />
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm font-bold hover:underline"
                >
                  <span className="underline">LOGOUT</span>
                </button>
              </>
            ) : (
              <UserDropdown />
            )}
          </div>

          <div className="relative">
            <ShoppingBag size={24} className="hover:scale-110 transition" />
            <span className="absolute -top-1 -right-2 text-[11px] bg-white text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
