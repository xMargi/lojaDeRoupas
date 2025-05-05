import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import axios from "axios"

interface User {
  id: number
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const isLoggedIn = !!user

  const api = axios.create({
    baseURL: "http://localhost:3333/auth", // 💡 Altere para sua API se necessário
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })

  // Recupera token e usuário do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.post("/login", { email, password })

    const { token, user } = response.data

    setToken(token)
    setUser(user)

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    await api.post("/register", { name, email, password })
    await login(email, password)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
