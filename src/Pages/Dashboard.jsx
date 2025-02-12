import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";

const Dashboard = () => {
    const location = useLocation();
    const {isDark} = useContext(contextProvider);
    const link = <>
        <li className={`font-bold text-lg hidden lg:block`}>
            <p className={`text-4xl font-bold ${isDark ? `text-[#d69327]`: 'text-primary'}`}>Dashboard</p>
        </li>
        <li className={`${location.pathname === '/dashboard' ? ` text-white rounded-lg ${isDark ? `bg-[#d69327]`:`bg-primary`}` : `${isDark? `text-[#d69327]`: `text-gray-800`}`}`}>
            <Link to="/dashboard"> <span className="text-xl"><IoMdAddCircleOutline /></span>Add Marathon</Link>
        </li>
        <li className={`${location.pathname === '/dashboard/my-marathon-list' ? ` text-white rounded-lg ${isDark ? `bg-[#d69327]`:`bg-primary`}` : `${isDark? `text-[#d69327]`: `text-gray-800`}`}`}>
            <Link to="/dashboard/my-marathon-list"><span className="text-xl"><MdOutlineFormatListNumbered /></span> My Marathon List</Link>
        </li>
        <li className={`${location.pathname === '/dashboard/my-apply-list' ? ` text-white rounded-lg ${isDark ? `bg-[#d69327]`:`bg-primary`}` : `${isDark? `text-[#d69327]`: `text-gray-800`}`}`}>
            <Link to="/dashboard/my-apply-list" > <span className="text-xl"><LuListTodo /></span>My Apply List</Link>
        </li>
    </>
    return (
        <div>

            <div className="flex justify-between">

                {/* Dropdown Menu for small devices */}
                <div className="lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className={`btn text-white border-none m-4 ${isDark? `bg-[#d69327]`: `bg-primary`}`}>
                            <GiHamburgerMenu />
                        </label>
                        <ul tabIndex={0} className={`dropdown-content menu p-2 shadow rounded-box w-52 z-10 ${isDark ? 'bg-[#444242]': `bg-base-200`}`}>
                            {link}
                        </ul>
                    </div>
                </div>

                {/* title of small and medium device */}
                <div className={`font-bold text-lg block lg:hidden my-4`}>
                    <p className={`text-4xl font-bold ${isDark ? `text-[#d69327]`: 'text-primary'}`}>Dashboard</p>
                </div>

                <div>
                    {/* do not delete [dummie div for proper flex] */}
                </div>
            </div>

            <div className="flex">
                {/* Sidebar for medium and larger devices */}
                <div className={`hidden lg:block w-3/12  min-h-screen p-4 ${isDark ? 'bg-[#444242]': `bg-base-200`}`}>
                    <ul className="menu text-base-content">
                        {link}
                    </ul>
                </div>
                {/* Main content area */}
                <div className="w-11/12 mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
