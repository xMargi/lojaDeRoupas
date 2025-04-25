import { Facebook, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#BC9977] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        
        {/* Logo e nome */}
        <div className="flex flex-col items-start">
          <img src="/logoMalu.png" alt="Boldwear" className="h-10 w-auto mb-2" />
          <p className="opacity-80 max-w-xs">
            Moda urbana com essência. Estilo é atitude — e começa aqui.
          </p>
        </div>

        {/* Navegação */}
        <div className="flex flex-col gap-2 uppercase font-medium tracking-wide">
          <a href="#">Shop</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <a href="#">Trocas & Devoluções</a>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3">
          <p className="uppercase font-semibold text-sm mb-1">Nos siga</p>
          <div className="flex gap-4">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Linha e copyright */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Boldwear. Todos os direitos reservados.
      </div>
    </footer>
  )
}
