import { useAuth } from "@/contexts/AuthContext"
import type React from "react"
import { FaHome, FaCalendarAlt, FaUsers, FaDumbbell } from "react-icons/fa"
import { Link } from "react-router"

const Sidebar: React.FC = () => {
  const { user } = useAuth()

  const menuItems = {
    admin: [
      { name: "Dashboard", icon: FaHome, href: "/dashboard" },
      { name: "Manage Trainers", icon: FaUsers, href: "/trainers" },
      { name: "Class Schedules", icon: FaCalendarAlt, href: "/schedules" },
    ],
    trainer: [
      { name: "Dashboard", icon: FaHome, href: "/dashboard" },
      { name: "My Schedules", icon: FaCalendarAlt, href: "/schedules" },
    ],
    trainee: [
      { name: "Dashboard", icon: FaHome, href: "/dashboard" },
      { name: "Book Classes", icon: FaDumbbell, href: "/book-classes" },
      { name: "My Bookings", icon: FaCalendarAlt, href: "/my-bookings" },
    ],
  }

  const roleMenuItems = user ? menuItems[user.role] : []

  return (
    <div className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <Link to="/dashboard" className="text-white flex items-center space-x-2 px-4">
        <FaDumbbell className="h-8 w-8" />
        <span className="text-2xl font-extrabold">GymManager</span>
      </Link>
      <nav>
        {roleMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
          >
            <div className="flex items-center space-x-2">
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar

