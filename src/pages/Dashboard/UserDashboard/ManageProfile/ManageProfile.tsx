import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import axios from "axios"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import Swal from "sweetalert2"

const ManageProfile: React.FC = () => {
  const { user, fetchUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const axiosSecured = useAxiosSecured()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const {data} = await axiosSecured.put(`/api/user/update-profile/${user?._id}`, { name, currentPassword, newPassword })
      if(data?.success){
        fetchUser()
        setIsEditing(false)
        setCurrentPassword("")
        setNewPassword("")
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success"
        });
      }
    } catch (error) {
        Swal.fire({
            title: "Failed",
            text: error?.response?.data?.message,
            icon: "error"
          });
      console.error("Error updating profile:", error)
    }
  }

  return (
    <div className="my-10">
         <h2 className="text-2xl font-semibold mb-4 text-center border-b-4 border-purple-500 w-fit mx-auto pb-3">Manage Your profile</h2>
        <Card className="my-10">
        <CardHeader>
            <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
            {!isEditing ? (
            <div className="space-y-3">
                <p>
                <strong>Name:</strong> {user?.name}
                </p>
                <p>
                <strong>Email:</strong> {user?.email}
                </p>
                <p>
                <strong>Role:</strong> {user?.role}
                </p>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
            ) : (
            <form onSubmit={handleUpdate}>
                <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                    </label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                    </label>
                    <div className="relative">
                    <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                    </label>
                    <div className="relative">
                    <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                        )}
                    </button>
                    </div>
                </div>
                <Button type="submit" className="mr-6">Update Profile</Button>
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
                </div>
            </form>
            )}
        </CardContent>
        </Card>
    </div>
  )
}

export default ManageProfile

