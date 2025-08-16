import { NavLink, useNavigate } from 'react-router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import {
    FaHome,
    FaUserFriends,
    FaInfoCircle,
    FaPhoneAlt,
    FaSignInAlt,
    FaSignOutAlt,
    FaTachometerAlt,
} from 'react-icons/fa';
import HeartBridge from '../heartbridgelogo/HeartBridge';
import useAuth from '../../../hooks/useAuth';
import ThemeController from '../../Theme/ThemeController';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire('Logged out!', 'You have successfully logged out.', 'success');
                navigate('/');
            })
            .catch(err => {
                console.error('Logout error:', err);
                Swal.fire('Error', 'Failed to logout.', 'error');
            });
    };

    const navItems = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'Biodatas', path: '/biodatas', icon: <FaUserFriends /> },
        { name: 'About Us', path: '/about', icon: <FaInfoCircle /> },
        { name: 'Contact Us', path: '/contact', icon: <FaPhoneAlt /> },
    ];

    if (user) {
        navItems.push({ name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> });
    } else {
        navItems.push({ name: 'Login', path: '/login', icon: <FaSignInAlt /> });
    }

    return (
        <nav className="bg-base-100 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between py-1 md:py-2 items-center">
                    {/* Logo */}
                    <HeartBridge />

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navItems.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-1  font-medium transition duration-200 hover:text-red-600 ${isActive ? 'text-red-600 border-b-2 border-red-600 pb-1' : ''}`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))}
                        {/* Theme toggle */}
                        <ThemeController></ThemeController>
                        {/* Logout button only for logged-in users */}
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>
                        )}
                    </div>
                    

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-red-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {navItems.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 text-gray-700 hover:text-red-600 transition ${isActive ? 'text-red-600 font-semibold' : ''}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                    {/* Theme toggle */}
                    <ThemeController />
                    {user && (
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
