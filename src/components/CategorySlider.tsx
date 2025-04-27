// src/components/CategorySlider.tsx
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Product } from "@/data/products"
import { CategoryProductCard } from "./CategoryProductCard"

interface CategorySliderProps {
  title: string
  items: Product[]
  id?: string
}

export function CategorySlider({ title, items, id }: CategorySliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

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
