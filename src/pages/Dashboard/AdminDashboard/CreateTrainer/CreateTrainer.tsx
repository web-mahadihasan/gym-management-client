import { useState, useEffect } from "react"
import axios from "axios"
// import Layout from "@/components/Layout"
import { useAuth } from "@/contexts/AuthContext"

export default function CreateTrainer() {
  const [schedules, setSchedules] = useState([])
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [trainerId, setTrainerId] = useState("")
  const [trainers, setTrainers] = useState([])
  const { user } = useAuth()

//   useEffect(() => {
//     fetchSchedules()
//     if (user?.role === "admin") {
//       fetchTrainers()
//     }
//   }, [user])

  const fetchSchedules = async () => {
    // try {
    //   const response = await axios.get("/api/schedules")
    //   setSchedules(response.data)
    // } catch (error) {
    //   console.error("Error fetching schedules:", error)
    // }
  }

  const fetchTrainers = async () => {
    // try {
    //   const response = await axios.get("/api/admin/trainers")
    //   setTrainers(response.data)
    // } catch (error) {
    //   console.error("Error fetching trainers:", error)
    // }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault()
    // try {
    //   await axios.post("/api/admin/schedules", { date, startTime, endTime, trainerId })
    //   setDate("")
    //   setStartTime("")
    //   setEndTime("")
    //   setTrainerId("")
    //   fetchSchedules()
    // } catch (error) {
    //   console.error("Error creating schedule:", error)
    // }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Class Schedules</h2>
      {user?.role === "admin" && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Schedule</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="trainerId" className="block text-sm font-medium text-gray-700">
                  Trainer
                </label>
                <select
                  id="trainerId"
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select a trainer</option>
                  {trainers?.map((trainer: any) => (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Schedule
            </button>
          </form>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Existing Schedules</h3>
        {/* <ul className="space-y-4">
          {schedules?.map((schedule: any) => (
            <li key={schedule._id} className="border-b pb-2">
              <p className="font-semibold">Date: {new Date(schedule?.date).toLocaleDateString()}</p>
              <p>
                Time: {schedule?.startTime} - {schedule?.endTime}
              </p>
              <p>Trainer: {schedule?.trainer?.name}</p>
              <p>
                Bookings: {schedule?.currentBookings}/{schedule?.maxCapacity}
              </p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

