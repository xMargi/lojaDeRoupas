import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface CategoryItem {
  id: string
  name: string
  price: string
  image: string
}

interface CategorySliderProps {
  title: string
  items: CategoryItem[]
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

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const minItems = 8
  const duplicatedItems = [...items]
  while (duplicatedItems.length < minItems) {
    duplicatedItems.push(...items.slice(0, minItems - duplicatedItems.length))
  }

  return (
    <section id={id} className="w-full px-4 md:px-8 py-14 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex gap-2 z-10">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {duplicatedItems.map((item, index) => (
            <div
              key={item.id + index}
              className="min-w-[240px] max-w-[260px] shrink-0 bg-white border shadow-md hover:shadow-lg transition"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-semibold">{item.name}</h3>
                <p className="text-base text-[#BC9977] font-medium">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
