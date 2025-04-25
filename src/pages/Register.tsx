import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos para continuar.")
      return
    }
    if (!validateEmail(email)) {
      setError("Informe um e-mail válido.")
      return
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }
    setError("")
    
    console.log("Cadastro:", { name, email, password })
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
              Criar Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus-visible:ring-[#BC9977] transition duration-200"
              />
            </div>
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
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-[#BC9977] transition duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="focus-visible:ring-[#BC9977] transition duration-200"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              className="w-full bg-[#BC9977] hover:bg-[#a9825e] text-white transition-all duration-200"
              onClick={handleRegister}
            >
              Criar Conta
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-[#BC9977] underline hover:text-[#a9825e] transition-colors"
              >
                Entrar
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
