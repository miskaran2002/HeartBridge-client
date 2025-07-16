import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance= useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data.email, data.password);

          
            const userInfo = {
                name: data.name,                 // ✅ add this
                photoURL: profilePic,              
                email: data.email,
                role:'user',//default role
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
            }
            const userRes= await axiosInstance.post('/users', userInfo);
            console.log(userRes.data);
            const userProfile = {
                displayName: data.name,
                photoURL: profilePic
            };

            await updateUserProfile(userProfile);

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'Welcome to HeartBridge Matrimony.',
                timer: 2000,
                showConfirmButton: false
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Registration failed. Please try again.',
            });
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        try {
            const res = await axios.post(imgUploadUrl, formData);
            setProfilePic(res.data.data.url);
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">Create Your Account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Profile Image Upload */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Upload Profile Picture</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    style={{ backgroundColor: '#0B1120' }}
                    className="w-full text-white py-2 rounded-md hover:bg-opacity-90 transition"
                >
                    Register
                </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-secondary font-medium hover:underline">
                        Login
                    </Link>
                </p>
                <p className="mt-1 text-sm text-gray-600">or</p>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
