// src/components/reviews/RatingStars.tsx
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  setRating?: (value: number) => void;
  size?: number;
  className?: string;
}

export function RatingStars({ rating, setRating, size = 16, className = "" }: RatingStarsProps) {
  const handleClick = (index: number) => {
    if (setRating) setRating(index);
  };

  return (
    <div className={`flex gap-[2px] ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          onClick={() => handleClick(i)}
          className={setRating ? "cursor-pointer" : ""}
          fill={i <= rating ? "#FFD700" : "none"}
          color={i <= rating ? "#FFD700" : "#ccc"}
        />
      ))}
    </div>
  );
}
