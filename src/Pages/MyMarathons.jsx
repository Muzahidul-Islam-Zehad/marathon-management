/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyMarathonsList = () => {
    const { user } = useContext(contextProvider);
    const [myMarathon, setMyMarathon] = useState([]);
    const [fetch, setFetch] = useState(true);

    useEffect(() => {
        const fetching = async () => {
            setFetch(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_url}/marathons/my-marathon?email=${user.email}`,
                { withCredentials: true }
            );
            setMyMarathon(data);
            setFetch(false);
        };
        fetching();
    }, [user.email]);

    const handleDelete =(id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_url}/marathons/${id}`);
                const newMyMarathon = myMarathon.filter((m) => m._id !== id);
                setMyMarathon(newMyMarathon);

                Swal.fire({
                    title: "Deleted!",
                    text: "Your marathon has been deleted.",
                    icon: "success"
                });
            }
        });

    };

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-2xl font-semibold mb-4">My Marathons</h1>

            {fetch ? (
                <div className="flex items-center justify-center w-full">
                    <span className="loading loading-infinity w-20"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    {/* Table container to allow horizontal scrolling */}
                    <table className="table-auto min-w-max w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2">Total Registrations</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myMarathon?.map((marathon, idx) => (
                                <tr key={marathon._id}>
                                    <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{marathon.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{marathon.location}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {format(new Date(marathon?.startDate), "yyyy/MM/dd")}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {marathon.totalRegistrationCount}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        <Link to={`/dashboard/my-marathon-list/update/${marathon._id}`}>
                                            <button className="btn btn-sm btn-primary">Update</button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(marathon._id)}
                                            className="btn btn-sm btn-error"
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

export default MyMarathonsList;
