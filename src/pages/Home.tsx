import { Banner } from "../components/Banner"
import { CarrosselProdutos } from "../components/CarrosselProdutos"
import { Categorias } from "../components/Categorias"
import { VideoCarrossel } from "../components/VideoCarrossel"

export default function Home() {
  return (
    <>
      {/* Banner hero */}
      <Banner src="/banner/banner1.jpeg" />

      {/* Catálogo de categorias fora do banner */}
      <Categorias />

      <CarrosselProdutos />

      {/* Divider personalizado */}
      <div className="w-full px-6">
        <div className="h-[2px] bg-gradient-to-r from-[#BC9977] to-[#f5f5f5]" />
      </div>

      <VideoCarrossel />

      <Banner src="/banner/banner1.jpeg" titulo="" destaque="" subtitulo="" cupom="" tituloPrincipal=""/>
    </>
  )
}
