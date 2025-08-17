import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome back, ${res.user.displayName || 'User'}!`,
                    confirmButtonColor: '#0B1120'
                });
                navigate(from);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: err.message,
                    confirmButtonColor: '#0B1120'
                });
            });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
                Login to HeartBridge
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Password Field */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{ backgroundColor: '#0B1120' }}
                    className="w-full text-white py-2 rounded-md hover:bg-opacity-90 transition"
                >
                    Login
                </button>
            </form>

            {/* Footer section */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-secondary font-medium hover:underline">
                        Register
                    </Link>
                </p>
                <p className="mt-4 text-sm text-gray-600">or</p>

                {/* Google Login Button */}
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
