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

    // Main biodata query
    const { data: biodata, isLoading } = useQuery({
        queryKey: ['biodata', biodataId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/by-id/${biodataId}`);
            console.log('🚀 Fetched biodata:', res.data);
            return res.data?.data;
        },
    });

    // Similar biodatas query
    const { data: similarBiodatas = [] } = useQuery({
        queryKey: ['similar', biodata?.biodataType],
        enabled: !!biodata?.biodataType,
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodatas?type=${biodata.biodataType}`);
            return res.data?.data?.filter(b => b.biodataId !== biodata.biodataId).slice(0, 3);
        },
    });

    const handleAddToFav = async () => {
        try {
            const favData = {
                userEmail: user.email,
                biodataId: biodata.biodataId,
                name: biodata.name,
                occupation: biodata.occupation,
                permanentDivision: biodata.permanentDivision
            };
            const res = await axiosSecure.post('/favourites', favData);
            if (res.data?.insertedId) {
                Swal.fire('✅ Added!', 'Biodata added to favourites', 'success');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Could not add to favourites', 'error');
        }
    };

    const handleRequestContact = () => {
        navigate(`/checkout/${biodata.biodataId}`);
    };

    if (isLoading) return <p className="text-center py-10">Loading biodata...</p>;
    if (!biodata) return <p className="text-center py-10 text-red-600">No biodata found!</p>;

    const isPremium = user?.isPremium || false;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <h2 className="text-2xl font-bold text-center">
                {biodata.name || 'Unknown Name'} (ID: {biodata.biodataId || 'N/A'})
            </h2>

            <img
                src={biodata.image || 'https://i.ibb.co/2n7Vj1J/default-avatar.png'}
                alt={biodata.name}
                className="w-40 h-40 object-cover rounded-full mx-auto border-2 border-[#4E1A3D]"
            />

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
                        <p><strong>Contact Email:</strong> {biodata.email}</p>
                        <p><strong>Mobile Number:</strong> {biodata.mobile}</p>
                    </>
                ) : (
                    <p className="md:col-span-2 text-red-600 font-medium">
                        Contact info is hidden. Become a premium member to view it.
                    </p>
                )}
            </div>

            <div className="flex gap-4 justify-center mt-6">
                <button
                    onClick={handleAddToFav}
                    className="px-4 py-2 bg-[#4E1A3D] text-white rounded hover:bg-[#38102e]"
                >
                    Add to Favourites
                </button>

                {!isPremium && (
                    <button
                        onClick={handleRequestContact}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Request Contact Info
                    </button>
                )}
            </div>

            {/* Similar Biodatas */}
            <div>
                <h3 className="text-xl font-semibold mt-10 mb-4 text-center">Similar Biodatas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarBiodatas.map((b) => (
                        <div key={b._id} className="border rounded-lg p-4 text-center shadow">
                            <img
                                src={b.image}
                                alt={b.name}
                                className="w-20 h-20 mx-auto rounded-full object-cover"
                            />
                            <h4 className="font-bold mt-2">{b.name}</h4>
                            <p>ID: {b.biodataId}</p>
                            <p>Age: {b.age}</p>
                            <p>Division: {b.permanentDivision}</p>
                            <button
                                onClick={() => navigate(`/biodata/${b.biodataId}`)}
                                className="mt-2 text-blue-600 underline"
                            >
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
