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
            icon: <FaMale className="text-5xl text-[#1E40AF] mx-auto mb-3" />
        },
        {
            id: 3,
            label: 'Female Biodatas',
            value: data.totalFemale,
            icon: <FaFemale className="text-5xl text-[#DB2777] mx-auto mb-3" />
        },
        {
            id: 4,
            label: 'Total Married',
            value: data.totalMarried,  // added this field
            icon: <FaHeart className="text-5xl text-[#E11D48] mx-auto mb-3" />
        }
    ];

    return (
        <section className="success-counters py-10 bg-[#f9f7f9] text-center rounded-lg max-w-5xl mx-auto shadow-lg">
            <h2 className="text-3xl font-extrabold mb-10 text-[#4E1A3D] tracking-wide">
                Our Success Counters
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-12">
                {counters.map(({ id, label, value, icon }) => (
                    <div
                        key={id}
                        className="counter bg-white shadow-md rounded-xl p-8 flex flex-col items-center w-48"
                    >
                        {icon}
                        <CountUp
                            end={value}
                            duration={2}
                            separator=","
                            className="text-5xl font-bold text-[#4E1A3D]"
                        />
                        <p className="mt-3 text-lg font-semibold text-gray-600">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SuccessCounters;
