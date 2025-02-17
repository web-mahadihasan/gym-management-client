import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

interface User {
  _id: string
  name: string
  email: string
  role: "admin" | "trainer" | "trainee"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string, role: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      fetchUser()
    }
  }, [])

 
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user/check-auth`)
      setUser(response.data)
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching user:", error)
      logout()
    }
  }
  
  const login = async (email: string, password: string) => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, { email, password })
      const { token } = data.data
      // console.log(data)
      console.log("token", token)
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      await fetchUser()
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }
  
  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      })
      const { token } = response.data
      // console.log(token)
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      // await fetchUser()
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
  }
  const authInfo = {
    user, login, logout, register, setUser
  }
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

