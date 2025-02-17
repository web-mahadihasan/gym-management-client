import { useQuery } from "@tanstack/react-query";
// import useAxiosSecured from "./useAxiosSecured";
import { useAuth } from "@/contexts/AuthContext";
import useAxiosSecured from "./useAxiosSecured";
import axios from "axios";

const useTrainer = () => {
    const {user} = useAuth()

    const axiosSecured = useAxiosSecured()

    const {data: isTrainer, isPending: isTrainerLoading, refetch} = useQuery({
        queryKey: [user?.email, "useAdmin"],
        queryFn: async () => {
            const {data} = await axiosSecured.get(`/api/user/trainer/${user.email}`)
            return data.admin
        }
    })
    return[isTrainer,isTrainerLoading, refetch]
};

export default useTrainer;