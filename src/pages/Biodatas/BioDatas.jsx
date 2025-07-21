import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; // fixed import react-router-dom (not react-router)
import useAxiosSecure from '../../hooks/useAxiosSecure';

const divisions = ['Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];
const types = ['Male', 'Female'];
const ITEMS_PER_PAGE = 6;

const BioDatas = () => {
    const axiosSecure = useAxiosSecure();

    const [filters, setFilters] = useState({
        type: '',
        division: '',
        minAge: '',
        maxAge: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
    const [currentPage, setCurrentPage] = useState(1);

    const { data: biodatas = [], isLoading } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosSecure.get('/biodatas');
            return res.data.data || [];
        },
    });

    // Apply filters + search + sorting (useMemo for optimization)
    const filteredSortedData = useMemo(() => {
        let filtered = biodatas.filter((b) => {
            const matchType = filters.type ? b.biodataType === filters.type : true;
            const matchDivision = filters.division ? b.permanentDivision === filters.division : true;
            const matchAge =
                (!filters.minAge || b.age >= filters.minAge) &&
                (!filters.maxAge || b.age <= filters.maxAge);
            const matchSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchType && matchDivision && matchAge && matchSearch;
        });

        filtered.sort((a, b) =>
            sortOrder === 'asc' ? a.age - b.age : b.age - a.age
        );

        return filtered;
    }, [biodatas, filters, searchTerm, sortOrder]);

    // Pagination logic
    const totalPages = Math.ceil(filteredSortedData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredSortedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Handle page change
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-6 p-4 md:p-6"
        >
            {/* Filter Panel */}
            <aside className="lg:w-1/4 bg-white rounded-xl shadow p-4 space-y-5 border border-[#F3E8F1]">
                <h2 className="text-xl font-bold text-[#4E1A3D] text-center">Filter Biodatas</h2>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Biodata Type</label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4E1A3D]"
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        value={filters.type}
                    >
                        <option value="">All</option>
                        {types.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Division</label>
                    <select
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4E1A3D]"
                        onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                        value={filters.division}
                    >
                        <option value="">All</option>
                        {divisions.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Age Range</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            className="w-1/2 border p-2 rounded focus:ring-[#4E1A3D]"
                            onChange={(e) => setFilters({ ...filters, minAge: Number(e.target.value) || '' })}
                            value={filters.minAge}
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            className="w-1/2 border p-2 rounded focus:ring-[#4E1A3D]"
                            onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) || '' })}
                            value={filters.maxAge}
                        />
                    </div>
                </div>
            </aside>

            {/* Biodata Cards Section */}
            <section className="lg:w-3/4 w-full space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                    <h2 className="text-xl font-bold text-[#4E1A3D] border-b pb-2">
                        Total Biodatas: {filteredSortedData.length}
                    </h2>

                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="border p-2 rounded focus:ring-[#4E1A3D]"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        <select
                            className="border p-2 rounded focus:ring-[#4E1A3D]"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Age Ascending</option>
                            <option value="desc">Age Descending</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <p className="text-center text-gray-600">Loading biodatas...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedData.map((b) => (
                                <motion.div
                                    key={b._id}
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-white rounded-xl shadow border border-[#F3E8F1] p-4 flex flex-col items-center text-center transition-all duration-300"
                                >
                                    <img
                                        src={b.image || 'https://i.ibb.co/2n7Vj1J/default-avatar.png'}
                                        alt={b.name}
                                        className="w-24 h-24 object-cover rounded-full mb-3 border-2 border-[#4E1A3D]"
                                    />
                                    <h3 className="font-bold text-lg text-[#4E1A3D]">{b.name}</h3>
                                    <p className="text-sm text-gray-500">ID: {b.biodataId}</p>
                                    <p className="text-sm text-gray-600">Type: {b.biodataType}</p>
                                    <p className="text-sm text-gray-600">Age: {b.age}</p>
                                    <p className="text-sm text-gray-600">Division: {b.permanentDivision}</p>
                                    <p className="text-sm text-gray-600">Occupation: {b.occupation}</p>
                                    <Link
                                        to={`/biodata/${b.biodataId}`}
                                        className="mt-3 px-4 py-2 rounded bg-[#4E1A3D] text-white hover:bg-[#3b102e] transition"
                                    >
                                        View Profile
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                                <button
                                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const page = i + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => goToPage(page)}
                                            className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 ${currentPage === page ? 'bg-[#4E1A3D] text-white' : ''
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200 disabled:opacity-50"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </motion.div>
    );
};

export default BioDatas;
