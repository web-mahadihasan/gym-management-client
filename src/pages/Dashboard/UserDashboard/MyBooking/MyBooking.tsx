import axios from "axios"
import { useAuth } from "@/contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import Swal from "sweetalert2";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function MyBookings() {
  const { user } = useAuth()
  const axiosSecured = useAxiosSecured()

  const {data: mybookings, refetch, isLoading} = useQuery({
    queryKey: ["mybookings"],
    queryFn: async () => {
        const {data} = await axiosSecured.get(`api/trainee/my-booking/${user._id}`)
        return data.myBookings
        console.log(data.myBookings)
    }
  })

  const handleCancelBooking = async (bookingId: string) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#28a745",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axiosSecured.delete(`/api/trainee/cancel-booking/${bookingId}`)
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
              } catch (error) {
                console.error("Error canceling booking:", error)
              }
        }
      });
  }

  if(isLoading) return <LoadingSpinner/>

  return (
    <div className="my-10">
      <h2 className="text-2xl font-semibold mb-4 text-center border-b-4 border-purple-500 w-fit mx-auto pb-3">My Bookings</h2>
      <div className="bg-white">
        <h3 className="text-xl font-semibold mb-4">Upcoming Classes</h3>
        {mybookings?.length > 0 ? (
          <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {mybookings?.map((booking: any) => (
              <li key={booking._id} className="border border-gray-100 p-6 rounded-lg shadow space-y-2">
                <p className="font-semibold">Date: {new Date(booking.schedule.Classdate).toLocaleDateString()}</p>
                <p>
                  Time: {booking.schedule.startTime} - {booking.schedule.endTime}
                </p>
                <p>Class Name: {booking.schedule.title}</p>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="mt-2 py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no upcoming bookings.</p>
        )}
      </div>
    </div>
  )
}

