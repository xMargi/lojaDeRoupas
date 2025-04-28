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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header global ou específico */}
      {!isAuthPage && (isProductPage ? <ProductHeader /> : <Header />)}

      <main className="flex-1">
        <AppRoutes />
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
