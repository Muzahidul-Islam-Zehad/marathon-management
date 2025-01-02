import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            {/* Dropdown Menu for small devices */}
            <div className="md:hidden">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-primary m-4">
                        Open Menu
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                        <li className="font-bold text-lg">
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <Link to="/dashboard">Add Marathon</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-marathon-list">My Marathon List</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-apply-list">My Apply List</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar for medium and larger devices */}
                <div className="hidden md:block w-3/12 bg-base-200 min-h-screen p-4">
                    <ul className="menu text-base-content">
                        <li className="font-bold text-lg">
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <Link to="/dashboard">Add Marathon</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-marathon-list">My Marathon List</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/my-apply-list">My Apply List</Link>
                        </li>
                    </ul>
                </div>
                {/* Main content area */}
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
