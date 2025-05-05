import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/contexts/UserContext"
import { AxiosError } from "axios"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos para continuar.")
      return
    }

    setLoading(true)
    setError("")

    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      const msg =
        error.response?.data?.message ||
        "Erro ao fazer login. Verifique suas credenciais."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl border border-[#09122C] shadow-[0_0_20px_rgba(188,153,119,0.15)] bg-white p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#09122C]">
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
                className="focus-visible:ring-[#09122C] transition duration-200"
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
                className="focus-visible:ring-[#09122C] transition duration-200"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#09122C] hover:bg-[#000000] text-white transition-all duration-200"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-[#09122C] underline hover:text-[#000000] transition-colors"
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
