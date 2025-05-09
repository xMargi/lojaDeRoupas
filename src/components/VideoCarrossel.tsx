import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

interface VideoItem {
  id: number
  title: string
  url: string
}

export function VideoCarrossel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })
  const [videos, setVideos] = useState<VideoItem[]>([])
  const baseUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios.get(`${baseUrl}/videos`)
      .then((res) => setVideos(res.data))
      .catch(() => setVideos([]))
  }, [baseUrl])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="w-full py-16 bg-white relative overflow-hidden">
      <div className="max-w-[100vw] mx-auto">
        <h2 className="text-2xl font-bold mb-6 px-6">Coleções em Destaque</h2>

        <div className="relative">
          <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:scale-105 transition">
            <ChevronLeft size={20} />
          </button>
          <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:scale-105 transition">
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden px-0" ref={emblaRef}>
            <div className="flex gap-6">
              {videos.map((video) => (
                <div key={video.id} className="w-[450px] h-[527px] flex-shrink-0 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <video
                    src={`${baseUrl}${video.url}`}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    height={720}
                  />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-lg">
                    {video.title}
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
