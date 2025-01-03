import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { fr } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";

const MyMarathonsList = () => {
    const { user } = useContext(contextProvider);
    const [myMarathon, setMyMarathon] = useState([]);
    const [fetch, setFetch] = useState(true);
    const [startRegistration, setStartRegistration] = useState(null);
    const [endRegistration, setEndRegistration] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [update, setUpdate] = useState({});

    useEffect(() => {
        const fetchMarathons = async () => {
            setFetch(true);
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_url}/marathons/my-marathon?email=${user.email}`,
                    { withCredentials: true }
                );
                setMyMarathon(data);
            } catch (error) {
                console.error("Error fetching marathons:", error);
            } finally {
                setFetch(false);
            }
        };
        fetchMarathons();
    }, [user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_url}/marathons/${id}`);
                    setMyMarathon(myMarathon.filter((m) => m._id !== id));
                    Swal.fire("Deleted!", "Your marathon has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting marathon:", error);
                }
            }
        });
    };

    const handleUpdate = async (id) => {
        try {

            setFetch(true);
            setUpdate({});
            setStartRegistration(null);
            setEndRegistration(null);
            setStartDate(null);

            const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons/${id}`, {
                withCredentials: true,
            });

            setUpdate(data);
            setStartRegistration(new Date(data.startRegistration));
            setEndRegistration(new Date(data.endRegistration));
            setStartDate(new Date(data.startDate));
        } catch (error) {
            console.error("Error fetching marathon for update:", error);
        }
        finally {
            setFetch(false);
            document.getElementById("my_modal_5").showModal();
        }
    };


    const handleUpdateMarathon = async (e) => {
        e.preventDefault();
        const { title, distance, location, description, image } = e.target.elements;

        const updateMarathonData = {
            title: title.value,
            startRegistration,
            endRegistration,
            startDate,
            distance: distance.value,
            location: location.value,
            description: description.value,
            image: image.value,
        };

        try {
            const { data } = await axios.patch(
                `${import.meta.env.VITE_url}/marathons/${update._id}`,
                updateMarathonData
            );
            if (data.acknowledged) {
                Swal.fire("Update Successful!", "Your marathon has been updated.", "success");
                setMyMarathon((prev) =>
                    prev.map((m) => (m._id === update._id ? { ...m, ...updateMarathonData } : m))
                );
                document.getElementById("my_modal_5").close();
            }
        } catch (error) {
            console.error("Error updating marathon:", error);
        }
    };

    return (
        <div className="w-11/12 mx-auto mt-6">

            <Helmet>
                <title>My Marathons | Dashboard | Marathon Managemnet</title>
            </Helmet>
            <h1 className="text-2xl font-semibold mb-4">My Marathons</h1>
            {fetch ? (
                <div className="flex items-center justify-center w-full">
                    <span className="loading loading-infinity w-20"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
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
                            {myMarathon.map((marathon, idx) => (
                                <tr key={marathon._id}>
                                    <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{marathon.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{marathon.location}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {format(new Date(marathon.startDate), "P", { locale: fr })}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {marathon.totalRegistrationCount}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(marathon._id)}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Update
                                        </button>
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

            {/* Update Modal */}


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="my-6">
                        <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-center mb-6">Update A Marathon</h2>

                            {
                                fetch
                                    ?
                                    <div className="flex items-center justify-center w-full">
                                        <span className="loading loading-infinity w-20"></span>
                                    </div>
                                    :

                                    <form onSubmit={handleUpdateMarathon} method="dialog">
                                        {/* Marathon Title */}
                                        <div className="form-control mb-4 w-full">
                                            <label className="label">
                                                <span className="label-text">Title</span>
                                            </label>
                                            <input
                                                defaultValue={update?.title}
                                                type="text"
                                                name="title"
                                                placeholder="Enter marathon title"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        {/* Dates and Running Distance in 2 rows */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Start Registration Date */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Start Registration</span>
                                                </label>
                                                <DatePicker

                                                    selected={startRegistration}
                                                    onChange={(date) => setStartRegistration(date)}
                                                    className="input input-bordered w-full"
                                                    placeholderText="Select start date"
                                                    required
                                                />
                                            </div>

                                            {/* End Registration Date */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">End Registration</span>
                                                </label>
                                                <DatePicker

                                                    selected={endRegistration}
                                                    onChange={(date) => setEndRegistration(date)}
                                                    className="input input-bordered w-full"
                                                    placeholderText="Select end date"
                                                    required
                                                />
                                            </div>

                                            {/* Marathon Start Date */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Start Date</span>
                                                </label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    className="input input-bordered w-full"
                                                    placeholderText="Select start date"
                                                    required
                                                />
                                            </div>

                                            {/* Running Distance */}
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Distance</span>
                                                </label>
                                                <select
                                                    className="select select-bordered w-full"
                                                    name="distance"
                                                    defaultValue={update?.distance}
                                                    required
                                                >
                                                    <option disabled>Select distance</option>
                                                    <option>25k</option>
                                                    <option>10k</option>
                                                    <option>3k</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="form-control mb-4 w-full">
                                            <label className="label">
                                                <span className="label-text">Location</span>
                                            </label>
                                            <input
                                                defaultValue={update?.location}
                                                type="text"
                                                name="location"
                                                placeholder="Enter location"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="form-control mb-4 w-full">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label>
                                            <textarea
                                                defaultValue={update?.description}
                                                className="textarea textarea-bordered w-full"
                                                name="description"
                                                placeholder="Enter a description of the marathon"
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Marathon Image URL */}
                                        <div className="form-control mb-4 w-full">
                                            <label className="label">
                                                <span className="label-text">Marathon Image URL</span>
                                            </label>
                                            <input
                                                defaultValue={update?.image}
                                                type="url"
                                                name="image"
                                                placeholder="Enter image URL"
                                                className="input input-bordered w-full"
                                                required
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="form-control">
                                            <button type="submit" className="btn btn-primary w-full">Update Marathon</button>
                                        </div>
                                    </form>
                            }
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default MyMarathonsList;
