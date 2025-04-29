import { useState, useRef, useEffect } from "react";
import { Heart, AlertCircle, Truck, CreditCard } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Product } from "@/data/products";

interface ProductInfoProps {
    product: Product;
    productName: string;
    productId: string;
    price: number;
    discountedPrice?: number;
    availableSizes: string[];
    selectedSize: string | null;
    setSelectedSize: (size: string) => void;
    quantity: number;
    setQuantity: (q: number) => void;
    handleBuyNow: () => void;
}

export function ProductInfo({
    product,
    productName,
    productId,
    price,
    discountedPrice,
    availableSizes,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleBuyNow,
}: ProductInfoProps) {
    const cashback = (price * 0.1).toFixed(2).replace(".", ",");
    const { addFavorite } = useFavorites();
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const paymentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (paymentRef.current && !paymentRef.current.contains(event.target as Node)) {
                setShowPaymentOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col max-w-[480px] space-y-6 text-gray-800 select-none">
            {/* Nome e ID */}
            <div className="space-y-1">
                <h1 className="text-4xl font-bold ">{productName}</h1>
                <p className="text-sm text-gray-500 ">#{productId} - {productName}</p>
            </div>

            {/* Preços */}
            <div className="space-y-2">
                {discountedPrice ? (
                    <div className="flex items-center gap-2">
                        <p className="line-through text-gray-400 text-xl">de R$ {price.toFixed(2).replace(".", ",")}</p>
                        <p className="text-[#BC9977] font-semibold text-xl">R$ {discountedPrice.toFixed(2).replace(".", ",")}</p>
                        <span className="bg-[#BC9977] text-white text-xs px-2 py-0.5 rounded">-34%</span>
                    </div>
                ) : (
                    <p className="text-[#BC9977] font-semibold text-2xl">R$ {price.toFixed(2).replace(".", ",")}</p>
                )}
                <p className="text-sm text-gray-600 flex items-center gap-1">
                    <CreditCard size={16} /> em até 12x de R$ {(price / 12).toFixed(2).replace(".", ",")} sem juros
                </p>
                <div className="relative inline-block" ref={paymentRef}>
                    <button
                        onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                        className="text-xs text-[#BC9977] border border-[#BC9977] px-3 py-1.5 rounded-full font-medium hover:bg-[#BC9977] hover:text-white transition"
                    >
                        + formas de pagamento
                    </button>
                    {showPaymentOptions && (
                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white border z-10">
                            <ul className="text-sm text-gray-700 divide-y">
                                <li className="px-4 py-2 hover:bg-[#BC9977] hover:text-white cursor-pointer">Pix</li>
                                <li className="px-4 py-2 hover:bg-[#BC9977] hover:text-white cursor-pointer">Cartão de Crédito</li>
                                <li className="px-4 py-2 hover:bg-[#BC9977] hover:text-white cursor-pointer">Boleto</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Tamanhos */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Tamanho:</label>
                <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 border rounded text-sm transition ${
                                selectedSize === size
                                    ? "bg-[#BC9977] text-white border-[#BC9977]"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botão Tabela de Medidas */}
            <button className="w-full border rounded py-2 font-medium hover:bg-gray-100 transition">
                Tabela de Medidas
            </button>

            {/* Cashback */}
            <div className="bg-gray-100 rounded p-3 text-center text-sm">
                <p>Receba até:</p>
                <p className="text-[#BC9977] font-bold">R$ {cashback} de cashback</p>
            </div>

            {/* Garantia */}
            <p className="text-xs text-gray-500">
                Garantia: Contra defeito de fabricação
            </p>

            {/* Quantidade e Comprar */}
            <div className="flex items-start gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-1 border rounded hover:bg-gray-100 transition"
                    >
                        -
                    </button>
                    <input
                        type="text"
                        readOnly
                        value={quantity}
                        min={1}
                        className="w-14 text-center border text-sm py-1.5 px-1.5"
                        style={{
                            MozAppearance: "textfield",
                            appearance: "textfield",
                            WebkitAppearance: "none",
                        }}
                    />
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-1 border rounded hover:bg-gray-100 transition"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#BC9977] hover:bg-opacity-90 text-white font-bold py-2 rounded transition"
                >
                    COMPRAR
                </button>
            </div>

            {/* Favoritar / Alerta */}
            <div className="flex gap-4">
                <button
                    onClick={() => addFavorite(product)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#BC9977] transition"
                >
                    <Heart size={16} /> Adicionar aos favoritos
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#BC9977] transition">
                    <AlertCircle size={16} /> Criar alerta de preço
                </button>
            </div>

            {/* Frete grátis */}
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
                <button className="bg-[#BC9977] hover:bg-opacity-90 text-white px-3 py-1 rounded transition">
                    OK
                </button>
            </div>
        </div>
    );
}
