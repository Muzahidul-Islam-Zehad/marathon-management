import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
    const link = <>
        <li className={`font-bold text-lg`}>
            <p className="text-2xl font-bold">Dashboard</p>
        </li>
        <li className={`${location.pathname === '/dashboard' && 'bg-blue-600 text-white rounded-lg'}`}>
            <Link to="/dashboard">Add Marathon</Link>
        </li>
        <li className={`${location.pathname === '/dashboard/my-marathon-list' && 'bg-blue-600 text-white rounded-lg'}`}>
            <Link to="/dashboard/my-marathon-list">My Marathon List</Link>
        </li>
        <li className={`${location.pathname === '/dashboard/my-apply-list' && 'bg-blue-600 text-white rounded-lg'}`}>
            <Link to="/dashboard/my-apply-list" >My Apply List</Link>
        </li>
    </>
    return (
        <div>
            {/* Dropdown Menu for small devices */}
            <div className="lg:hidden">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-primary m-4">
                        Open Menu
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52 z-10">
                        {link}
                    </ul>
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
