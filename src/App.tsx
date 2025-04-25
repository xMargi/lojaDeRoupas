import { AppRoutes } from "@/routes"
import { Header } from "@/components/header/Header"
import { Footer } from "@/components/Footer"
import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation()

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register"

  return (
    <>
      {!isAuthPage && <Header />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!isAuthPage && <Footer />}
    </>
  )
}

export default App
