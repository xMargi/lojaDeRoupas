// src/components/aside/CartAside.tsx
import { X as CloseIcon, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

interface CartAsideProps {
  isOpen: boolean
  onClose: () => void
}

export function CartAside({ isOpen, onClose }: CartAsideProps) {
  const { items: cartItems, addItem, decrementItem, clearCart, total } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      {/* Aside */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Minha sacola ({cartItems.length})</h2>
          <button onClick={clearCart} className="text-sm text-gray-600 hover:underline">
            Limpar sacola
          </button>
          <button onClick={onClose}>
            <CloseIcon size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ShoppingBag size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Poxa, sua sacola está vazia</p>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black hover:bg-black hover:text-white transition"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">Tamanho: {item.size}</p>
                  <p className="text-sm font-medium text-[#BC9977]">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => decrementItem(item.id, item.size)}
                    className="px-2 py-1 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="px-2 py-1 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">R$ {total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-[#BC9977] text-white py-3 rounded-lg font-semibold hover:bg-[#a9825e] transition">
              Finalizar Pedido
            </button>
          </>
        )}
      </aside>
    </>
  )
}
