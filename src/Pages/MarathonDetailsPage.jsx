import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { contextProvider } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const MarathonDetailsPage = () => {
    const { user } = useContext(contextProvider);
    const { id } = useParams();
    const [marathon, setMarathon] = useState({});
    const [openForm, setOpenForm] = useState(false);
    const [fetch, setFetch] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fethcing = async () => {
            setFetch(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_url}/marathons/${id}?email=${user.email}`,
                { withCredentials: true }
            );
            setMarathon(data);
            setFetch(false);
        };
        fethcing();
    }, [id, user.email]);

    const {
        image,
        title,
        location,
        startRegistration,
        endRegistration,
        startDate,
        description,
        totalRegistrationCount,
    } = marathon;

    const isRegistrationOpen = () => {
        const today = new Date();
        const startReg = new Date(startRegistration);
        const endReg = new Date(endRegistration);

        return today >= startReg && today <= endReg;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const contactNumber = form.contactNumber.value;
        const additionalInfo = form.additionalInfo.value;

        const submittionData = {
            email: user.email,
            title,
            startDate,
            name: { firstName, lastName },
            contactNumber,
            additionalInfo,
            marathonId: id,
        };

        const { data } = await axios.post(
            `${import.meta.env.VITE_url}/applied-marathons`,
            submittionData
        );
        if (data.acknowledged) {
            navigate("/dashboard/my-apply-list");
            Swal.fire({
                title: "Register Successful!",
                text: "You have registered for this marathon.",
                icon: "success"
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {fetch ? (
                <div className="flex items-center justify-center min-h-screen w-full">
                    <span className="loading loading-infinity w-20"></span>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row justify-center gap-3">
                    {/* Left: Marathon Details */}
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />

                        <h1 className="text-3xl font-bold mb-4">{title}</h1>
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Location:</span> {location}
                        </p>
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Start Date:</span>{" "}
                            {format(startDate, "P", {locale: fr})}
                        </p>
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Registration Period:</span>{" "}
                            {format(startRegistration, "P", {locale: fr})}{' - '}
                            {format(endRegistration, "P", {locale: fr})}
                        </p>
                        <p className="text-lg mb-2">
                            <span className="font-semibold">Total Registrations:</span>{" "}
                            {totalRegistrationCount}
                        </p>
                        <p className="text-lg mb-4">
                            <span className="font-semibold">Description:</span> {description}
                        </p>

                        <a href="#reg-form">
                            <button
                                className={`btn w-full sm:w-auto ${isRegistrationOpen() ? "btn-primary" : "btn-disabled"
                                    }`}
                                disabled={!isRegistrationOpen()}
                                onClick={() => setOpenForm(true)}
                            >
                                Register Now
                            </button>

                        </a>

                        {/* Countdown Timer */}
                        {isRegistrationOpen() && (
                            <div className="mt-4 flex justify-center">
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={Math.ceil(
                                        (new Date(endRegistration) - new Date()) / 1000
                                    )}
                                    colors={[
                                        ["#004777", 0.4],
                                        ["#F7B801", 0.3],
                                        ["#A30000", 0.2],
                                        ["#A30000", 0.1],
                                    ]}
                                    strokeWidth={8}
                                    size={180}
                                    trailColor="#d3d3d3"
                                    onComplete={() => ({
                                        shouldRepeat: false,
                                    })}
                                >
                                    {({ remainingTime }) => {
                                        if (remainingTime <= 0) {
                                            return (
                                                <div className="text-lg font-semibold text-red-600">
                                                    Registration Closed
                                                </div>
                                            );
                                        }

                                        const days = Math.floor(
                                            remainingTime / (24 * 60 * 60)
                                        );
                                        const hours = Math.floor(
                                            (remainingTime % (24 * 60 * 60)) / (60 * 60)
                                        );
                                        const minutes = Math.floor(
                                            (remainingTime % (60 * 60)) / 60
                                        );
                                        const seconds = remainingTime % 60;

                                        return (
                                            <div className="text-center">
                                                <div className=" font-bold">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</div>
                                            </div>
                                        );
                                    }}
                                </CountdownCircleTimer>
                            </div>
                        )}
                    </div>

                    {/* Right: Registration Form */}
                    <div
                        id="reg-form"
                        className={`bg-white shadow-lg w-full rounded-lg p-6 ${openForm ? "block" : "hidden"
                            }`}
                    >
                        {/* Form Content */}
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
                                    defaultValue={title}
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
                                    defaultValue={startDate}
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
                                    type="text"
                                    name="firstName"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your first name"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Contact Number</span>
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your contact number"
                                    required
                                />
                            </div>

                            {/* Additional Info */}
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Additional Information</span>
                                </label>
                                <textarea
                                    name="additionalInfo"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Provide any additional details"
                                    required
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
            )}
        </div>
    );
};

export default MarathonDetailsPage;
