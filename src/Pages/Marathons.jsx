import { useContext, useEffect } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import MarathonCard from "../Components/MarathonCard";

const Marathons = () => {
    const { marathons, setMarathons} = useContext(contextProvider);

    useEffect(() => {
        const fethcing = async() =>{
            const {data} = await axios.get(`${import.meta.env.VITE_url}/marathons`)
            setMarathons(data);
        }
        fethcing()
    },[setMarathons])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
            {
                marathons.map(marathon => <MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>)
                
            }
            {/* <h1>marathon : {marathons.length}</h1> */}
        </div>
    );
};

export default Marathons;