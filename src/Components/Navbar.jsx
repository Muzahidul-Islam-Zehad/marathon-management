import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(contextProvider);

    const handleLogOut = () => {
        logOut();
    };

    return (
        <nav className="bg-base-100 shadow-md">
            <div className="w-11/12 mx-auto flex flex-wrap justify-between items-center py-2">
                {/* Logo */}
                <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
                    Marathon Management
                </Link>

                {/* Links */}
                <div className="flex flex-wrap space-x-2 md:space-x-4 mt-2 md:mt-0">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/marathons"
                        className={({ isActive }) =>
                            ` px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        
                        }
                    >
                        Marathons
                    </NavLink>

                    {/* Conditional Links */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            ` ${user?.email? 'block':'hidden'} px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    {user?.email ? (
                        <>
                            <button
                                className="px-2 md:px-3 py-1 md:py-2 rounded-lg bg-error text-white text-sm md:text-base"
                                onClick={handleLogOut}
                            >
                                Logout
                            </button>
                            <img
                                referrerPolicy="no-referrer"
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-neutral"
                            />
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base ${isActive ? "bg-primary text-white" : "text-neutral"
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base ${isActive ? "bg-primary text-white" : "text-neutral"
                                    }`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
