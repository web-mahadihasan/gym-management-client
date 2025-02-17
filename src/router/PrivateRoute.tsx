import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router"

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if(loading) return <p>Loading...</p>

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoute

