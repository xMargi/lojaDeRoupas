import { useRef } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ProductGalleryProps {
  images: { url: string }[]; 
  mainImage: string;
  setMainImage: (img: string) => void;
}

const baseUrl = import.meta.env.VITE_API_URL;

export function ProductGallery({ images, mainImage, setMainImage }: ProductGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    containerRef.current?.scrollBy({ top: -160, behavior: "smooth" });
  };

  const scrollDown = () => {
    containerRef.current?.scrollBy({ top: 160, behavior: "smooth" });
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
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.map(({ url }, idx) => {
          const src = url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
          return (
            <button
              key={idx}
              onClick={() => setMainImage(src)}
              className={`flex-shrink-0 w-full h-36 overflow-hidden border rounded ${mainImage === src
                  ? "border-black"
                  : "border-transparent hover:border-gray-300"
                }`}
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={src}
                alt="Miniatura produto"
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
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
