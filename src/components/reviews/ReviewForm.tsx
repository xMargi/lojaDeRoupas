// src/components/reviews/ReviewForm.tsx
import { useState } from "react"
import { X } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { RatingStars } from "./RatingStars"
import { useUser } from "@/contexts/UserContext"
import { Review } from "@/types/review"

interface ReviewFormProps {
  productId: string
  onClose: () => void
  onSuccess?: (review: Review) => void
}

export function ReviewForm({ productId, onClose, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const { isLoggedIn, user } = useUser()
  const baseUrl = import.meta.env.VITE_API_URL

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const selected = Array.from(e.target.files).slice(0, 5)
    setImages(selected)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      toast.error("Você precisa estar logado para enviar uma avaliação.")
      return
    }

    setLoading(true)

    try {
      const uploadedUrls = await Promise.all(
        images.map(async (file) => {
          const formData = new FormData()
          formData.append("image", file)

          const res = await axios.post(`${baseUrl}/reviews/upload`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          })

          return res.data.url
        })
      )

      await axios.post(
        `${baseUrl}/reviews`,
        {
          productId,
          rating,
          comment,
          images: uploadedUrls,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      const newReview: Review = {
        id: Date.now(),
        rating,
        comment,
        createdAt: new Date().toISOString(),
        images: uploadedUrls.map((url) => ({ url })),
        user: { name: user?.name ?? "Cliente" },
      }

      onSuccess?.(newReview)
      toast.success("Avaliação enviada com sucesso! Obrigado pelo feedback.")
      onClose()
    } catch (err) {
      console.error("Erro ao enviar avaliação:", err)
      toast.error("Erro ao enviar avaliação. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-500">
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold mb-4 text-[#09122C]">Escrever uma avaliação</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#09122C]">Classificação</label>
            <RatingStars rating={rating} setRating={setRating} size={24} />
          </div>

          <div>
            <label className="text-sm font-medium text-[#09122C]">Comentário</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              rows={4}
              placeholder="Escreva sua opinião sobre o produto..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#09122C]">Fotos (opcional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {img.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#09122C] text-white py-2 rounded hover:opacity-90 transition"
          >
            {loading ? "Enviando..." : "Enviar avaliação"}
          </button>
        </form>
      </div>
    </div>
  )
}
