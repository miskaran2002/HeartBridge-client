import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const GotMarried = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Form state
    const [selfBiodataId, setSelfBiodataId] = useState('');
    const [partnerBiodataId, setPartnerBiodataId] = useState('');
    const [coupleImage, setCoupleImage] = useState('');
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selfBiodataId || !partnerBiodataId || !reviewText) {
            Swal.fire('⚠️ Missing Fields', 'Please fill in all required fields.', 'warning');
            return;
        }

        try {
            const response = await axiosSecure.post('/success-stories', {
                selfBiodataId,
                partnerBiodataId,
                coupleImage,
                reviewText,
                userEmail: user.email,
            });

            if (response.data.message) {
                Swal.fire('🎉 Success', response.data.message, 'success');
                // Reset form
                setSelfBiodataId('');
                setPartnerBiodataId('');
                setCoupleImage('');
                setReviewText('');
                navigate('/dashboard'); // or wherever you want to redirect
            }
        } catch (error) {
            Swal.fire('❌ Error', 'Failed to submit your success story.', 'error');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Got Married? Share Your Success Story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Self Biodata ID <sup className="text-red-500">*</sup></label>
                    <input
                        type="number"
                        value={selfBiodataId}
                        onChange={e => setSelfBiodataId(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Partner Biodata ID <sup className="text-red-500">*</sup></label>
                    <input
                        type="number"
                        value={partnerBiodataId}
                        onChange={e => setPartnerBiodataId(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Couple Image URL (optional)</label>
                    <input
                        type="url"
                        value={coupleImage}
                        onChange={e => setCoupleImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Success Story Review <sup className="text-red-500">*</sup></label>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        rows={5}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
                        placeholder="Share your feelings and story here..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#4E1A3D] text-white py-2 rounded hover:bg-[#38102e]"
                >
                    Submit Success Story
                </button>
            </form>
        </div>
    );
};

export default GotMarried;
