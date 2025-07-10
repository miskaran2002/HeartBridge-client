import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';

const divisions = ['Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];
const heights = ['Below 5ft', '5ft - 5.5ft', '5.5ft - 6ft', 'Above 6ft'];
const weights = ['Below 50kg', '50kg - 60kg', '60kg - 70kg', 'Above 70kg'];
const occupations = ['Student', 'Job', 'House wife', 'Business'];
const races = ['Fair', 'Wheatish', 'Dark'];

const EditBioData = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (user) {
            setValue('name', user.displayName || '');
            setValue('email', user.email || '');
        }
    }, [user, setValue]);

    const onSubmit = (data) => {
        console.log('📦 Submitted Biodata:', data);
        // TODO: send data to backend with axios/fetch
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-10"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create / Edit Your Biodata
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Biodata Type */}
                <div>
                    <label className="block mb-1">Biodata Type</label>
                    <select {...register('biodataType', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Name */}
                <div>
                    <label className="block mb-1">Full Name</label>
                    <input {...register('name', { required: true })} className="w-full border p-2 rounded" />
                </div>

                {/* Image */}
                <div>
                    <label className="block mb-1">Profile Image URL</label>
                    <input {...register('image')} className="w-full border p-2 rounded" placeholder="Image URL (optional)" />
                </div>

                {/* DOB */}
                <div>
                    <label className="block mb-1">Date of Birth</label>
                    <input type="date" {...register('dob', { required: true })} className="w-full border p-2 rounded" />
                </div>

                {/* Height & Weight */}
                <div>
                    <label className="block mb-1">Height</label>
                    <select {...register('height', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {heights.map(h => <option key={h}>{h}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Weight</label>
                    <select {...register('weight', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {weights.map(w => <option key={w}>{w}</option>)}
                    </select>
                </div>

                {/* Age */}
                <div>
                    <label className="block mb-1">Age</label>
                    <input type="number" {...register('age', { required: true })} className="w-full border p-2 rounded" />
                </div>

                {/* Occupation & Race */}
                <div>
                    <label className="block mb-1">Occupation</label>
                    <select {...register('occupation', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {occupations.map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Race (Skin Color)</label>
                    <select {...register('race', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {races.map(r => <option key={r}>{r}</option>)}
                    </select>
                </div>

                {/* Parents */}
                <div>
                    <label className="block mb-1">Father's Name</label>
                    <input {...register('fatherName', { required: true })} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block mb-1">Mother's Name</label>
                    <input {...register('motherName', { required: true })} className="w-full border p-2 rounded" />
                </div>

                {/* Divisions */}
                <div>
                    <label className="block mb-1">Permanent Division</label>
                    <select {...register('permanentDivision', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {divisions.map(d => <option key={d}>{d}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Present Division</label>
                    <select {...register('presentDivision', { required: true })} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {divisions.map(d => <option key={d}>{d}</option>)}
                    </select>
                </div>

                {/* Expected Partner Info */}
                <div>
                    <label className="block mb-1">Expected Partner Age</label>
                    <input type="number" {...register('expectedAge')} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block mb-1">Expected Partner Height</label>
                    <select {...register('expectedHeight')} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {heights.map(h => <option key={h}>{h}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Expected Partner Weight</label>
                    <select {...register('expectedWeight')} className="w-full border p-2 rounded">
                        <option value="">Select</option>
                        {weights.map(w => <option key={w}>{w}</option>)}
                    </select>
                </div>

                {/* Email & Mobile */}
                <div>
                    <label className="block mb-1">Email</label>
                    <input type="email" {...register('email', { required: true })} className="w-full border p-2 rounded" readOnly />
                </div>

                <div>
                    <label className="block mb-1">Mobile Number</label>
                    <input type="text" {...register('mobile', { required: true })} className="w-full border p-2 rounded" />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        style={{ backgroundColor: '#0B1120' }}
                        className="w-full text-white py-2 rounded-md hover:bg-opacity-90 transition"
                    >
                        Save and Publish now
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default EditBioData;
