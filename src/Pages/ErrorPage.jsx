import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <p className="text-7xl text-red-600">404</p>
            <p className="text-xl italic">Page not found</p>
            <Link to={-1} className="mt-6">
                <button className="btn btn-accent text-white">back</button>
            </Link>
        </div>
    );
};

export default ErrorPage;