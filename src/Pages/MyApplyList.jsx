
import { useContext, useEffect, useState } from "react";
import { contextProvider } from "../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Helmet } from "react-helmet-async";

const MyApplyList = () => {
    const { user } = useContext(contextProvider);
    const [myApply, setMyApply] = useState([]);
    const [fetch, setFetch] = useState(true);
    const [update, setUpdate] = useState({});

    useEffect(() => {
        const fethcing = async () => {
            setFetch(true);
            const { data } = await axios.get(`${import.meta.env.VITE_url}/my-appliedMarathon?email=${user.email}`, { withCredentials: true });
            setMyApply(data);
            setFetch(false);
        };
        fethcing();
    }, [setMyApply, user.email]);

    const handleDelete = (id, marathonId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.delete(`${import.meta.env.VITE_url}/applied-marathons/${id}?marathonId=${marathonId}`);
                const newMyApply = myApply.filter(a => a._id !== id);
                setMyApply(newMyApply);
                if (data.acknowledged) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your apply has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    const handleSearch = async (e) => {
        const search = e.target.value;
        const { data } = await axios.get(`${import.meta.env.VITE_url}/my-appliedMarathon?email=${user.email}&search=${search}`, { withCredentials: true });
        setMyApply(data);
    };


    const handleUpdate = async (id) => {
        try {

            setFetch(true);
            const { data } = await axios.get(`${import.meta.env.VITE_url}/applied-marathons/${id}`)
            setUpdate(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setFetch(false);
            document.getElementById('my_modal_5').showModal();
        }
    }

    const handleFormSubmit = async (e) => {
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
            name: { firstName, lastName },
            contactNumber,
            additionalInfo,
            marathonId: update.marathonId
        }

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_url}/applied-marathons/${update._id}`, submittionData);
            if (data.acknowledged) {
                Swal.fire({
                    title: "Update Successful!",
                    text: "You have updated your marathon apply.",
                    icon: "success"
                });

            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            document.getElementById('my_modal_5').close();
        }

    }

    return (
        <div className="w-11/12 mx-auto p-6">
            <Helmet>
                <title>My Applied Marathon | Dashboard | Marathon Managemnet</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center text-primary">My Applied Marathons</h2>
            <label className="input input-bordered flex items-center gap-2 my-2 w-full sm:w-1/2">
                <input
                    type="text"
                    onChange={handleSearch}
                    className="grow"
                    placeholder="Search"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            {fetch ? (
                <div className="flex items-center justify-center w-full">
                    <span className="loading loading-infinity w-20"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse bg-white border border-gray-200">
                        <thead className="bg-primary text-white font-bold">
                            <tr className="">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Marathon Title</th>
                                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myApply?.map((apply, idx) => (
                                <tr key={apply._id}>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {idx + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {apply.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {format(apply.startDate, "P", { locale: fr })}
                                    </td>
                                    <td className="border flex flex-col md:flex-row gap-2 justify-center items-center border-gray-300 px-4 py-2 text-center md:space-x-2">

                                        <button onClick={() => handleUpdate(apply._id)} className="btn btn-sm btn-primary w-20">
                                            Update
                                        </button>

                                        <button
                                            className="btn btn-sm btn-error w-20"
                                            onClick={() => handleDelete(apply._id, apply.marathonId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* modal  */}

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
                        <h2 className="text-2xl font-bold text-center mb-6">Update Marathon Registration</h2>
                        {
                            fetch
                                ?
                                <div className="flex items-center justify-center w-full">
                                    <span className="loading loading-infinity w-20"></span>
                                </div>
                                :
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
                                            defaultValue={update?.startDate}
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
                                            required
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
                                            required
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
                                            required
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
                        }
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyApplyList;
