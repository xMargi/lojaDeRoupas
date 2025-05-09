import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axios from "axios"

import { CategoryProductCard } from "./CategoryProductCard"
import type { Product } from "@/types/product";
import { ProductFromAPI } from "@/types/api"

interface CategorySliderProps {
  title: string;
  id?: string;
  items: Product[]; 
}
export function CategorySlider({ title, id }: CategorySliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [items, setItems] = useState<Product[]>([])

  const baseUrl = import.meta.env.VITE_API_URL

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    axios.get(`${baseUrl}/products`).then((res) => {
      const parsed = (res.data.products as ProductFromAPI[]).map((p) => ({
        id: String(p.id),
        nome: p.name,
        preco: `R$ ${p.price.toFixed(2).replace(".", ",")}`,
        imagem: p.imagePath,
        images: [p.imagePath],
        sizes: ["P", "M", "G", "GG"],
        description: p.description,
      }))
      setItems(parsed)
    })
  }, [baseUrl])

  return (
    <section id={id} className="w-full px-4 md:px-8 py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {items.map((produto) => (
            <CategoryProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  )
}
