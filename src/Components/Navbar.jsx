import { useContext,  } from "react";
import { Link, NavLink } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
    const { user, logOut ,isDark, setIsDark } = useContext(contextProvider);
    

    const handleLogOut = () => {
        logOut();
    };

    return (
        <nav className="bg-base-100 bg-opacity-75 backdrop-blur-lg shadow-md">
            {/* Logo */}
            <div className="w-11/12 mx-auto flex justify-between gap-2 items-center pt-4">
                <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
                    Marathon Management
                </Link>
                <div className="flex items-center justify-end gap-4 w-2/3 md:w-1/2">
                    {user?.email ? (
                        <div className="flex gap-2">
                            <button
                                className="px-2 md:px-3 py-1 md:py-2 rounded-lg bg-error text-white text-sm md:text-base mr-2"
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
                        </div >
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `btn btn-outline mr-2 ${isActive ? "bg-primary text-white" : "text-neutral"
                                    }`
                                }

                            // px-2 md:px-3 py-1 md:py-2  rounded-lg text-sm md:text-base mr-2

                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `btn btn-outline ${isActive ? "bg-primary text-white" : "text-neutral"
                                    }`
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}

                    <div className="">
                        <button onClick={()=>setIsDark(!isDark)} type="button" className="text-md md:text-2xl w-10 h-10 md:w-12 md:h-12 bg-slate-100 flex justify-center items-center rounded-full">
                            {
                                isDark ? <MdLightMode /> : <MdDarkMode />
                            }
                            
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-11/12 mx-auto flex flex-wrap justify-between items-center py-2">


                {/* Links */}
                <div className="flex flex-wrap  md:space-x-4 mt-2 md:mt-0">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/marathons"
                        className={({ isActive }) =>
                            `${user?.email ? 'block' : 'hidden'}  px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`

                        }
                    >
                        Marathons
                    </NavLink>

                    {/* Conditional Links */}
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            ` ${user?.email ? 'block' : 'hidden'} px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2 ${isActive ? "bg-primary text-white" : "text-neutral"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <a href="#footer" className={
                        `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2`
                    }>
                        About Us
                    </a>
                    <a href="#footer" className={
                        `px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base mr-2`
                    }>
                        Contact Us
                    </a>

                    {/* <div className="hidden lg:block">
                        {user?.email ? (
                            <>
                                <button
                                    className="px-2 md:px-3 py-1 md:py-2 rounded-lg bg-error text-white text-sm md:text-base mr-2"
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
                                        `px-2 md:px-3 py-1 md:py-2  rounded-lg text-sm md:text-base mr-2 ${isActive ? "bg-primary text-white" : "text-neutral"
                                        }`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `px-2 md:px-3 py-1 md:py-2  rounded-lg text-sm md:text-base mr-2 ${isActive ? "bg-primary text-white" : "text-neutral"
                                        }`
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div> */}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
