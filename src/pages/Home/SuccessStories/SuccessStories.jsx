import React from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SuccessStories = () => {
    const axiosSecure = useAxiosSecure();

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
        <section className="success-stories-section max-w-7xl mx-auto  p-6">
            <h2 className="text-3xl font-bold mb-10 text-center">🎉Marriage Success Stories</h2>
            <div className=" w-full grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {stories.map((story, index) => (
                    <motion.div
                        key={story._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 20px 30px rgba(59, 130, 246, 0.3)' }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col w-full"
                    >
                        <img
                            src={story.coupleImage}
                            alt="Couple"
                            className="w-full h-112 object-cover rounded-t-xl"
                        />
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-3 text-gray-600 text-sm font-medium tracking-wide">
                                Marriage Date: <span className="font-semibold">{dayjs(story.createdAt).format('MMMM D, YYYY')}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        stroke="none"
                                        className="w-5 h-5 text-yellow-400"
                                    >
                                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.778 1.4 8.166L12 18.897l-7.334 3.857 1.4-8.166-5.934-5.778 8.2-1.192z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-800 whitespace-pre-line flex-grow">{story.reviewText}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default SuccessStories;
