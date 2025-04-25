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

      <CategorySlider
        title="Camisas"
        id="camisas"
        items={[
          {
            id: "1",
            name: "Camisa Oversized Branca",
            price: "R$ 129,90",
            image: "/produtos9_16/1.png",
          },
          {
            id: "2",
            name: "Camisa Preta Básica",
            price: "R$ 99,90",
            image: "/produtos9_16/2.png",
          },
          {
            id: "3",
            name: "Camisa Estampada",
            price: "R$ 149,90",
            image: "/produtos9_16/3.png",
          },
        ]}
      />


      {/* Divider personalizado */}
      <div className="w-full px-6">
        <div className="h-[2px] bg-gradient-to-r from-[#BC9977] to-[#f5f5f5]" />
      </div>

      <VideoCarrossel />

      <Banner src="/banner/banner1.jpeg" titulo="" destaque="" subtitulo="" cupom="" tituloPrincipal="" />
    </>
  )
}
