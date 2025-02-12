import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
    const { user, logOut, isDark, setIsDark } = useContext(contextProvider);

    const handleLogOut = () => {
        logOut();
    };

    return (
        <nav className={`bg-opacity-75 backdrop-blur-lg shadow-md ${isDark ? 'bg-[#121212] text-gray-200' : 'bg-base-100 text-neutral'}`}>
            {/* Logo */}
            <div className="w-11/12 mx-auto flex justify-between gap-2 items-center pt-4">
                <Link to="/" className={`text-xl md:text-2xl font-bold ${isDark ? 'text-[#d69327]' : 'text-primary'}`}>
                    Marathon Management
                </Link>
                <div className="flex items-center justify-end gap-4 w-2/3 md:w-1/2">
                    {user?.email ? (
                        <div className="flex gap-2">
                            <button
                                className={`px-2 md:px-3 py-1 md:py-2 rounded-lg text-white text-sm md:text-base mr-2 ${isDark ? 'bg-red-700' : 'bg-error'}`}
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
                        </div>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `btn btn-outline mr-2 ${isActive ? `${isDark ? 'bg-[#d69327] text-gray-900' : 'bg-primary text-white'}` : isDark ? 'text-gray-300' : 'text-neutral'}`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `btn btn-outline mr-2 ${isActive ? `${isDark ? 'bg-[#d69327] text-gray-900' : 'bg-primary text-white'}` : isDark ? 'text-gray-300' : 'text-neutral'}`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    <div>
                        <button onClick={() => setIsDark(!isDark)} type="button" className={`text-md md:text-2xl w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-slate-100 text-gray-800'}`}>
                            {isDark ? <MdLightMode /> : <MdDarkMode />}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-11/12 mx-auto flex flex-wrap justify-between items-center py-2">
                {/* Links */}
                <div className="flex flex-wrap md:space-x-4 mt-2 md:mt-0">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isActive ? `${isDark ? 'bg-[#d69327] text-white' : 'bg-primary text-white'}` : isDark ? 'text-[#d69327]' : 'text-neutral'}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/marathons"
                        className={({ isActive }) =>
                            `${user?.email ? 'block' : 'hidden'} px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isActive ? `${isDark ? 'bg-[#d69327] text-white' : 'bg-primary text-white'}` : isDark ? 'text-[#d69327]' : 'text-neutral'}`
                        }
                    >
                        Marathons
                    </NavLink>

                    {/* Conditional Links */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${user?.email ? 'block' : 'hidden'} px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isActive ? `${isDark ? 'bg-[#d69327] text-white' : 'bg-primary text-white'}` : isDark ? 'text-[#d69327]' : 'text-neutral'}`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <a href="#footer" className={`px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isDark ? 'text-[#d69327]' : 'text-neutral'}`}>
                        About Us
                    </a>
                    <a href="#footer" className={`px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isDark ? 'text-[#d69327]' : 'text-neutral'}`}>
                        Contact Us
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
