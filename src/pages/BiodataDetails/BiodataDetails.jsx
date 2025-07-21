import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const BiodataDetails = () => {
    const { biodataId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Load single biodata
    const { data: biodata, isLoading: isBiodataLoading } = useQuery({
        queryKey: ['biodata', biodataId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/by-id/${biodataId}`);
            return res.data?.data;
        },
    });

    // Load similar biodata (same gender/type, excluding this one)
    const { data: similarBiodatas = [] } = useQuery({
        queryKey: ['similar', biodata?.biodataType],
        enabled: !!biodata?.biodataType,
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodatas`);
            return res.data?.data
                ?.filter(b => b.biodataId !== biodata.biodataId && b.biodataType === biodata.biodataType)
                .slice(0, 3);
        },
    });

    // Fetch premium status for the logged-in user from backend API
    const { data: premiumData, isLoading: isPremiumLoading } = useQuery({
        queryKey: ['user-premium-status', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users/is-premium?email=${encodeURIComponent(user.email)}`);
            return res.data;
        },
    });

    // Determine if the user is premium based on backend response
    const isPremium = premiumData?.isPremium === true;

    const handleAddToFav = async () => {
        if (!user) {
            Swal.fire('⚠️ Login Required', 'Please log in to add favourites.', 'warning');
            return;
        }

        const favData = {
            userEmail: user.email,
            biodataId: biodata.biodataId,
            name: biodata.name || 'Unknown',
            occupation: biodata.occupation || 'N/A',
            permanentDivision: biodata.permanentDivision || 'N/A'
        };

        try {
            const res = await axiosSecure.post('/favourites', favData);
            if (res.data.insertedId) {
                Swal.fire('✅ Added!', 'Biodata added to favourites.', 'success');
            } else {
                Swal.fire('ℹ️ Info', 'Action completed.', 'info');
            }
        } catch (err) {
            if (err.response?.status === 409) {
                Swal.fire('ℹ️ Info', 'This biodata is already in your favourites.', 'info');
            } else {
                Swal.fire('❌ Error', 'Failed to add to favourites.', 'error');
            }
        }
    };

    const handleRequestContact = () => {
        navigate(`/checkout/${biodata.biodataId}`);
    };

    if (isBiodataLoading || isPremiumLoading) {
        return <p className="text-center py-10">Loading biodata...</p>;
    }

    if (!biodata) {
        return <p className="text-center py-10 text-red-600">No biodata found!</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <h2 className="text-2xl font-bold text-center flex flex-col items-center gap-1">
                {biodata.name || 'Unknown Name'} (ID: {biodata.biodataId || 'N/A'})
                {isPremium && (
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        ✅ Premium Member
                    </span>
                )}
            </h2>

            {/* Image */}
            <img
                src={biodata.image || 'https://i.ibb.co/2n7Vj1J/default-avatar.png'}
                alt={biodata.name}
                className="w-40 h-40 object-cover rounded-full mx-auto border-2 border-[#4E1A3D]"
            />

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <p><strong>Biodata Type:</strong> {biodata.biodataType}</p>
                <p><strong>Date of Birth:</strong> {biodata.dob}</p>
                <p><strong>Age:</strong> {biodata.age}</p>
                <p><strong>Height:</strong> {biodata.height}</p>
                <p><strong>Weight:</strong> {biodata.weight}</p>
                <p><strong>Occupation:</strong> {biodata.occupation}</p>
                <p><strong>Race:</strong> {biodata.race}</p>
                <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
                <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
                <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
                <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
                <p><strong>Expected Partner Age:</strong> {biodata.expectedAge}</p>
                <p><strong>Expected Partner Height:</strong> {biodata.expectedHeight}</p>
                <p><strong>Expected Partner Weight:</strong> {biodata.expectedWeight}</p>

                {isPremium ? (
                    <>
                        <p><strong>📧 Contact Email:</strong> {biodata.email || 'Not Provided'}</p>
                        <p><strong>📱 Mobile Number:</strong> {biodata.mobile || 'Not Provided'}</p>
                    </>
                ) : (
                    <p className="md:col-span-2 text-red-600 font-medium">
                        🚫 Contact info is hidden. Become a premium member to view it.
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-6">
                <button
                    onClick={handleAddToFav}
                    className="px-4 py-2 bg-[#4E1A3D] text-white rounded hover:bg-[#38102e]"
                >
                    ❤️ Add to Favourites
                </button>

                {!isPremium && user?.email !== biodata.email && (
                    <button
                        onClick={handleRequestContact}
                        className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                        📩 Request Contact Info
                    </button>
                )}
            </div>

            {/* Similar Biodatas */}
            <div>
                <h3 className="text-xl font-semibold mt-10 mb-4 text-center">🧍 Similar Biodatas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarBiodatas.map((b) => (
                        <div key={b._id} className="border rounded-lg p-4 text-center shadow">
                            <img
                                src={b.image || 'https://i.ibb.co/2n7Vj1J/default-avatar.png'}
                                alt={b.name}
                                className="w-20 h-20 mx-auto rounded-full object-cover"
                            />
                            <h4 className="font-bold mt-2">{b.name}</h4>
                            <p>Type: {b.biodataType}</p>
                            <p>ID: {b.biodataId}</p>
                            <p>Age: {b.age}</p>
                            <p>Division: {b.permanentDivision}</p>
                            <button
                                onClick={() => navigate(`/biodata-details/${b.biodataId}`)}
                                className="mt-2 text-blue-600 underline"
                            >
                                🔍 View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
