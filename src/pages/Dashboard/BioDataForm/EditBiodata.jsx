import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const divisions = ['Dhaka', 'Chattagra', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];
const heights = ['Below 5ft', '5ft - 5.5ft', '5.5ft - 6ft', 'Above 6ft'];
const weights = ['Below 50kg', '50kg - 60kg', '60kg - 70kg', 'Above 70kg'];
const occupations = ['Student', 'Job', 'House wife', 'Business'];
const races = ['Fair', 'Wheatish', 'Dark'];

const EditBioData = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [existingData, setExistingData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/biodata/${user.email}`)
                .then(res => {
                    if (res.data?.success) {
                        const bio = res.data.data;
                        setExistingData(bio);
                        reset(bio); // populate with existing biodata
                        setIsModalOpen(true);
                    } else {
                        // No biodata found, prepare for create
                        const defaultValues = {
                            name: user.displayName || '',
                            email: user.email || '',
                            image: user.photoURL || '' 
                        };
                        setExistingData(null);
                        reset(defaultValues); // show biodataType & name
                        setIsModalOpen(true);
                    }
                })
                .catch(err => {
                    console.error('❌ Error loading biodata:', err);
                    const fallbackValues = {
                        name: user.displayName || '',
                        email: user.email || '',
                        image: user.photoURL || '' 
                    };
                    setExistingData(null);
                    reset(fallbackValues); // fallback case
                    setIsModalOpen(true);
                });
        }
    }, [user, axiosSecure, reset]);


    const onSubmit = async (data) => {
        try {
            if (existingData) {
                delete data._id; // Ensure _id is not sent during update
            }
            const response = await axiosSecure.post('/biodatas', data);
            if (response.data?.insertedId || response.data?.modifiedCount > 0) {
                Swal.fire('✅ Success!', response.data.message, 'success');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('❌ Submit Error:', error);
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };

    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
                <Dialog.Panel className=" p-6 rounded max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <Dialog.Title className="text-2xl font-bold text-center mb-6">
                        {existingData ? 'Update Your Biodata' : 'Create Your Biodata'}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {[{
                            label: 'Biodata Type', name: 'biodataType', type: 'select', options: ['Male', 'Female']
                        }, {
                            label: 'Full Name', name: 'name', type: 'input'
                        }, {
                            label: 'Profile Image URL', name: 'image', type: 'input'
                        }, {
                            label: 'Date of Birth', name: 'dob', type: 'date'
                        }, {
                            label: 'Height', name: 'height', type: 'select', options: heights
                        }, {
                            label: 'Weight', name: 'weight', type: 'select', options: weights
                        }, {
                            label: 'Age', name: 'age', type: 'number'
                        }, {
                            label: 'Occupation', name: 'occupation', type: 'select', options: occupations
                        }, {
                            label: 'Race (Skin Color)', name: 'race', type: 'select', options: races
                        }, {
                            label: "Father's Name", name: 'fatherName', type: 'input'
                        }, {
                            label: "Mother's Name", name: 'motherName', type: 'input'
                        }, {
                            label: 'Permanent Division', name: 'permanentDivision', type: 'select', options: divisions
                        }, {
                            label: 'Present Division', name: 'presentDivision', type: 'select', options: divisions
                        }, {
                            label: 'Expected Partner Age', name: 'expectedAge', type: 'number', required: false
                        }, {
                            label: 'Expected Partner Height', name: 'expectedHeight', type: 'select', options: heights, required: false
                        }, {
                            label: 'Expected Partner Weight', name: 'expectedWeight', type: 'select', options: weights, required: false
                        }, {
                            label: 'Email', name: 'email', type: 'email', readOnly: true
                        }, {
                            label: 'Mobile Number', name: 'mobile', type: 'input'
                        }].map(({ label, name, type, options, readOnly = false, required = true }) => (
                            <div key={name}>
                                <label className="block mb-1">{label}</label>
                                {type === 'select' ? (
                                    <select {...register(name, { required })} className="w-full border p-2 rounded">
                                        <option value="">Select</option>
                                        {options.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                ) : (
                                    <input
                                        type={type === 'input' ? 'text' : type}
                                        {...register(name, { required })}
                                        className="w-full border p-2 rounded"
                                        readOnly={readOnly}
                                    />
                                )}
                            </div>
                        ))}

                        <div>
                            <button
                                type="submit"
                                style={{ backgroundColor: '#0B1120' }}
                                className="w-full text-white py-2 rounded-md hover:bg-opacity-90 transition"
                            >
                                {existingData ? 'Update and Publish now' : 'Create and Publish now'}
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default EditBioData;
