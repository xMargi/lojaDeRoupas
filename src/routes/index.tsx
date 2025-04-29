// src/routes/index.tsx
import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import ProductDetail from "@/pages/ProductDetail"
import Checkout from "@/pages/Checkout" // ✅ IMPORTAÇÃO AQUI

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} /> {/* ✅ NOVA ROTA AQUI */}
    </Routes>
  )
}
