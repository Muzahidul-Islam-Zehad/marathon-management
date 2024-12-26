import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateApply = () => {
    const { user } = useContext(contextProvider);
    const { id } = useParams();
    const [update, setUpdate] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fethcing = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_url}/applied-marathons/${id}`)
            setUpdate(data);
        }
        fethcing()
    }, [id])
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const contactNumber = form.contactNumber.value;
        const additionalInfo = form.additionalInfo.value; 

        const submittionData = {
            email: user.email,
            title: update.title,
            startDate: update.startDate,
            name : {firstName, lastName},
            contactNumber,
            additionalInfo,
            marathonId : id
        }

        console.log(submittionData);
        const { data } = await axios.put(`${import.meta.env.VITE_url}/applied-marathons/${id}`,submittionData);
        console.log(data);
        navigate('/dashboard/my-apply-list');

    }


    return (
        <div>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
                <h2 className="text-2xl font-bold text-center mb-6">Update Marathon Registration</h2>

                <form onSubmit={handleFormSubmit}>
                    {/* Email */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            defaultValue={user.email}
                            type="email"
                            name="email"
                            className="input input-bordered w-full"
                            placeholder="Your email"
                            readOnly
                        />
                    </div>

                    {/* Marathon Title */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Marathon Title</span>
                        </label>
                        <input
                            defaultValue={update.title}
                            type="text"
                            name="marathonTitle"
                            className="input input-bordered w-full"
                            placeholder="Selected Marathon Title"
                            readOnly
                        />
                    </div>

                    {/* Marathon Start Date */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Marathon Start Date</span>
                        </label>
                        <input
                            defaultValue={update.startDate}
                            type="text"
                            name="startDate"
                            className="input input-bordered w-full"
                            placeholder="Marathon Start Date"
                            readOnly
                        />
                    </div>

                    {/* First Name */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            defaultValue={update?.name?.firstName}
                            type="text"
                            name="firstName"
                            className="input input-bordered w-full"
                            placeholder="Enter your first name"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            defaultValue={update?.name?.lastName}
                            type="text"
                            name="lastName"
                            className="input input-bordered w-full"
                            placeholder="Enter your last name"
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Contact Number</span>
                        </label>
                        <input
                            defaultValue={update.contactNumber}
                            type="tel"
                            name="contactNumber"
                            className="input input-bordered w-full"
                            placeholder="Enter your contact number"
                        />
                    </div>

                    {/* Additional Info */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Additional Information</span>
                        </label>
                        <textarea
                            defaultValue={update.additionalInfo}
                            name="additionalInfo"
                            className="textarea textarea-bordered w-full"
                            placeholder="Provide any additional details"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary w-full">
                            Submit Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateApply;