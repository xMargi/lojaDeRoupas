import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface VideoItem {
  titulo: string
  videoUrl: string
  thumbUrl?: string
  link?: string
}

const videos: VideoItem[] = [
  {
    titulo: 'Coleção Surpresa',
    videoUrl: '/videos/1.mp4',
  },
  {
    titulo: 'Boldwear x NFL',
    videoUrl: '/videos/1.mp4',
  },
  {
    titulo: 'Boldwear x Sprite',
    videoUrl: '/videos/1.mp4',
  },
  {
    titulo: 'Coleção Surpresa',
    videoUrl: '/videos/1.mp4',
  },
  {
    titulo: 'Boldwear x NFL',
    videoUrl: '/videos/1.mp4',
  },
  {
    titulo: 'Boldwear x Sprite',
    videoUrl: '/videos/1.mp4',
  },
]

export function VideoCarrossel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="w-full py-16 bg-white relative overflow-hidden">
      <div className="max-w-[100vw] mx-auto">
        <h2 className="text-2xl font-bold mb-6 px-6">Coleções em Destaque</h2>

        <div className="relative">
          {/* Botões */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:scale-105 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:scale-105 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carrossel */}
          <div className="overflow-hidden px-0" ref={emblaRef}>
            <div className="flex gap-6">
              {videos.map((video, index) => (
                <div key={index} className="w-[450px] h-[527px] flex-shrink-0 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    height={720}
                  />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-lg">
                    {video.titulo}
                  </div>
                  {video.link && (
                    <a
                      href={video.link}
                      className="absolute bottom-4 right-4 px-3 py-1 border border-white text-white text-xs uppercase tracking-wide hover:bg-white hover:text-black transition"
                    >
                      Shop now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
