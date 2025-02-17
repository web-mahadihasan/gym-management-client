import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import DashboardLayout from "@/layouts/Dashboard";
import CreateTrainer from "@/pages/Dashboard/AdminDashboard/CreateTrainer/CreateTrainer";
import MyBookings from "@/pages/Dashboard/UserDashboard/MyBooking/MyBooking";
import BookClasses from "@/pages/Dashboard/UserDashboard/BookClasses/BookClasses";
import TrainerDashboard from "@/pages/Dashboard/TrainerDashboard/AssignClass";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {
                path: "/",
                element: <LoginPage/>
            },
            {
                path: "/auth/login",
                element: <LoginPage/>
            },
            {
                path: "/auth/registration",
                element: <RegistrationPage/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                path: "/dashboard/admin/create-trainer",
                element: <CreateTrainer/>
            },
            {
                path: "/dashboard/trainer/assign-class",
                element: <TrainerDashboard />
            },
            {
                path: "/dashboard/user/my-booking",
                element: <MyBookings />
            },
            {
                path: "/dashboard/user/book-class",
                element: <BookClasses />
            }
        ]
    }
])

export default Router;