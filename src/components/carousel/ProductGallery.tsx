import { useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  mainImage: string;
  setMainImage: (img: string) => void;
}

export function ProductGallery({ images, mainImage, setMainImage }: ProductGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -160, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 160, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-32 select-none">
      <button
        onClick={scrollUp}
        className="bg-white p-2 rounded shadow hover:bg-gray-100 transition"
      >
        <ChevronUp size={20} />
      </button>

      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-y-scroll max-h-[650px] w-full cursor-pointer"
        style={{
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE10+
        }}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`flex-shrink-0 w-full h-36 overflow-hidden border rounded ${
              mainImage === img
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            }`}
            style={{ scrollSnapAlign: "start" }}
          >
            <img
              src={img}
              alt="Miniatura produto"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <button
        onClick={scrollDown}
        className="bg-white p-2 rounded shadow hover:bg-gray-100 transition"
      >
        <ChevronDown size={20} />
      </button>
    </div>
  );
}
