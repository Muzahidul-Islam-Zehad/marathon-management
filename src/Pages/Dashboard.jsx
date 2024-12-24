
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar Navigation */}
            <nav className="w-64 bg-gray-100 p-6 border-r">
                <ul className="space-y-4">
                    <li>
                        <Link to="add-marathon" className="text-blue-600 hover:text-blue-800">
                            Add Marathon
                        </Link>
                    </li>
                    <li>
                        <Link to="my-marathons" className="text-blue-600 hover:text-blue-800">
                            My Marathon List
                        </Link>
                    </li>
                    <li>
                        <Link to="my-applies" className="text-blue-600 hover:text-blue-800">
                            My Apply List
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Content Section */}
            <main className="flex-1 p-6 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
