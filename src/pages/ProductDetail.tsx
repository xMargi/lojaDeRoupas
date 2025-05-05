import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, CartItem } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import { ProductGallery } from "@/components/carousel/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductDescription } from "@/components/product/ProductDescription";
import axios from "axios";
import { ProductFromAPI } from "@/types/api"; // importa tipo certo

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
      .get(`http://localhost:3333/products/${id}`)
      .then((res) => {
        const data: ProductFromAPI = res.data.product;

        // Mapeia para o formato do frontend
        const parsedProduct: Product = {
          id: String(data.id),
          nome: data.name,
          preco: `R$ ${data.price.toFixed(2).replace(".", ",")}`,
          imagem: data.imagePath,
          images: [data.imagePath],
          sizes: ["P", "M", "G", "GG"],
          description: data.description,
        };

        setProduct(parsedProduct);
        setMainImage(parsedProduct.imagem);
        if (parsedProduct.sizes && parsedProduct.sizes.length > 0) {
          setSelectedSize(parsedProduct.sizes[0]);
        }
      })
      .catch(() => {
        navigate("/");
      });
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
      id: +product.id,
      title: product.nome,
      price: unitPrice,
      image: mainImage,
      size: selectedSize,
      quantity,
    };
    addItem(item);
    showToast();
    navigate("/checkout");
  };

  const scrollToTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
          <ProductGallery images={product.images ?? []} mainImage={mainImage} setMainImage={setMainImage} />

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
            availableSizes={availableSizes}
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
      </div>
    </div>
  );
}
