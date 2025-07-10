import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {


const { signInWithGoogle} =useAuth();


    const handleGoogleLogin = () => {
        // Handle Google login here
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);

            })
            .catch((error) => {
                // Handle login error
                console.log(error);
            })
    };
    return (
        <div>
            {/* Google Register Button */}
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