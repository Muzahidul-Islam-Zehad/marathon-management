import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useContext } from "react";
import { contextProvider } from "../Providers/AuthProvider";
const MarathonCard = ({ marathon }) => {
    const {isDark} = useContext(contextProvider);

    return (
        <div className={`${isDark ? 'bg-[#444242]' : 'bg-white'}  shadow-lg rounded-lg overflow-hidden flex flex-col`}>
            {/* Image */}
            <img src={marathon.image} alt={marathon.title} className="h-48 w-full object-cover" />

            {/* Content */}
            <div className="p-4 flex-1">
                <h3 className={`text-lg font-bold mb-2 ${isDark && 'text-[#d69327]'}`}>{marathon.title}</h3>
                <p className={`text-sm mb-4 ${isDark && 'text-white'}`}>Location: {marathon.location}</p>
                <p className={`text-sm mb-4 ${isDark && 'text-white'}`}>
                    Registration: {format(marathon?.startRegistration , "P" ,{locale: fr })} - {format(marathon?.endRegistration , "P" , {locale: fr})}
                </p>
            </div>

            {/* Button */}
            <div className="mt-auto p-4">
                <Link to={`/marathon-details/${marathon._id}`}>
                    <button
                        className={`btn  w-full grow ${isDark ? `btn-outline text-[#d69327] bg-[#1e1e1e] hover:bg-[#d69327] hover:text-white`: `btn-primary`}`}
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
