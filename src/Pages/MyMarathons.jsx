/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";


const MyMarathonsList = () => {
    const { user } = useContext(contextProvider);
    const [myMarathon, setMyMarathon] = useState([]);

    useEffect(() => {
        const fethcing = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons?email=${user.email}`)
            setMyMarathon(data);
        }
        fethcing()
    }, [user.email])

    const handleDelete = async (id) => {
        const { data } = await axios.delete(`${import.meta.env.VITE_url}/marathons/${id}`,);
        const newMyMarathon = myMarathon.filter(m => m._id !== id);
        setMyMarathon(newMyMarathon);

    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">My Marathons</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
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
                        {/* Static Data Example */}

                        {
                            myMarathon?.map((marathon, idx) => <tr key={marathon._id}>
                                <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{marathon.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{marathon.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{format(new Date(marathon?.startDate), "yyyy/MM/dd")}</td>
                                <td className="border border-gray-300 px-4 py-2">{marathon.totalRegistrationCount}</td>
                                <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                    <Link to={`/dashboard/my-marathon-list/update/${marathon._id}`}>
                                        <button className="btn btn-sm btn-primary">Update</button>
                                    </Link>
                                    <button onClick={() => handleDelete(marathon._id)} className="btn btn-sm btn-error">Delete</button>
                                </td>
                            </tr>)
                        }



                        {/* Add dynamic rows here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMarathonsList;
