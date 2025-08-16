import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Crown, MapPin, Briefcase, UserCircle2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PremiumMembers = () => {
    const axiosSecure = useAxiosSecure();
    const [sortOrder, setSortOrder] = useState("asc");
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure
            .get(`/premium-members?sort=${sortOrder}`)
            .then((res) => setMembers(res.data))
            .catch((err) => console.error(err));
    }, [sortOrder, axiosSecure]);

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleViewProfile = (biodataId) => {
        navigate(`/biodata/${biodataId}`);
    };

    return (
        <div className="my-10 max-w-7xl mx-auto px-4 bg-base-100 dark:bg-neutral rounded-2xl shadow-lg p-6">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2 mb-4">
                    <Crown className="text-yellow-500 w-7 h-7" />
                    Our Premium Members
                </h2>
                <select
                    onChange={handleSortChange}
                    value={sortOrder}
                    className="select select-bordered select-sm"
                >
                    <option value="asc">Sort by Age: Ascending</option>
                    <option value="desc">Sort by Age: Descending</option>
                </select>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {members.map((member) => (
                    <motion.div
                        key={member._id}
                        className="relative border p-4 rounded-2xl shadow-md bg-white dark:bg-base-200 hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Premium Badge */}
                        <span className="absolute top-3 right-3 badge badge-warning gap-1">
                            <Crown className="w-3 h-3" /> Premium
                        </span>

                        {/* Profile Image */}
                        {/* Profile Image */}
                        <div className="w-full aspect-video overflow-hidden rounded-md mb-3">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                            />
                        </div>


                        {/* Info */}
                        <h3 className="text-lg font-semibold text-primary flex items-center gap-1">
                            <UserCircle2 className="w-5 h-5 text-secondary" />
                            {member.name}
                        </h3>
                        <p className="text-sm opacity-70">Biodata ID: {member.biodataId}</p>
                        <p className="text-sm">Type: {member.biodataType}</p>
                        <p className="text-sm flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-secondary" /> {member.permanentDivision}
                        </p>
                        <p className="text-sm">Age: {member.age}</p>
                        <p className="text-sm mb-3 flex items-center gap-1">
                            <Briefcase className="w-4 h-4 text-secondary" /> {member.occupation}
                        </p>

                        {/* Button */}
                        <motion.button
                            onClick={() => handleViewProfile(member.biodataId)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full mt-3 px-4 py-2 rounded-lg  bg-[#4E1A3D] text-white hover:bg-[#3b102e] transition"
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
