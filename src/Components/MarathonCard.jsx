import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDateToYYYYMMDD } from "../Utils/dateFormater";
const MarathonCard = ({ marathon }) => {

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            {/* Image */}
            <img src={marathon.image} alt={marathon.title} className="h-48 w-full object-cover" />

            {/* Content */}
            <div className="p-4 flex-1">
                <h3 className="text-lg font-bold mb-2">{marathon.title}</h3>
                <p className="text-sm mb-4">Location: {marathon.location}</p>
                <p className="text-sm mb-4">
                    Registration: {formatDateToYYYYMMDD(marathon.startRegistration)} - {formatDateToYYYYMMDD(marathon.endRegistration)}
                </p>
            </div>

            {/* Button */}
            <div className="mt-auto p-4">
                <Link to={`/marathon-details/${marathon._id}`}>
                    <button
                        className="btn btn-primary w-full grow"
                    >
                        See Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

MarathonCard.propTypes = {
    marathon: PropTypes.object
}

export default MarathonCard;
