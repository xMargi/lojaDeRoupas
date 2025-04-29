// src/App.tsx
import { useLocation } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";
import { ProductHeader } from "@/components/ProductHeader";
import { AppRoutes } from "@/routes";

export default function App() {
  const { pathname } = useLocation();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProductPage = pathname.startsWith("/product/");
  const isCheckoutPage = pathname === "/checkout"; // ✅ já está correto

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header apenas se não for login/register/product/checkout */}
      {!isAuthPage && !isProductPage && !isCheckoutPage && <Header />}
      {isProductPage && <ProductHeader />}
      {/* ⚠️ não renderiza Header algum para checkout */}

      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* Footer também não aparece no checkout/login/register */}
      {!isAuthPage && !isCheckoutPage && <Footer />}
    </div>
  );
}
