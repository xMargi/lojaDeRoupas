// src/types/review.ts
export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  images?: { url: string }[];
  user?: { name: string };
}
