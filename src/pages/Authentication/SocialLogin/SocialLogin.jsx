import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxios from '../../../hooks/useAxios';

const SocialLogin = () => {
    const { signInWithGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const form = location.state?.from || '/';
    const axiosInstance = useAxios();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;

            const userInfo = {
                email: user.email,
                role: 'user', // default role
                name: user.displayName,
                photoURL: user.photoURL || '',
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
                isPremium: false
            };

            const res = await axiosInstance.post('/users', userInfo);
            console.log('User update info', res.data);

            navigate(form);
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    return (
        <div>
            <button
                onClick={handleGoogleLogin}
                className="mt-4 flex items-center justify-center gap-2 w-full border py-2 rounded-md hover:bg-gray-50 transition"
            >
                <FcGoogle size={22} />
                <span className="text-sm font-medium text-gray-700">Login with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;
