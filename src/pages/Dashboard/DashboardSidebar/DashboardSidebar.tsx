import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "react-router";
import { Icon } from '@iconify/react/dist/iconify.js';


const DashboardSidebar = ({setOpenSidebar, openSidebar}) => {
    const {user, logout} = useAuth()

    const addminRoutes = [
        {name: "Create Trainer", path: "/dashboard/admin/create-trainer",  icon: <Icon icon="clarity:users-line" width="26" height="26" />},
        {name: "Manage Trainer", path: "/dashboard/admin/manage-trainer",  icon: <Icon icon="humbleicons:user-add" width="26" height="26" />},
        {name: "Schedule Class", path: "/dashboard/admin/class-scheduls",  icon: <Icon icon="ri:record-mail-line" width="26" height="26" />},
    ]
    const trainerRoutes = [
        {name: "Assign Class", path: "/dashboard/trainer/assign-class",  icon: <Icon icon="mingcute:classify-2-line" width="26" height="26" />},
    ]
    const traineeRoutes = [
        {name: "Book Class", path: "/dashboard/user/book-class",  icon: <Icon icon="hugeicons:activity-04" width="26" height="26" />},
        {name: "Manage Profile", path: "/dashboard/user/profile",  icon: <Icon icon="simple-line-icons:badge" width="26" height="26" />},
        {name: "My Booking", path: "/dashboard/user/my-booking",  icon: <Icon icon="mdi:user-check-outline" width="26" height="26" />},
    ]

    return (
        <div className={`min-h-screen border font-poppins flex flex-col justify-between h-full p-3 px-6 w-full dark:bg-yellow text-black/80 font-inter`}>
        <div className="space-y-6">
            <div className="relative">
                <div className='flex items-center gap-2'>
                    <h3 className="text-2xl font-inter font-bold px-2 py-2 capitalize ">Dashboard {user?.role}</h3>
                </div>
                <div onClick={() => setOpenSidebar(false)} className='absolute -right-8 top-3'>
                    <Icon icon="octicon:sidebar-collapse-24" width="24" height="24" />
                </div>
            </div>
            
            <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-3 text-sm">
                     {/* Admin Routes  */}
                    {
                       user && user?.role === "admin" && addminRoutes.map(link =>   
                            <li className="rounded-sm dashboard text-base hover:bg-gray-200" key={link.name}>
                                <NavLink to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                    <span className='text-purple-500 font-inter'>{link.icon}</span>
                                    <span>{link.name}</span>
                                </NavLink>
                            </li>
                        )
                    }
                    {/* Trainer Routes  */}
                    {
                       user && user?.role === "trainer" && trainerRoutes.map(link =>   
                            <li className="rounded-sm dashboard text-base hover:bg-gray-200" key={link.name}>
                                <NavLink to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                    <span className='text-purple-500 font-inter'>{link.icon}</span>
                                    <span>{link.name}</span>
                                </NavLink>
                            </li>
                        )
                    }
                    {/* user Routes  */}
                    {
                       user && user?.role !== "trainer" && user?.role !== "admin" && traineeRoutes.map(link =>   
                            <li className="rounded-sm dashboard text-base hover:bg-gray-200" key={link.name}>
                                <NavLink to={link.path} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md dark:text-gray-300">
                                    <span className='text-purple-500 font-inter'>{link.icon}</span>
                                    <span>{link.name}</span>
                                </NavLink>
                            </li>
                        )
                    }

                
                </ul>
            </div>
        </div>

        {/* Profile iamge */}
        {/* <div
            className={`${isCollapse ? "justify-between" : "justify-center"} bg-gray-100 py-3 px-[20px] flex items-center mt-10 dark:bg-gray-800`}>
            <div className="flex items-center gap-[10px]">
                <img
                    src={user?.photoURL}
                    alt="avatar" className="w-[33px] h-[33px] cursor-pointer rounded-full object-cover"/>
                <h3 className={`${isCollapse ? "inline" : "hidden"} text-[0.9rem] text-gray-800 font-[500] dark:text-white/80`}>{user?.displayName}</h3>
            </div>

            <div className={`${isCollapse ? "inline" : "hidden"} relative group`}>
                <BsThreeDots className="text-[1.2rem] text-gray-500 cursor-pointer"/>

                <ul className="translate-y-[20px] text-sm font-poppins font-normal h-20 opacity-0 justify-between z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute bottom-0 left-[30px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]">
                    <Link to={"/dashboard/user/profile"}>
                    <li className="flex items-center gap-[7px] text-gray-600 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
                        <RiAccountCircleLine/>
                        Profile
                    </li>
                    </Link>
                    <li onClick={handleSignOut} className="flex items-center gap-[7px] text-[0.9rem] text-red-500 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
                        <CiLogout/>
                        Logout
                    </li>
                </ul>
            </div>
        </div> */}
    </div>
    );
};

export default DashboardSidebar;