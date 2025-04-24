import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface CategorySliderProps {
  title: string
  images: string[]
  id?: string  
}

export function CategorySlider({ title, images, id }: CategorySliderProps) {
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
  const duplicatedImages = [...images]
  while (duplicatedImages.length < minItems) {
    duplicatedImages.push(...images.slice(0, minItems - duplicatedImages.length))
  }

  return (
    <section id={id} className="w-full px-4 md:px-8 py-12 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>

        <div className="flex gap-2 z-10">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="min-w-[250px] max-w-[250px] h-[300px] rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
