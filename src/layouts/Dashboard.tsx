import * as React from "react";
import { Outlet } from "react-router";
import { HiMenu } from "react-icons/hi";
import DashboardSidebar from "@/pages/Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);


  return (
    <div className="w-full font-inter">
      <div className="lg:flex min-h-screen relative">
        {/* Sidebar */}
        <div className={`relative dark:bg-background dark:text-white lg:sticky top-0 z-50 w-[350px]`}>
          <div
            className={`absolute z-40 bg-white w-[70%] sm:w-[50%] md:w-[70%] ${
              openSidebar ? "left-0 top-0 min-h-screen" : "-left-3/4"
            } dark:bg-background lg:w-full lg:static lg:min-h-screen lg:block duration-700 transition-all`}
          >
            <DashboardSidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
          </div>
        </div>

        {/* Content section */}
        <main className="w-full lg:col-span-4 overflow-y-auto h-screen">
          {/* Dashboard nav */}
          <div className="h-14 shadow-md sticky top-0 bg-white/70 backdrop-blur-xl z-40 dark:bg-gray-800">
            <nav className="z-40 flex items-center justify-between h-full max-w-[95%] pl-2">
              <div className="flex items-center gap-2">
                <button onClick={() => setOpenSidebar(true)} className="p-2 lg:hidden">
                  <HiMenu size={26} />
                </button>
                <h3 className="text-2xl font-lexend font-bold px-4">Gym Management System</h3>
              </div>
            </nav>
          </div>
          <section className="max-w-6xl mx-auto px-4">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
