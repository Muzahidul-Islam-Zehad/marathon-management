/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const UpdateMarathon = () => {
    const [startRegistration, setStartRegistration] = useState(null);
    const [endRegistration, setEndRegistration] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const { id } = useParams();
    const [update, setUpdate] = useState({});
    const navigate = useNavigate();
    const { user } = useContext(contextProvider);
    const [fetch, setFetch] = useState(true);

    useEffect(() => {
        const fetching = async () => {
            setFetch(true);
            const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons/${id}?email=${user.email}`, { withCredentials: true });
            setUpdate(data);
            setStartRegistration(new Date(data.startRegistration));
            setEndRegistration(new Date(data.endRegistration));
            setStartDate(new Date(data.startDate));
            setFetch(false);
        };
        fetching();
    }, [id, user.email]);


    const handleUpdateMarathon = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const distance = form.distance.value;
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;

        const updateMarathonData = {
            title,
            startRegistration,
            endRegistration,
            startDate,
            distance,
            location,
            description,
            image,

        };

        const { data } = await axios.patch(`${import.meta.env.VITE_url}/marathons/${id}`, updateMarathonData);
        navigate('/dashboard/my-marathon-list');
        if (data.acknowledged) {
            Swal.fire({
                title: "Update Successful!",
                text: "You have updated your marathon.",
                icon: "success"
            });
        }

    }

    return (
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

                        <form onSubmit={handleUpdateMarathon}>
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
                                <button type="submit" className="btn btn-primary w-full">Add Marathon</button>
                            </div>
                        </form>
                }
            </div>
        </div>
    );
};

export default UpdateMarathon;