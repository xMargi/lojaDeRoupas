// src/components/CarrosselProdutos.tsx
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/data/products";

export function CarrosselProdutos() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full py-16 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Lançamentos</h2>

        <div className="relative">
          {/* Botões */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full hover:scale-105 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full hover:scale-105 transition"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carrossel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {PRODUCTS.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
