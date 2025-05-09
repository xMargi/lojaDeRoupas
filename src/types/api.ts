// src/types/api.ts

export interface ProductFromAPI {
    id: number
    name: string
    price: number
    description: string
    imagePath: string
    categories?: { id: number; name: string }[]
    images?: { url: string }[];
  }
  