// src/data/products.ts
export interface Product {
    id: string
    nome: string
    preco: string
    imagem: string
    images?: string[]
    sizes?: string[]
    description?: string
  }
  
  export const PRODUCTS: Product[] = [
    {
      id: "1",
      nome: "Camiseta Básica",
      preco: "R$ 89,90",
      imagem: "/produtos9_16/1.png",
      sizes: ["P", "M", "G", "GG"],
      description: "Camiseta 100% algodão com caimento reto e toque suave.",
      images: [
        "/produtos9_16/1.png",             
        "/produtos9_16/2.png",           
        "/produtos9_16/3.png",           
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",                      
      ],
    },
    {
      id: "2",
      nome: "Moletom Oversized",
      preco: "R$ 149,90",
      imagem: "/produtos9_16/2.png",
      sizes: ["P", "M", "G", "GG"],
      description: "Moletom aconchegante com capuz e bolsos frontais.",
      images: [
        "/produtos9_16/1.png",             
        "/produtos9_16/2.png",           
        "/produtos9_16/3.png",           
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",                      
      ],
    },
    {
      id: "3",
      nome: "Tênis Street",
      preco: "R$ 299,90",
      imagem: "/produtos9_16/3.png",
      sizes: ["38", "39", "40", "41", "42", "43"],
      description: "Tênis urbano com solado emborrachado e detalhe em preto.",
      images: [
        "/produtos9_16/1.png",             
        "/produtos9_16/2.png",           
        "/produtos9_16/3.png",           
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",   
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",                      
      ],
    },
    {
        id: "4",
        nome: "Tênis Street",
        preco: "R$ 299,90",
        imagem: "/produtos9_16/1.png",
        sizes: ["38", "39", "40", "41", "42", "43"],
        description: "Tênis urbano com solado emborrachado e detalhe em preto.",
        images: [
          "/produtos9_16/1.png",             
          "/produtos9_16/2.png",           
          "/produtos9_16/3.png",
          "/produtos9_16/1.png",             
          "/produtos9_16/2.png",           
          "/produtos9_16/3.png",
          "/produtos9_16/1.png",             
          "/produtos9_16/2.png",           
          "/produtos9_16/3.png",                                     
        ],
      },
      {
        id: "5",
        nome: "Tênis Street",
        preco: "R$ 299,90",
        imagem: "/produtos9_16/2.png",
        sizes: ["38", "39", "40", "41", "42", "43"],
        description: "Tênis urbano com solado emborrachado e detalhe em preto.",
        images: [
        "/produtos9_16/1.png",             
        "/produtos9_16/2.png",           
        "/produtos9_16/3.png",           
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",                      
      ],
      },
      {
        id: "6",
        nome: "Tênis Street",
        preco: "R$ 299,90",
        imagem: "/produtos9_16/3.png",
        sizes: ["38", "39", "40", "41", "42", "43"],
        description: "Tênis urbano com solado emborrachado e detalhe em preto.",
        images: [
        "/produtos9_16/1.png",             
        "/produtos9_16/2.png",           
        "/produtos9_16/3.png",           
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",                      
      ],
      },
      {
        id: "7",
        nome: "Tênis Street",
        preco: "R$ 299,90",
        imagem: "/produtos9_16/1.png",
        sizes: ["38", "39", "40", "41", "42", "43"],
        description: "Tênis urbano com solado emborrachado e detalhe em preto.",
        images: [
        "/produtos9_16/1.png",             
        "/produtos9_16/2.png",           
        "/produtos9_16/3.png",           
        "/produtos9_16/1.png",
        "/produtos9_16/2.png",             
        "/produtos9_16/3.png",                      
      ],
      },
  ]
  