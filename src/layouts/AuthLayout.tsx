import { Outlet } from "react-router";
import { Toaster } from 'react-hot-toast';

const AuthLayout = () => {
    return (
        <div className="font-inter">
            <Toaster />
            <Outlet/>
        </div>
    );
};

export default AuthLayout;