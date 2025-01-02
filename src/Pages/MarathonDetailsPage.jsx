import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { contextProvider } from "../Providers/AuthProvider";
import { formatDateToYYYYMMDD } from "../Utils/dateFormater";

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
            const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons/${id}?email=${user.email}`, { withCredentials: true })
            setMarathon(data);
            setFetch(false);
        }
        fethcing()
    }, [id, user.email])

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

        if (today >= startReg && today <= endReg) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
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
            marathonId: id
        }

        console.log(submittionData);

        const { data } = await axios.post(`${import.meta.env.VITE_url}/applied-marathons`, submittionData)
        if(data.acknowledged)
        {
            navigate('/dashboard/my-apply-list');
        }
        console.log(data);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {
                fetch
                    ?
                    <div className="flex items-center justify-center min-h-screen w-full">
                        <span className="loading loading-infinity w-20"></span>
                    </div>
                    :
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
                                <span className="font-semibold">Start Date:</span> {formatDateToYYYYMMDD(startDate)}
                            </p>
                            <p className="text-lg mb-2">
                                <span className="font-semibold">Registration Period:</span>{" "}
                                {formatDateToYYYYMMDD(startRegistration)} - {formatDateToYYYYMMDD(endRegistration)}
                            </p>
                            <p className="text-lg mb-2">
                                <span className="font-semibold">Total Registrations:</span>{" "}
                                {totalRegistrationCount}
                            </p>
                            <p className="text-lg mb-4">
                                <span className="font-semibold">Description:</span> {description}
                            </p>

                            <button
                                className={`btn w-full sm:w-auto ${isRegistrationOpen() ? "btn-primary" : "btn-disabled"
                                    }`}
                                disabled={!isRegistrationOpen()}
                                onClick={() => setOpenForm(true)}
                            >
                                Register Now
                            </button>

                            {/* Countdown Timer */}
                            {isRegistrationOpen() && (
                                <div className="mt-4 flex justify-center">
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={
                                            Math.ceil((new Date(endRegistration) - new Date()) / 1000)
                                        }
                                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                        colorsTime={[10, 5, 2, 0]}
                                        onComplete={() => {
                                            console.log("Registration period ended");
                                            return { shouldRepeat: false };
                                        }}
                                    >
                                        {({ remainingTime }) => (
                                            <div className="text-lg font-semibold">
                                                {remainingTime > 0
                                                    ? `${Math.floor(remainingTime / 60)}m ${remainingTime % 60}s`
                                                    : "Registration Closed"}
                                            </div>
                                        )}
                                    </CountdownCircleTimer>
                                </div>
                            )}
                        </div>

                        {/* Right: Registration Form */}
                        <div className={`bg-white shadow-lg w-full rounded-lg p-6 ${openForm ? 'block' : 'hidden'}`}>
                            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                                <h2 className="text-2xl font-bold text-center mb-6">Marathon Registration</h2>

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
                                            defaultValue={(startDate)}
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
                    </div>
            }
        </div>
    );
};

export default MarathonDetailsPage;
