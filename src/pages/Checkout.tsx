import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";


export default function Checkout() {
  const { items: cartItems, total } = useCart();

  const [address, setAddress] = useState({
    nome: "",
    email: "",
    celular: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "boleto" | null>("pix");

  useEffect(() => {
    const storedMethod = localStorage.getItem("selectedPaymentMethod") as "pix" | "card" | "boleto" | null;
    if (storedMethod) setPaymentMethod(storedMethod);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-4 py-10 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Formulários */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identificação */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#09122C]">1. Identifique-se</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="nome" placeholder="Nome completo" value={address.nome} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="email" placeholder="E-mail" value={address.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="celular" placeholder="Celular / WhatsApp" value={address.celular} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
            </div>
          </div>

          {/* Entrega */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#09122C]">2. Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="cep" placeholder="CEP" value={address.cep} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="rua" placeholder="Rua" value={address.rua} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="numero" placeholder="Número" value={address.numero} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="bairro" placeholder="Bairro" value={address.bairro} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="cidade" placeholder="Cidade" value={address.cidade} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
              <input name="estado" placeholder="UF" value={address.estado} onChange={handleInputChange} className="w-full px-4 py-2 border border-[#09122C] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#09122C] transition placeholder:text-gray-400" />
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#09122C]">3. Pagamento</h2>
            <div className="flex gap-4">
              {(["pix", "card", "boleto"] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => {
                    setPaymentMethod(method);
                    localStorage.setItem("selectedPaymentMethod", method);
                  }}
                  className={`px-4 py-2 rounded border w-full font-medium transition
                    ${paymentMethod === method
                      ? "bg-[#09122C] text-white border-[#09122C]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  {{ pix: "Pix", card: "Cartão de Crédito", boleto: "Boleto" }[method]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold text-[#09122C]">RESUMO</h2>

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Produtos</span>
              <span className="font-medium">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Frete</span>
              <span className="text-green-600 font-semibold">Grátis</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Tamanho: {item.size} | Qtd: {item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-[#09122C]">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <button className="w-full bg-[#09122C] hover:bg-[#a9825e] text-white py-3 rounded-lg font-semibold transition">
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
