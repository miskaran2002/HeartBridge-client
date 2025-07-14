import React from 'react';
import { Link } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, updateUserProfile } =useAuth();
    const [profilePic, setProfilePic] = useState('');

    const onSubmit = data => {
        console.log(data); // handle registration logic
        createUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
            // update user profile in firebase
            const userProfile ={
                displayName: data.name,
                photoURL: profilePic
            }
            updateUserProfile(userProfile)
            .then(() => {
                console.log('user profile updated');
            })
            .catch(error => {
                console.log(error);
            })
           
          
        })
        .catch(error => {
            console.log(error);
        })
        
       
    };
    const handleImageUpload = async(e) => {
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await axios.post(imgUploadUrl, formData)
        setProfilePic(res.data.data.url);
        
    }

  

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">Create Your Account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Photo URL */}
                {/* <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                        {...register("photo", { required: true })}
                        type="url"
                        placeholder="https://yourphoto.com/image.jpg"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div> */}


                {/* profile picture*/}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Image</label>
                    <input type="file"
                        onChange={handleImageUpload}
                        className="input w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder='Upload your profile picture'
                    />

                </div>
               
                

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{ backgroundColor: '#0B1120' }}
                    className="w-full text-white py-2 rounded-md hover:bg-opacity-90 transition"
                >
                    Register
                </button>
            </form>

            {/* Footer Section */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-secondary font-medium hover:underline">
                        Login
                    </Link>
                </p>
                <p className="mt-1 text-sm text-gray-600">or</p>

                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
