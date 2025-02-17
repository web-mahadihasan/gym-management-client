import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import { useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import { LoadingSpinner } from "@/components/LoadingSpinner"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

const CreateNewTrainer: React.FC = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const axiosSecured = useAxiosSecured()

  const {data: allTrainee, isLoading, refetch} = useQuery({
    queryKey: ["allTrainee"],
    queryFn: async () => {
        const {data} = await axiosSecured.get(`/api/admin/trainee`)
        return data.data
    }
  })

  const handleCreateTrainer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axiosSecured.post("/api/admin/create-trainer", { name, email, password })
      setName("")
      setEmail("")
      setPassword("")
      Swal.fire({
          title: "Success",
          text: "Successfully Create new Trainee",
          icon: "success"
        });
        refetch()
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: error?.response?.data?.message,
        icon: "error"
      });
      console.error("Error creating trainer:", error)
    }
  }
  
  const handleMakeTrainer = async (name: string, email: string) => {
    try {
      await axiosSecured.post(`/api/admin/create-trainer`, { name, email })
      Swal.fire({
        title: "Success",
        text: "Successfully Create new Trainee",
        icon: "success"
      });
      refetch()
    } catch (error) {
        Swal.fire({
          title: "Failed",
          text: error?.response?.data?.message,
          icon: "error"
        });
      console.error("Error making trainer:", error)
    }
  }
  if(isLoading) return <LoadingSpinner/>
  
  return (
    <div className="space-y-6 my-10">
        <h2 className="text-2xl font-semibold mb-4 text-center border-b-4 border-purple-500 w-fit mx-auto pb-3">Create New Trainee</h2>
      <Card>
        <CardHeader>
          <CardTitle>Create Trainer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateTrainer} className="space-y-4">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Create Trainer</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTrainee?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {user.role !== "trainer" && user.role !== "admin" && (
                      <Button onClick={() => handleMakeTrainer(user.name, user.email)}>Make Trainer</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateNewTrainer

