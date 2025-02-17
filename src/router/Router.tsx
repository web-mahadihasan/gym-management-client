import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegistrationPage from "../pages/auth/RegistrationPage";
import DashboardLayout from "@/layouts/Dashboard";
import MyBookings from "@/pages/Dashboard/UserDashboard/MyBooking/MyBooking";
import BookClasses from "@/pages/Dashboard/UserDashboard/BookClasses/BookClasses";
import TrainerDashboard from "@/pages/Dashboard/TrainerDashboard/AssignClass";
import PrivateRoute from "./PrivateRoute";
import ClassSchedules from "@/pages/Dashboard/AdminDashboard/ClassScheduls/ClassScheduls";
import ManageUsers from "@/pages/Dashboard/AdminDashboard/CreateNewTrainer/CreateNewTrainer";
import CreateNewTrainer from "@/pages/Dashboard/AdminDashboard/CreateNewTrainer/CreateNewTrainer";
import ManageTrainers from "@/pages/Dashboard/AdminDashboard/ManageTrainer/ManageTrainer";

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
        element: <PrivateRoute ><DashboardLayout/></PrivateRoute>,
        children: [
            {
                path: "/dashboard/admin/create-trainer",
                element: <CreateNewTrainer />
            },
            {
                path: "/dashboard/admin/class-scheduls",
                element: <ClassSchedules />
            },
            {
                path: "/dashboard/admin/manage-trainer",
                element: <ManageTrainers />
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