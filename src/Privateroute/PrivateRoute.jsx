import { useContext } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(contextProvider);
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-screen w-full">
            <span className="loading loading-infinity w-20"></span>
        </div>
    }
    if (!user?.email) {
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }

    return (

        <div>
            {children}
        </div>
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.element
}

export default PrivateRoute;