import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, CartItem } from "@/contexts/CartContext";
import { PRODUCTS, Product } from "@/data/products";
import { ProductGallery } from "@/components/carousel/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === id);
    if (!found) {
      navigate("/");
      return;
    }
    setProduct(found);
    setMainImage(found.imagem);
    if (found.sizes && found.sizes.length > 0) {
      setSelectedSize(found.sizes[0]);
    }
  }, [id, navigate]);

  if (!product) return null;

  const availableSizes = product.sizes ?? ["P", "M", "G", "GG"];
  const unitPrice = Number(product.preco.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Selecione um tamanho primeiro.");
      return;
    }
    const item: CartItem = {
      id: product.id,
      name: product.nome,
      price: unitPrice,
      image: mainImage,
      size: selectedSize,
      quantity,
    };
    addItem(item);
    showToast();
    navigate("/checkout");
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
            className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-[#BC9977] text-white px-6 py-3 rounded-b shadow-lg z-50"
          >
            Produto adicionado ao carrinho
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

          {/* Galeria de Miniaturas */}
          <ProductGallery
            images={product.images ?? []}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />

          {/* Imagem Principal */}
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

          {/* Informações do Produto */}
          <ProductInfo
            product={product}
            productName={product.nome}
            productId={product.id}
            price={unitPrice}
            discountedPrice={undefined} 
            availableSizes={availableSizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            handleBuyNow={handleBuyNow}
          />

        </div>
      </div>
    </div>
  );
}
