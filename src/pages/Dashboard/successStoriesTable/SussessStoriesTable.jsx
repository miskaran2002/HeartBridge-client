import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const SuccessStoriesTable = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedStory, setSelectedStory] = useState(null);

    const { data: stories = [], isLoading, isError, error } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/success-stories');
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <div>Loading success stories...</div>;
    if (isError) return <div>Error loading success stories: {error.message}</div>;

    return (
        <section className="success-stories-section max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🎉 Marriage Success Stories</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 border-b border-gray-300">Male Biodata Id</th>
                            <th className="text-left py-3 px-4 border-b border-gray-300">Female Biodata Id</th>
                            <th className="text-left py-3 px-4 border-b border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b border-gray-300">{story.selfBiodataId}</td>
                                <td className="py-3 px-4 border-b border-gray-300">{story.partnerBiodataId}</td>
                                <td className="py-3 px-4 border-b border-gray-300">
                                    <button
                                        onClick={() => setSelectedStory(story)}
                                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                                    >
                                        View Story
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        key="modal"
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                                onClick={() => setSelectedStory(null)}
                                aria-label="Close modal"
                            >
                                &times;
                            </button>
                            <img
                                src={selectedStory.coupleImage}
                                alt="Couple"
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <div className="mb-2 text-gray-700 font-semibold">
                                Marriage Date: {dayjs(selectedStory.createdAt).format('MMMM D, YYYY')}
                            </div>
                            <p className="text-gray-800 whitespace-pre-line">{selectedStory.reviewText}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SuccessStoriesTable;
