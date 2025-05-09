// src/components/reviews/ReviewsSection.tsx
import { useState } from "react";
import { ReviewList } from "./ReviewList";
import { ReviewForm } from "./ReviewForm";

interface ReviewsSectionProps {
  productId: string;
}

export function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <section className="mt-16 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#09122C]">Avaliações de clientes</h2>
        <button
          onClick={() => setFormOpen(true)}
          className="border border-[#09122C] text-[#09122C] px-4 py-2 text-sm rounded hover:bg-[#09122C] hover:text-white transition"
        >
          Escrever uma avaliação
        </button>
      </div>

      <ReviewList productId={productId} key={refresh} />

      {formOpen && (
        <ReviewForm
          productId={productId}
          onClose={() => setFormOpen(false)}
          onSuccess={() => setRefresh((r) => r + 1)}
        />
      )}
    </section>
  );
}
