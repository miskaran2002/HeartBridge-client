import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import CountUp from 'react-countup';
import { FaUsers, FaMale, FaFemale, FaHeart } from 'react-icons/fa';

const SuccessCounters = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['biodataStats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/biodata-stats');
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-6 text-gray-500">Loading stats...</p>;
    if (isError) return <p className="text-center py-6 text-red-500">Failed to load stats.</p>;

    const counters = [
        {
            id: 1,
            label: 'Total Biodatas',
            value: data.totalBiodata,
            icon: <FaUsers className="text-5xl text-[#4E1A3D] mx-auto mb-3" />
        },
        {
            id: 2,
            label: 'Male Biodatas',
            value: data.totalMale,
            icon: <FaMale className="text-5xl text-blue-700 mx-auto mb-3" />
        },
        {
            id: 3,
            label: 'Female Biodatas',
            value: data.totalFemale,
            icon: <FaFemale className="text-5xl text-pink-600 mx-auto mb-3" />
        },
        {
            id: 4,
            label: 'Total Married',
            value: data.totalMarried,
            icon: <FaHeart className="text-5xl text-rose-600 mx-auto mb-3" />
        }
    ];

    return (
        <section className="py-12 px-6  dark:from-neutral dark:via-base-200 dark:to-neutral rounded-2xl max-w-7xl mx-auto shadow-lg">
            {/* Section Title */}
            <h2 className="text-3xl font-extrabold mb-10 text-center  dark:text-pink-200 tracking-wide">
                Our Success Counters
            </h2>

            {/* Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                {counters.map(({ id, label, value, icon }) => (
                    <div
                        key={id}
                        className="counter bg-white dark:bg-[#1F0F0F] shadow-md hover:shadow-xl 
                           transition-all duration-300 rounded-2xl p-10 flex flex-col items-center 
                                 w-68 h-64 transform hover:-translate-y-1"
                    >
                        {icon}
                        <CountUp
                            end={value}
                            duration={2.5}
                            separator=","
                            className="text-6xl font-extrabold text-[#4E1A3D] dark:text-pink-400"
                        />
                        <p className="mt-4 text-xl font-semibold text-gray-600 dark:text-gray-300">{label}</p>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default SuccessCounters;
