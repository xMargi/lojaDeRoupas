import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!email || !password) {
      setError("Preencha todos os campos para continuar.")
      return
    }
    setError("")
    
    // Simula login com sucesso
    console.log("Login:", { email, password })
    
    // Redireciona para Home
    navigate("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl border border-[#BC9977] shadow-[0_0_20px_rgba(188,153,119,0.15)] bg-white p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#BC9977]">
              Entrar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible:ring-[#BC9977] transition duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-[#BC9977] transition duration-200"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              className="w-full bg-[#BC9977] hover:bg-[#a9825e] text-white transition-all duration-200"
              onClick={handleLogin}
            >
              Entrar
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-[#BC9977] underline hover:text-[#a9825e] transition-colors"
              >
                Criar Conta
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
