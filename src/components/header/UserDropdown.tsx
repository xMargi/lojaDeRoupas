// src/components/UserDropdown.tsx
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function UserDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-bold hover:underline"
      >
        <span className="underline">ENTRAR</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg z-50 text-sm text-[#000000]">
          <button
            onClick={() => navigate("/login")}
            className="w-full text-left px-4 py-2 hover:bg-[#BC9977] hover:text-white transition"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate("/registro")}
            className="w-full text-left px-4 py-2 hover:bg-[#BC9977] hover:text-white transition"
          >
            Criar conta
          </button>
        </div>
      )}
    </div>
  )
}
