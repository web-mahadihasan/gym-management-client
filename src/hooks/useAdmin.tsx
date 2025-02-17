import { useQuery } from "@tanstack/react-query";
// import useAxiosSecured from "./useAxiosSecured";
import { useAuth } from "@/contexts/AuthContext";
import useAxiosSecured from "./useAxiosSecured";
import axios from "axios";

const useAdmin = () => {
    const {user} = useAuth()

    const axiosSecured = useAxiosSecured()

    const {data: isAdmin, isPending: isAdminLoading, refetch} = useQuery({
        queryKey: [user?.email, "useAdmin"],
        queryFn: async () => {
            const {data} = await axiosSecured.get(`/api/user/admin/${user.email}`)
            return data.admin
        }
    })
    return[isAdmin,isAdminLoading, refetch]
};

export default useAdmin;