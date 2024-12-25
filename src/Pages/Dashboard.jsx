
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            {/* Drawer for small devices */}
            <div className="md:hidden drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content */}
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button m-4">
                        Open Menu
                    </label>

                </div>
                {/* <div className="p-4">
                    <Outlet />
                </div> */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
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
