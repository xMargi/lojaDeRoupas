// components/carousel/VideoCard.tsx

import { useInView } from '../../hooks/useInView'

interface VideoCardProps {
  videoUrl: string
  thumbUrl?: string
  titulo: string
  isMobile: boolean
  isLastItem: boolean
}

export function VideoCard({ videoUrl, thumbUrl, titulo, isMobile, isLastItem }: VideoCardProps) {
  const { ref, isInView } = useInView(0.5)

  const shouldShowThumb = isMobile || !isInView || isLastItem

  return (
    <div
      ref={ref}
      className="w-[450px] h-[527px] flex-shrink-0"
    >
      <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition w-full h-full">
        {shouldShowThumb ? (
          <img
            src={thumbUrl}
            alt={titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        )}
        <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-lg">
          {titulo}
        </div>
      </div>
    </div>
  )
}