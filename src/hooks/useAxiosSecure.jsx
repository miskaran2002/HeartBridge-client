// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

let interceptorId;

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        const attachInterceptor = async () => {
            if (user?.email) {
                const token = await user.getIdToken();

                // Remove previous interceptor if exists
                if (interceptorId !== undefined) {
                    axiosSecure.interceptors.request.eject(interceptorId);
                }

                // Attach new one
                interceptorId = axiosSecure.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = `Bearer ${token}`;
                        return config;
                    },
                    (error) => Promise.reject(error)
                );
            }
        };

        attachInterceptor();
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;
