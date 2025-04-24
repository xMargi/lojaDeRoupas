import { Banner } from "../components/Banner"
import { CarrosselProdutos } from "../components/CarrosselProdutos"
import { CategorySlider } from "../components/CategorySlider"
import { VideoCarrossel } from "../components/VideoCarrossel"

export default function Home() {
  return (
    <>
      {/* Banner hero */}
      <Banner src="/banner/banner1.jpeg" />

      <CarrosselProdutos />

      <CategorySlider title="Camisas" images={['/produtos9_16/1.png','/produtos9_16/2.png','/produtos9_16/3.png']} id="camisas"/>

      {/* Divider personalizado */}
      <div className="w-full px-6">
        <div className="h-[2px] bg-gradient-to-r from-[#BC9977] to-[#f5f5f5]" />
      </div>

      <VideoCarrossel />

      <Banner src="/banner/banner1.jpeg" titulo="" destaque="" subtitulo="" cupom="" tituloPrincipal=""/>
    </>
  )
}
