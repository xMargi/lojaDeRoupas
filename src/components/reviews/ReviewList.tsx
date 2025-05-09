// src/components/reviews/ReviewList.tsx
import { useEffect, useState } from "react"
import { ReviewCard } from "./ReviewCard"
import { ReviewSummary } from "./ReviewSummary"
import axios from "axios"

interface Review {
  id: number
  rating: number
  comment: string
  createdAt: string
  images: { url: string }[]
  user?: {
    name: string
  }
}

type SortOption = "newest" | "oldest" | "highest" | "lowest"

interface ReviewListProps {
    productId: string
}

export function ReviewList({ productId }: ReviewListProps) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
    const [sort, setSort] = useState<SortOption>("newest")
    const [filterRating, setFilterRating] = useState<number | null>(null)

    const baseUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(`${baseUrl}/reviews/product/${productId}`).then((res) => {
            setReviews(res.data.reviews || []); // <- corrigido aqui
        });
    }, [productId]);

    useEffect(() => {
        let updated = [...reviews]

        if (filterRating) {
            updated = updated.filter((r) => r.rating === filterRating)
        }

        switch (sort) {
            case "newest":
                updated.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                break
            case "oldest":
                updated.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                break
            case "highest":
                updated.sort((a, b) => b.rating - a.rating)
                break
            case "lowest":
                updated.sort((a, b) => a.rating - b.rating)
                break
        }

        setFilteredReviews(updated)
    }, [sort, filterRating, reviews])

    function calculateDistribution(reviews: Review[]) {
        const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        reviews.forEach((r) => {
            distribution[r.rating] = (distribution[r.rating] || 0) + 1
        })
        return distribution
    }

    return (
        <div className="space-y-6 mt-12">
            <ReviewSummary
                average={calculateAverage(reviews)}
                total={reviews.length}
                distribution={calculateDistribution(reviews)}
            />

            <div className="flex flex-wrap items-center gap-4">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="border px-3 py-1 rounded text-sm"
                >
                    <option value="newest">Mais recentes</option>
                    <option value="oldest">Mais antigas</option>
                    <option value="highest">Nota mais alta</option>
                    <option value="lowest">Nota mais baixa</option>
                </select>

                <div className="flex gap-2 items-center">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <button
                            key={star}
                            onClick={() => setFilterRating(filterRating === star ? null : star)}
                            className={`border px-2 py-1 text-sm rounded ${filterRating === star ? "bg-[#09122C] text-white" : "bg-white text-[#09122C]"
                                }`}
                        >
                            {star} estrela{star > 1 ? "s" : ""}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((r) => (
                        <ReviewCard
                            key={r.id}
                            name={r.user?.name ?? "Cliente"}
                            rating={r.rating}
                            comment={r.comment}
                            date={r.createdAt}
                            images={r.images.map((i) => i.url)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">Nenhuma avaliação encontrada.</p>
                )}
            </div>
        </div>
    )
}

function calculateAverage(reviews: Review[]) {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0
    const total = reviews.reduce((sum, r) => sum + r.rating, 0)
    return total / reviews.length
}