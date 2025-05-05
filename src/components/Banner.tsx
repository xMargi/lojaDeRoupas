interface BannerProps {
    src: string
    titulo?: string
    tituloPrincipal?: string
    destaque?: string
    subtitulo?: string
    cupom?: string
  }
  
  export function Banner({
    src,
    titulo = "VOCÊS PEDIRAM E NÓS ATENDEMOS",
    tituloPrincipal = "frete grátis",
    destaque = "+ 10% off Boldwear",
    subtitulo = "Por tempo limitado",
    cupom = "USE O CUPOM: FRETE10"
  }: BannerProps) {
    return (
      <section
        className="relative w-full h-[90vh] bg-cover bg-top flex items-center justify-center text-white pt-28 font-playfair"
        style={{ backgroundImage: `url('${src}')` }}
      >
        <div className="text-center px-4 text-white drop-shadow-lg">
          <h2 className="text-lg md:text-2xl uppercase mb-4 tracking-widest font-medium opacity-90">
            {titulo}
          </h2>
          <h1 className="text-5xl md:text-[5rem] font-extrabold mb-6 leading-tight">
            {tituloPrincipal}<br />
            <span className="text-4xl md:text-[3.5rem] font-normal italic">
              {destaque}
            </span>
          </h1>
          <p className="text-sm md:text-base opacity-80 mb-2">{subtitulo}</p>
          <p className="text-xl md:text-2xl font-semibold tracking-wider">{cupom}</p>
        </div>
      </section>
    )
  }
  