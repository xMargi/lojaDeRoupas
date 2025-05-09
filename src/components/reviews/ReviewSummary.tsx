// src/components/reviews/ReviewSummary.tsx
import { RatingStars } from "./RatingStars"

interface ReviewSummaryProps {
  average: number
  total: number
  distribution: {
    [key: number]: number
  }
}

export function ReviewSummary({ average, total, distribution }: ReviewSummaryProps) {
  const getPercentage = (count: number) => {
    if (total === 0) return 0
    return Math.round((count / total) * 100)
  }

  return (
    <div className="border rounded-lg p-6 w-full bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-[#09122C]">Avaliações de clientes</h2>
      
      <div className="flex gap-8 flex-wrap">
        {/* Coluna da média */}
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-4xl font-bold text-[#09122C]">{average.toFixed(1)}</span>
          <RatingStars rating={average} size={20} className="my-1" />
          <span className="text-sm text-gray-600">{total} Avaliações</span>
        </div>

        {/* Coluna de distribuição */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <span className="w-8 text-sm text-[#09122C] font-medium">{star}★</span>
              <div className="flex-1 bg-gray-200 h-3 rounded overflow-hidden">
                <div
                  className="bg-[#09122C] h-full"
                  style={{ width: `${getPercentage(distribution[star] || 0)}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-6 text-right">
                {distribution[star] || 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
