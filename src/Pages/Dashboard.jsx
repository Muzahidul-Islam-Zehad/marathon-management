import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    const link = <>
        <li className={`font-bold text-lg hidden lg:block`}>
            <p className="text-2xl font-bold text-primary">Dashboard</p>
        </li>
        <li className={`${location.pathname === '/dashboard' && 'bg-blue-600 text-white rounded-lg'}`}>
            <Link to="/dashboard"> <span className="text-xl"><IoMdAddCircleOutline /></span>Add Marathon</Link>
        </li>
        <li className={`${location.pathname === '/dashboard/my-marathon-list' && 'bg-blue-600 text-white rounded-lg'}`}>
            <Link to="/dashboard/my-marathon-list"><span className="text-xl"><MdOutlineFormatListNumbered /></span> My Marathon List</Link>
        </li>
        <li className={`${location.pathname === '/dashboard/my-apply-list' && 'bg-blue-600 text-white rounded-lg'}`}>
            <Link to="/dashboard/my-apply-list" > <span className="text-xl"><LuListTodo /></span>My Apply List</Link>
        </li>
    </>
    return (
        <div>

            <div className="flex justify-between">

                {/* Dropdown Menu for small devices */}
                <div className="lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-primary m-4">
                            <GiHamburgerMenu />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 z-10">
                            {link}
                        </ul>
                    </div>
                </div>

                {/* title of small and medium device */}
                <div className={`font-bold text-lg block lg:hidden my-4`}>
                    <p className="text-4xl font-bold text-primary">Dashboard</p>
                </div>

                <div>
                    {/* do not delete [dummie div for proper flex] */}
                </div>
            </div>

            <div className="flex">
                {/* Sidebar for medium and larger devices */}
                <div className="hidden lg:block w-3/12 bg-base-200 min-h-screen p-4">
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
