// src/pages/Home.tsx
import { Banner } from "../components/Banner"
import { CarrosselProdutos } from "../components/CarrosselProdutos"
import { CategorySlider } from "../components/CategorySlider"
import { VideoCarrossel } from "../components/VideoCarrossel"
import { PRODUCTS } from "@/data/products"

export default function Home() {
  const camisas = PRODUCTS.filter(p => ["1", "2", "3", "4", "5", "6", "7",].includes(p.id))

  return (
    <>
      <Banner src="/banner/banner1.jpeg" />

      <CarrosselProdutos />

      <CategorySlider
        title="Camisas"
        id="camisas"
        items={camisas}
      />

      <div className="w-full px-6">
        <div className="h-[2px] bg-gradient-to-r from-[#09122C] to-[#f5f5f5]" />
      </div>

      <VideoCarrossel />

      <Banner
        src="/banner/banner1.jpeg"
        titulo=""
        destaque=""
        subtitulo=""
        cupom=""
        tituloPrincipal=""
      />
    </>
  )
}
