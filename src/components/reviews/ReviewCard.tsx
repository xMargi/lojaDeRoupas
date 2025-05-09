// src/components/reviews/ReviewCard.tsx
import { RatingStars } from "./RatingStars"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'

interface ReviewCardProps {
  name?: string
  rating: number
  comment?: string
  date: string
  images?: string[]
}

export function ReviewCard({ name = "Cliente", rating, comment, date, images }: ReviewCardProps) {
  const formattedDate = format(new Date(date), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  })

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-[#09122C]">{name}</p>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <RatingStars rating={rating} size={18} />
      </div>

      {comment && <p className="text-sm text-gray-700">{comment}</p>}

      {images && images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {images.map((url, index) => (
            <img
              key={index}
              src={url.startsWith("http") ? url : `${import.meta.env.VITE_API_URL}${url}`}
              alt={`Review ${index}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  )
}
