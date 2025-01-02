import { useContext, useEffect } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import MarathonCard from "../Components/MarathonCard";

const Marathons = () => {
    const { user, marathons, setMarathons } = useContext(contextProvider);

    useEffect(() => {
        const fethcing = async () => {
            try{

                const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons?uEmail=${user.email}`, { withCredentials: true })
                setMarathons(data);
            }
            catch(e) 
            {
                setMarathons([]);
                console.log(e);
            }
            
        }
        fethcing()
    }, [setMarathons, user.email])

    const handleSort = async() =>{
        const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons?uEmail=${user.email}&sort=${true}`, { withCredentials: true });
        setMarathons(data);
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-6">All Marathons</h1>
            <button onClick={handleSort} className="btn bg-blue-600 text-white">Sort by Creation</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                {
                    marathons.map(marathon => <MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>)

                }
                {/* <h1>marathon : {marathons.length}</h1> */}
            </div>
        </div>
    );
};

export default Marathons;