"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import { useQuery } from "@tanstack/react-query"

interface Trainer {
  _id: string
  name: string
  email: string
}

const ManageTrainers: React.FC = () => {
  // const [trainers, setTrainers] = useState<Trainer[]>([])
  const axiosSecured = useAxiosSecured()

  const {data: allTrainer, isLoading, refetch} = useQuery({
    queryKey: ["allTrainer"],
    queryFn: async () => {
        const {data} = await axiosSecured.get(`/api/admin/trainers`)
        return data.data
    }
  })

  // useEffect(() => {
  //   fetchTrainers()
  // }, [])

  // const fetchTrainers = async () => {
  //   try {
  //     const response = await axios.get("/api/admin/trainers")
  //     setTrainers(response.data.data)
  //   } catch (error) {
  //     console.error("Error fetching trainers:", error)
  //   }
  // }

  const handleRemoveTrainer = async (trainerId: string) => {
    try {
      await axios.put(`/api/admin/remove-trainer/${trainerId}`)
      refetch()
    } catch (error) {
      console.error("Error removing trainer:", error)
    }
  }

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-4 text-center border-b-4 border-purple-500 w-fit mx-auto pb-3">Manage Your Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
      {allTrainer?.map((trainer) => (
        <Card key={trainer._id}>
          <CardHeader>
            <CardTitle>{trainer.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{trainer.email}</p>
            <Button onClick={() => handleRemoveTrainer(trainer._id)} className="mt-4">
              Remove Trainer
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  )
}

export default ManageTrainers

