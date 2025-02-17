"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Clock } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import { LoadingSpinner } from "@/components/LoadingSpinner"

interface Trainer {
  _id: string
  name: string
}

interface Schedule {
  _id: string
  date: string
  startTime: string
  endTime: string
  trainer: Trainer
  currentBookings: number
  maxCapacity: number
}

export default function ClassSchedules() {
//   const [schedules, setSchedules] = useState<Schedule[]>([])
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [trainerId, setTrainerId] = useState("")
  const [title, setTitle] = useState("")
  const { user } = useAuth()
  const axiosSecured = useAxiosSecured()

  const {data: schedules, refetch} = useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
        const {data} = await axiosSecured.get(`/api/admin/all-schedules`)
        return data.data
    }
  })

  const {data: allTrainer, isLoading} = useQuery({
    queryKey: ["allTrainer"],
    queryFn: async () => {
        const {data} = await axiosSecured.get(`/api/admin/trainers`)
        return data.data
    }
  })
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newSchedules = {
        date,
        title,
        startTime,
        endTime,
        trainerId
    }
    console.log(newSchedules)
    try {
      await axiosSecured.post("/api/admin/create-class-schedule", {
        date: date?.toISOString(),
        title,
        startTime,
        endTime,
        trainerId,
      })
      setDate(new Date())
      setTitle("")
      setStartTime("")
      setEndTime("")
      setTrainerId("")
      refetch()
      Swal.fire({
        title: "Success",
        text: "Successfully Create new Schedules",
        icon: "success"
    });
    } catch (error) {
        Swal.fire({
          title: "Failed",
          text: error?.response?.data?.message,
          icon: "error"
        });
      console.error("Error creating schedule:", error)
    }
  }
  if(isLoading) return <LoadingSpinner/>
  return (
    <div className="my-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-6">Class Schedules</h2>
        {user?.role === "admin" && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col space-y-2 flex-1">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                    </div>
                    {/* Card two  */}
                    <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="startTime" className="mb-2 text-sm font-medium text-gray-700">
                            Class Title
                        </label>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="" id="" className="w-full px-4 py-1.5 border border-gray-300 rounded-lg" placeholder="Title" />
                    </div>

                    {/* time select  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="startTime" className="text-sm font-medium text-gray-700">
                        Start Time
                        </label>
                        <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="pl-10"
                            required
                        />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="endTime" className="text-sm font-medium text-gray-700">
                        End Time
                        </label>
                        <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            id="endTime"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="pl-10"
                            required
                        />
                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label htmlFor="trainerId" className="text-sm font-medium text-gray-700">
                        Trainer
                    </label>
                    <Select value={trainerId} onValueChange={setTrainerId}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a trainer" />
                        </SelectTrigger>
                        <SelectContent>
                        {allTrainer?.map((trainer) => (
                            <SelectItem key={trainer._id} value={trainer._id}>
                            {trainer?.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>
                    </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Schedule
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle className=""><span className="font-3xl font-inter">Existing Schedules</span></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schedules?.map((schedule) => (
                <motion.div
                  key={schedule._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 rounded-lg shadow space-y-2 border border-gray-200"
                >   
                 <h3 className="font-bold text-xl"> <span className="font-bold">Class Title: </span>{schedule?.title}</h3>
                  <p className="font-semibold">Date: {format(new Date(schedule?.date), "MMMM d, yyyy")}</p>
                  <p>
                    <span className="font-bold">Time:</span> {schedule.startTime} - {schedule.endTime}
                  </p>
                  {/* <p><span className="font-bold">Trainer:</span> {schedule.trainer}</p> */}
                  <p>
                    <span className="font-bold">Bookings:</span> {schedule.currentBookings}/{schedule.maxCapacity}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

