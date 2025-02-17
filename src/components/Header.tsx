import { useAuth } from "@/contexts/AuthContext"
import type React from "react"
import { FaUserCircle } from "react-icons/fa"

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center">
          <span className="text-gray-700 mr-4">{user?.name}</span>
          <FaUserCircle className="h-8 w-8 text-gray-400" />
          <button
            onClick={logout}
            className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

