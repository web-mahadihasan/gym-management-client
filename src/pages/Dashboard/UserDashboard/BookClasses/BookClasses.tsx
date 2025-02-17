import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import Swal from "sweetalert2";

export default function BookClasses() {
  const { user } = useAuth()

  const axiosSecured = useAxiosSecured()

  const {data: availableClass, refetch, isLoading} = useQuery({
    queryKey: ["availableClass"],
    queryFn: async () => {
        const {data} = await axiosSecured.get("api/trainee/class-schedules")
        return data.data
    }
  })

  const handleBooking = async (scheduleId: string) => {
    try {
      const {data} = await axiosSecured.post(`/api/trainee/book-class/${scheduleId}`, { traineeId: user?._id })
      Swal.fire({
        title: "Booking Success",
        text: "Your have successfully booked class",
        icon: "success"
      });
      refetch()
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: error?.response?.data?.message,
        icon: "error"
      });
    }
  }
  
  if(isLoading) return <p>Loading...</p>

  return (
    <div className="my-10 font-inter">
      <h2 className="text-2xl font-semibold mb-4 text-center border-b-4 border-purple-500 w-fit mx-auto pb-3">Available Classes</h2>
      <div className="bg-white mt-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {availableClass?.map((schedule: any) => (
            <li key={schedule._id} className="border p-6 rounded-lg shadow-sm space-y-2">
              <h3 className="font-bold text-xl"> <span className="font-bold">Class Title: </span>{schedule?.title}</h3>
              <p className="font-semibold">Date: {new Date(schedule.date).toLocaleDateString()}</p>
              <p className="">
                <span className="font-bold">Time:</span> {schedule.startTime} - {schedule.endTime}
              </p>
              {/* <p><span className="font-bold">Trainer:</span> {schedule.trainer}</p> */}
              <p><span className="font-bold">Available Slots:</span> {schedule.maxCapacity - schedule.currentBookings}</p>
              <button
                onClick={() => handleBooking(schedule._id)}
                className="mt-2 py-1 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                disabled={schedule.currentBookings >= schedule.maxCapacity}
              >
                {schedule.currentBookings >= schedule.maxCapacity ? "Full" : "Book Now"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

