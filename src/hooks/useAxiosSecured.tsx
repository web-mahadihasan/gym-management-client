import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";


const token = localStorage.getItem("token");

export const axiosSecured = axios.create({
    baseURL: 'https://gym-management-server-bd.vercel.app',
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const useAxiosSecured = () => {
    const navigate = useNavigate()
    const {logout} = useAuth()

    axiosSecured.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token')
        config.headers.authorization = (`Bearer ${token}`);
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

    // Log out user by Axios resoponse
    axiosSecured.interceptors.response.use(function (response) {
        return response;
      }, async(error)=> {
        const status = error?.response?.status
        
        // Handle 401 and 403 error code 
        if(status === 401 || status === 403){
            await logout()
            navigate("/auth/login")
        }
        return Promise.reject(error);
      }); 
    return axiosSecured
};

export default useAxiosSecured;