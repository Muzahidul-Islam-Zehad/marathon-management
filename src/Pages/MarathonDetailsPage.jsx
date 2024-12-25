
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { contextProvider } from "../Providers/AuthProvider";

const MarathonDetails = () => {
    // const navigate = useNavigate();
    const { id } = useParams();
    const { marathons } = useContext(contextProvider);

    //   console.log(params);
    const marathon = marathons.filter(m => m._id === id);

    const {
        image,
        title,
        location,
        startRegistration,
        endRegistration,
        startDate,
        description,
        totalRegistrationCount,
    } = marathon[0];

    console.log(marathon);

    // Check if registration is open
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

    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
            {/* Marathon Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {/* Marathon Details */}
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <p className="text-lg mb-2">
                <span className="font-semibold">Location:</span> {location}
            </p>
            <p className="text-lg mb-2">
                <span className="font-semibold">Start Date:</span> {startDate}
            </p>
            <p className="text-lg mb-2">
                <span className="font-semibold">Registration Period:</span>{" "}
                {startRegistration} - {endRegistration}
            </p>
            <p className="text-lg mb-2">
                <span className="font-semibold">Total Registrations:</span>{" "}
                {totalRegistrationCount}
            </p>
            <p className="text-lg mb-4">
                <span className="font-semibold">Description:</span> {description}
            </p>

            {/* Register Button */}
            <div className="mt-6">
                <button
                    // onClick={() => navigate("/register")}
                    className={`btn w-full sm:w-auto ${isRegistrationOpen ? "btn-primary" : "btn-disabled"
                        }`}
                    disabled={!isRegistrationOpen}
                >
                    {isRegistrationOpen ? "Register Now" : "Registration Closed"}
                </button>
            </div>
        </div>
    );
};

export default MarathonDetails;
