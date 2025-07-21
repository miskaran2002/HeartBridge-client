import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PremiumMembers = () => {
    const axiosSecure = useAxiosSecure();
    const [sortOrder, setSortOrder] = useState("asc");
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/premium-members?sort=${sortOrder}`)
            .then(res => setMembers(res.data))
            .catch(err => console.error(err));
    }, [sortOrder, axiosSecure]);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleViewProfile = (biodataId) => {
        navigate(`/biodata/${biodataId}`);
    };

    return (
        <div className="my-10 max-w-7xl mx-auto px-4 bg-amber-50 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl text-center text-amber-950 font-bold"> Our Premium Members</h2>
                <select
                    onChange={handleSortChange}
                    value={sortOrder}
                    className="select select-bordered"
                >
                    <option value="asc">Sort by Age: Ascending</option>
                    <option value="desc">Sort by Age: Descending</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {members.map(member => (
                    <motion.div
                        key={member._id}
                        className="border p-4 rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-48 object-cover rounded-md mb-3"
                        />
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="text-sm">Biodata ID: {member.biodataId}</p>
                        <p className="text-sm">Type: {member.biodataType}</p>
                        <p className="text-sm">Division: {member.permanentDivision}</p>
                        <p className="text-sm">Age: {member.age}</p>
                        <p className="text-sm mb-3">Occupation: {member.occupation}</p>

                        <motion.button
                            onClick={() => handleViewProfile(member.biodataId)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-3 px-4 py-2 rounded bg-[#4E1A3D] text-white hover:bg-[#3b102e] transition"
                        >
                            View Profile
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PremiumMembers;
