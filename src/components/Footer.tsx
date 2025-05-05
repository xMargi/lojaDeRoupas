// src/components/Footer.tsx

export function Footer() {
  return (
    <footer className="w-full bg-[#09122C] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-semibold uppercase">
            Registre-se para ganhar descontos exclusivos:
          </h3>
          <form className="space-y-2">
            <input
              type="text"
              placeholder="Nome"
              className="w-full border-b border-white/60 bg-transparent placeholder-white focus:outline-none py-1"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full border-b border-white/60 bg-transparent placeholder-white focus:outline-none py-1"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-white text-[#09122C] py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Inscrever-se
            </button>
          </form>
          <p className="text-xs opacity-80">
            Ao enviar você concorda com os termos descritos na{" "}
            <a href="#" className="underline">
              Política de Privacidade
            </a>
          </p>
        </div>

        {/* Sobre */}
        <div className="space-y-2">
          <h4 className="font-semibold uppercase">Sobre</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Quem Somos</a></li>
            <li><a href="#" className="hover:underline">Perguntas Frequentes</a></li>
            <li><a href="#" className="hover:underline">Nossas Lojas</a></li>
            <li><a href="#" className="hover:underline">Coleções</a></li>
          </ul>
        </div>

        {/* Meus Dados */}
        <div className="space-y-2">
          <h4 className="font-semibold uppercase">Meus Dados</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Minha Conta</a></li>
            <li><a href="#" className="hover:underline">Meus Pedidos</a></li>
            <li><a href="#" className="hover:underline">Lista de Desejos</a></li>
            <li><a href="#" className="hover:underline">Trocas & Devoluções</a></li>
          </ul>
        </div>

        {/* Políticas */}
        <div className="space-y-2">
          <h4 className="font-semibold uppercase">Políticas</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Trocas e Devoluções</a></li>
            <li><a href="#" className="hover:underline">Entrega e Frete</a></li>
            <li><a href="#" className="hover:underline">Pagamento</a></li>
            <li><a href="#" className="hover:underline">Privacidade</a></li>
            <li><a href="#" className="hover:underline">Termos de Uso</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div className="space-y-2">
          <h4 className="font-semibold uppercase">Contato</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Fale Conosco</a></li>
            <li>(11) 3035-0520</li>
            <li>
              <a href="mailto:atendimento@boldwear.com" className="hover:underline">
                atendimento@boldwear.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social + Segurança */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-10 border-t border-white/30 pt-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <a href="#"><img src="/icons/instagram.svg" alt="Instagram" className="h-5 w-5 filter invert" /></a>
          <a href="#"><img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5 filter invert" /></a>
          <a href="#"><img src="/icons/x.svg" alt="X" className="h-5 w-5 filter invert" /></a>
        </div>
        <div>
          <img src="/icons/googleSafeBrowser.svg" alt="Google Safe Browsing" className="h-6" />
        </div>
      </div>

      {/* Bandeiras de cartão + PIX */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img src="/icons/visa.svg" alt="Visa" className="h-6 filter invert" />
          <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6" />
          <img src="/icons/elo.svg" alt="Elo" className="h-6" />
          <img src="/icons/hipercard.svg" alt="Hipercard" className="h-6" />
          <img src="/icons/pix.svg" alt="Pix" className="h-6 filter invert" />
        </div>
        <p className="text-xs opacity-80">
          © {new Date().getFullYear()} BW BoldWear Company LTDA • CNPJ 60.615.601/0001-30
        </p>
      </div>
    </footer>
  )
}
