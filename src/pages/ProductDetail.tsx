import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, CartItem } from "@/contexts/CartContext";
import { ProductGallery } from "@/components/carousel/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductFromAPI } from "@/types/api";
import axios from "axios";
import { Product } from "@/types/product";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";

const baseUrl = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [toastVisible, setToastVisible] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${baseUrl}/products/${id}`)
      .then((res) => {
        const data: ProductFromAPI = res.data.product;

        console.log("🔍 Produto vindo da API:", data);

        const imageUrl = `${baseUrl}${data.imagePath.startsWith("/") ? "" : "/"}${data.imagePath}`;

        const parsed: Product = {
          id: String(data.id),
          nome: data.name,
          preco: `R$ ${data.price.toFixed(2).replace(".", ",")}`,
          imagem: imageUrl,
          images: data.images?.length ? data.images : [imageUrl],
          sizes: ["P", "M", "G", "GG"],
          description: data.description,
        };

        setProduct(parsed);
        setMainImage(imageUrl);
        if (parsed.sizes?.length) setSelectedSize(parsed.sizes[0]);
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        // navigate("/");
      });
  }, [id, navigate]);

  if (!product) return null;

  const unitPrice = Number(
    product.preco.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
  );

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Selecione um tamanho primeiro.");
      return;
    }

    const item: CartItem = {
      id: Number(product.id),
      title: product.nome,
      price: unitPrice,
      image: product.imagem,
      size: selectedSize,
      quantity,
    };

    addItem(item);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    navigate("/checkout");
  };

  const scrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            key="toast"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-[#09122C] text-white px-6 py-3 rounded-b shadow-lg z-50"
          >
            Produto adicionado ao carrinho
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <ProductGallery
            images={(product.images ?? []).map(img => typeof img === 'string' ? { url: img } : img)}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
          <div className="flex justify-center max-w-[600px] w-full">
            <motion.img
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={mainImage}
              alt={product.nome}
              className="max-h-[750px] w-auto object-contain"
            />
          </div>

          <ProductInfo
            product={product}
            productId={product.id}
            productName={product.nome}
            price={unitPrice}
            discountedPrice={undefined}
            availableSizes={product.sizes ?? ["P", "M", "G", "GG"]}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            handleBuyNow={handleBuyNow}
            scrollToTable={scrollToTable}
          />
        </div>

        <div className="mt-12">
          <ProductDescription tableRef={tableRef} />
        </div>
        <div className="mt-12">
          <ReviewsSection productId={product.id} />
        </div>
      </div>
    </div>
  );
}
