import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface UserContextType {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ➡️ Recupera do localStorage quando o app carrega
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn")
    if (storedLogin === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true") // salva no localStorage
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.setItem("isLoggedIn", "false") // limpa no localStorage
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
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
