/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDateToYYYYMMDD } from "../Utils/dateFormater";

const MyApplyList = () => {
    const { user } = useContext(contextProvider);
    const [myApply, setMyApply] = useState([]);
    const [fetch, setFetch] = useState(true);

    useEffect(() => {
        const fethcing = async () => {
            setFetch(true);
            const { data } = await axios.get(`${import.meta.env.VITE_url}/my-appliedMarathon?email=${user.email}`, { withCredentials: true });
            setMyApply(data);
            setFetch(false);
        };
        fethcing();
    }, [setMyApply, user.email]);

    const handleDelete = async (id, marathonId) => {
        const { data } = await axios.delete(`${import.meta.env.VITE_url}/applied-marathons/${id}?marathonId=${marathonId}`);
        const newMyApply = myApply.filter(a => a._id !== id);
        setMyApply(newMyApply);
    };

    const handleSearch = async (e) => {
        const search = e.target.value;
        const { data } = await axios.get(`${import.meta.env.VITE_url}/my-appliedMarathon?email=${user.email}&search=${search}`, { withCredentials: true });
        setMyApply(data);
    };

    return (
        <div className="w-11/12 mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Applied Marathons</h2>
            <label className="input input-bordered flex items-center gap-2 my-2 w-full sm:w-1/2">
                <input
                    type="text"
                    onChange={handleSearch}
                    className="grow"
                    placeholder="Search"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            {fetch ? (
                <div className="flex items-center justify-center w-full">
                    <span className="loading loading-infinity w-20"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
                                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myApply?.map((apply, idx) => (
                                <tr key={apply._id}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {idx + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {apply.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {formatDateToYYYYMMDD(apply.startDate)}
                                    </td>
                                    <td className="border flex flex-col md:flex-row gap-2 justify-center items-center border-gray-300 px-4 py-2 text-center md:space-x-2">
                                        <Link to={`/dashboard/my-apply-list/update/${apply._id}`}>
                                            <button className="btn btn-sm btn-primary w-20">
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-error w-20"
                                            onClick={() => handleDelete(apply._id, apply.marathonId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyApplyList;
