import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-700">
            <p className="text-7xl text-red-600 font-bold">404</p>
            <p className="text-xl italic text-gray-300">Page not found</p>
            <Link to={-1} className="mt-6">
                <button className="btn btn-primary text-white">Back</button>
            </Link>
        </div>
    );
};

export default ErrorPage;