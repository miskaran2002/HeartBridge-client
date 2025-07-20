import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
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

    const handleViewProfile = (id) => {
        navigate(`/biodata-details/${id}`);
    };

    return (
        <div className="my-10 max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Premium Members</h2>
                <select onChange={handleSortChange} value={sortOrder} className="select select-bordered">
                    <option value="asc">Sort by Age: Ascending</option>
                    <option value="desc">Sort by Age: Descending</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {members.map(member => (
                    <div key={member._id} className="border p-4 rounded-xl shadow-md bg-white">
                        <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-md mb-3" />
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p>Biodata ID: {member.biodataId}</p>
                        <p>Type: {member.biodataType}</p>
                        <p>Division: {member.permanentDivision}</p>
                        <p>Age: {member.age}</p>
                        <p>Occupation: {member.occupation}</p>
                        <button
                            onClick={() => handleViewProfile(member.biodataId)}
                            className="mt-3 btn btn-primary w-full"
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumMembers;
