import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import MarathonCard from "../Components/MarathonCard";
import { Helmet } from "react-helmet-async";

const Marathons = () => {
    const { user, marathons, setMarathons } = useContext(contextProvider);
    const [fetch, setFetch] = useState(true);
    useEffect(() => {
        const fethcing = async () => {
            try {
                setFetch(true)
                const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons?uEmail=${user.email}`, { withCredentials: true })
                setMarathons(data);
                setFetch(false);
            }
            catch (e) {
                setMarathons([]);
                console.log(e);
            }

        }
        fethcing()
    }, [setMarathons, user.email])

    const handleSort = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons?uEmail=${user.email}&sort=${true}`, { withCredentials: true });
        setMarathons(data);
    }
    return (
        <div className="w-11/12 mx-auto">
            <Helmet>
                <title>Marathons | Marathon Managemnet</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center my-6 text-primary">All Marathons</h1>
            <button onClick={handleSort} className="btn bg-blue-600 text-white">Sort by Creation</button>

            {
                fetch ?
                    <div className="flex items-center justify-center w-full">
                        <span className="loading loading-infinity w-20"></span>
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
                        {
                            marathons.map(marathon => <MarathonCard key={marathon._id} marathon={marathon}></MarathonCard>)

                        }
                    </div>
            }
        </div>
    );
};

export default Marathons;