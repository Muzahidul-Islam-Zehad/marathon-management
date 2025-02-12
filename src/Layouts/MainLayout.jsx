import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useContext } from "react";
import { contextProvider } from "../Providers/AuthProvider";

const MainLayout = () => {
    const {isDark} = useContext(contextProvider);
    return (
        <div className={`${isDark ? `bg-[#1e1e1e]` : `bg-slate-200`}`}>
            <div className="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>
            <div className="min-h-[calc(100vh-366.8px)]">
                <Outlet></Outlet>
            </div>
            <div id="footer">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;