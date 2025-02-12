import axios from "axios";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { contextProvider } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddMarathon = () => {
    const [startRegistration, setStartRegistration] = useState(null);
    const [endRegistration, setEndRegistration] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const { user, isDark } = useContext(contextProvider);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddMarathon = async e => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const distance = form.distance.value;
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;

        const addMarathonData = {
            title,
            startRegistration,
            endRegistration,
            startDate,
            distance,
            location,
            description,
            image,
            createdAt: new Date(),
            totalRegistrationCount: 0,
            email: user.email

        };


        const { data } = await axios.post(`${import.meta.env.VITE_url}/marathons/?uEmail=${user.email}`, addMarathonData, { withCredentials: true })
        if (data.acknowledged) {
            Swal.fire({
                title: "Marathon Added!",
                text: "Your marathon has been added.",
                icon: "success"
            });

            navigate('/dashboard/my-marathon-list');
            setLoading(false);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-md lg:my-10 ${isDark ? 'bg-[#444242]': `bg-base-200`}`}>

            <Helmet>
                <title>Add Marathon | Dashboard | Marathon Managemnet</title>
            </Helmet>

            <h2 className={`text-2xl font-bold text-center mb-6 ${isDark ? `text-[#d69327]`: `text-primary`}`}>Create a New Marathon</h2>

            <form onSubmit={handleAddMarathon}>
                {/* Marathon Title */}
                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className={`label-text ${isDark && `text-[#d69327]`}`}>Marathon Title</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter marathon title"
                        className={`input input-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                        required
                    />
                </div>

                {/* Dates and Running Distance in 2 rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Registration Date */}
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text ${isDark && `text-[#d69327]`}`}>Start Registration Date</span>
                        </label>
                        <DatePicker
                            selected={startRegistration}
                            onChange={(date) => setStartRegistration(date)}
                            className={`input input-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                            placeholderText="Select start date"
                            required
                        />
                    </div>

                    {/* End Registration Date */}
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text ${isDark && `text-[#d69327]`}`}>End Registration Date</span>
                        </label>
                        <DatePicker
                            selected={endRegistration}
                            onChange={(date) => setEndRegistration(date)}
                            className={`input input-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                            placeholderText="Select end date"
                            required
                        />
                    </div>

                    {/* Marathon Start Date */}
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text ${isDark && `text-[#d69327]`}`}>Marathon Start Date</span>
                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className={`input input-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                            placeholderText="Select start date"
                            required
                        />
                    </div>

                    {/* Running Distance */}
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text ${isDark && `text-[#d69327]`}`}>Running Distance</span>
                        </label>
                        <select
                            className={`select select-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                            name="distance"
                            defaultValue='Select distance'
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
                        <span className={`label-text ${isDark && `text-[#d69327]`}`}>Location</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Enter location"
                        className={`input input-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className={`label-text ${isDark && `text-[#d69327]`}`}>Description</span>
                    </label>
                    <textarea
                        className={`textarea textarea-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                        name="description"
                        placeholder="Enter a description of the marathon"
                        required
                    ></textarea>
                </div>

                {/* Marathon Image URL */}
                <div className="form-control mb-4 w-full">
                    <label className="label">
                        <span className={`label-text ${isDark && `text-[#d69327]`}`}>Marathon Image URL</span>
                    </label>
                    <input
                        type="url"
                        name="image"
                        placeholder="Enter image URL"
                        className={`input input-bordered w-full ${isDark && `bg-[#282006] text-slate-200`}`}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="form-control">
                    <button type="submit" disabled={loading} className={`btn  ${isDark ? `btn-outline text-[#d69327] bg-[#1e1e1e] hover:bg-[#d69327] hover:text-white`: `btn-primary`}`}>Add Marathon</button>
                </div>
            </form>
        </div>
    );
};

export default AddMarathon;
