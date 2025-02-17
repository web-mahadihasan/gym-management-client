import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://gym-management-server-bd.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;