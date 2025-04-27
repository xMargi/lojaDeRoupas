// src/pages/ProductDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, AlertCircle, Truck, CreditCard } from "lucide-react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { PRODUCTS, Product } from "@/data/products";
import { ProductGallery } from "@/components/carousel/ProductGallery";

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
  const totalPrice = unitPrice * quantity;
  const formattedTotal = totalPrice.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+,)/g, "$1.");

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

          {/* Painel de Informações */}
          <div className="flex-1 max-w-[480px] space-y-5">
            <h1 className="text-2xl font-bold">{product.nome}</h1>
            <p className="text-sm text-gray-500">ID: {product.id}</p>

            {/* Preço */}
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-[#BC9977]">R$ {formattedTotal}</p>
              <p className="text-base text-gray-700 flex items-center gap-1">
                <CreditCard size={16} /> no cartão em até 12× de {(unitPrice / 12).toFixed(2).replace('.', ',')} sem juros
              </p>
              <button className="text-xs text-[#BC9977] hover:underline transition">
                + formas de pagamento
              </button>
            </div>

            {/* Seleção de Tamanho */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Tamanho:</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 border rounded text-sm transition ${
                      selectedSize === s
                        ? "bg-[#BC9977] text-white border-[#BC9977]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade e Botões */}
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 border rounded-l hover:bg-gray-100 cursor-pointer"
                >
                  –
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-y"
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1 border rounded-r hover:bg-gray-100 cursor-pointer"
                >
                  ＋
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <button
                  onClick={() => {
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
                  }}
                  className="bg-[#BC9977] hover:bg-opacity-90 text-white py-2 rounded transition text-sm cursor-pointer"
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-black hover:bg-gray-800 text-white py-2 rounded transition text-sm cursor-pointer"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Frete Grátis */}
            <div className="bg-black text-white py-2 px-4 rounded text-center text-sm flex items-center justify-center gap-2">
              <Truck size={16} /> Frete grátis até 30/04
            </div>

            {/* Calcular Frete */}
            <div className="flex items-center gap-2 text-sm">
              <Truck size={16} /> Calcule o frete:
              <input
                type="text"
                placeholder="00000-000"
                className="border px-2 py-1 rounded w-24"
              />
              <button className="bg-[#BC9977] hover:bg-opacity-90 text-white px-3 py-1 rounded transition cursor-pointer">
                OK
              </button>
            </div>

            {/* Favoritar / Alerta */}
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#BC9977] cursor-pointer">
                <Heart size={16} /> Favoritar
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#BC9977] cursor-pointer">
                <AlertCircle size={16} /> Alerta de Preço
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
