interface Categoria {
    nome: string
    imagem: string
  }
  
  const categorias: Categoria[] = [
    { nome: "Camisetas", imagem: "/categorias/camiseta.jpg" },
    { nome: "Moletom", imagem: "/categorias/moletom.jpg" },
    { nome: "Jaquetas", imagem: "/categorias/jaqueta.jpg" },
    { nome: "Calças", imagem: "/categorias/calca.jpg" },
    { nome: "Tops", imagem: "/categorias/top.jpg" },
    { nome: "Tênis", imagem: "/categorias/tenis.jpg" },
    { nome: "Bonés", imagem: "/categorias/bone.jpg" },
    { nome: "Acessórios", imagem: "/categorias/acessorio.jpg" },
  ]
  
  export function Categorias() {
    return (
        <section className="w-full pt-24 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {categorias.map((cat, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-[80px] hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-[64px] h-[64px] rounded-md overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={cat.imagem}
                    alt={cat.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-1 text-xs font-medium text-center">{cat.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    )
  }
  