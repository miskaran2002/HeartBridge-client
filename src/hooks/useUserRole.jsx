import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = '', roleLoading } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email, // Only run if email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        },
    });

    const isAdmin = role === 'admin';

    return { role, roleLoading, isAdmin };
};

export default useUserRole;
