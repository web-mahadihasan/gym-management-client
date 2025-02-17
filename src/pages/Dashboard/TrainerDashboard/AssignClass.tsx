import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useAuth } from "@/contexts/AuthContext"
import useAxiosSecured from "@/hooks/useAxiosSecured"
import { useQuery } from "@tanstack/react-query"

const TrainerDashboard: React.FC = () => {
    const axiosSecured = useAxiosSecured()
    const {user} = useAuth()
    // console.log(user)

    const {data: assignClass, isLoading} = useQuery({
      queryKey: ["assignClass"],
      queryFn: async () => {
          const {data} = await axiosSecured.get(`/api/trainer/schedules/${user?._id}`)
          return data
      }
    })
    if(isLoading) return <LoadingSpinner/>
      

  return (
    <div className="my-10">
        <h2 className="text-2xl font-semibold mb-4 text-center border-b-4 border-purple-500 w-fit mx-auto pb-3">Trainer Dashboard</h2>
      <div className="bg-white mt-10">
        <h3 className="text-xl font-semibold mb-4">Upcoming Classes</h3>
        {assignClass?.length > 0 ? (
          <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignClass?.map((classItem: any) => (
              <li key={classItem._id} className="p-6 rounded-lg shadow border border-gray-100 space-y-3">
                <p className="font-semibold">{classItem.name}</p>
                <p><span className="font-bold">Date:</span> {new Date(classItem.date).toLocaleDateString()}</p>
                <p>
                  <span className="font-bold">Time:</span> {classItem.startTime} - {classItem.endTime}
                </p>
                <p>
                  <span className="font-bold">Trainees:</span> {classItem.currentBookings}/{classItem.maxCapacity}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming classes scheduled.</p>
        )}
      </div>
    </div>
  )
}

export default TrainerDashboard

