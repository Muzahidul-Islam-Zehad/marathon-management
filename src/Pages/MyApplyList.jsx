/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const MyApplyList = () => {
    const { user } = useContext(contextProvider);
    const [myApply, setMyApply] = useState([]);
    useEffect(() => {
        const fethcing = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_url}/my-marathon?email=${user.email}`)
            setMyApply(data);
        }
        fethcing()
    }, [setMyApply, user.email])


    const handleDelete = async (id, marathonId) => {
        const { data } = await axios.delete(`${import.meta.env.VITE_url}/applied-marathons/${id}?marathonId=${marathonId}`,);
        const newMyApply = myApply.filter(a => a._id !== id);
        setMyApply(newMyApply);
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">My Applied Marathons</h2>

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
                        {/* Example Row */}

                        {
                            myApply?.map((apply, idx) => <tr key={apply._id}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{idx + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{apply.title}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{apply.startDate}</td>
                                <td className="border flex flex-col md:flex-row gap-2 justify-center items-center border-gray-300 px-4 py-2 text-center space-x-2">
                                    <Link to={`/dashboard/my-apply-list/update/${apply._id}`}>
                                        <button
                                            className="btn btn-sm btn-primary w-20"
                                        >
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
                            </tr>)
                        }


                        {/* Additional rows will be dynamically rendered */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyApplyList;
