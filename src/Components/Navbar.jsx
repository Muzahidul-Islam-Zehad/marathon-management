
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(contextProvider);

    const handleLogOut = () => {
        logOut()
    }

    return (
        <nav className="bg-base-100 shadow-md">
            <div className="w-11/12 mx-auto flex justify-between items-center py-2">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary">
                    Marathon Management
                </Link>

                {/* Links */}
                <div className="flex space-x-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/marathons"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Marathons
                    </NavLink>

                    {/* Conditional Links */}
                    {/* Replace the `isLoggedIn` variable with your state or context */}

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    {
                        user?.email ?

                            <>
                                <button
                                    className="px-3 py-2 rounded-lg bg-error text-white"
                                    onClick={handleLogOut}
                                >
                                    Logout
                                </button>
                                <img
                                    referrerPolicy="no-referrer"
                                    src={user.photoURL}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border border-neutral"
                                />
                            </>

                            :

                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-neutral"
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-lg ${isActive ? "bg-primary text-white" : "text-neutral"
                                        }`
                                    }
                                >
                                    Register
                                </NavLink>
                            </>

                    }


                </div>
            </div>
        </nav>
    );
};

export default Navbar;
