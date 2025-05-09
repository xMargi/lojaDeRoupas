// src/types/product.ts
export interface Product {
  id: string;
  nome: string;
  preco: string;
  imagem: string;
  images?: (string | { url: string })[]; // ← agora aceita os dois formatos
  sizes?: string[];
  description?: string;
}
  