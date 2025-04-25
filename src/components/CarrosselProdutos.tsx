import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Produto {
  nome: string
  preco: string
  imagem: string
}

const produtos: Produto[] = [
  { nome: "Camiseta Básica", preco: "R$ 89,90", imagem: "/produtos9_16/1.png" },
  { nome: "Moletom Oversized", preco: "R$ 149,90", imagem: "/produtos9_16/2.png" },
  { nome: "Tênis Street", preco: "R$ 299,90", imagem: "/produtos9_16/3.png" },
  { nome: "Jaqueta Windbreaker", preco: "R$ 199,90", imagem: "/produtos9_16/1.png" },
  { nome: "Boné Estampado", preco: "R$ 59,90", imagem: "/produtos9_16/2.png" },
  { nome: "Calça Jogger", preco: "R$ 139,90", imagem: "/produtos9_16/3.png" },
  // ...
]

export function CarrosselProdutos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="w-full py-16 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Lançamentos</h2>

        <div className="relative">
          {/* Botões */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full hover:scale-105 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full hover:scale-105 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carrossel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {produtos.map((produto, index) => (
                <div key={index} className="min-w-[200px] max-w-[220px] flex-shrink-0">
                  <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-sm font-semibold">{produto.nome}</h3>
                      <p className="text-sm text-[#BC9977] font-medium">{produto.preco}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
