import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';

import { FaHome, FaUser, FaCrown, FaUserShield, FaSignOutAlt, FaCheckCircle, FaChartPie, FaRing } from 'react-icons/fa';
import HeartBridge from '../pages/shared/heartbridgelogo/HeartBridge';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';




const DashboardLayout = () => {
    const { role, roleLoading }= useUserRole();
    console.log(role);
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

    return (

        <div>

          
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-800 text-white hidden lg:flex flex-col p-4 space-y-4">
                    <HeartBridge></HeartBridge>

                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                    >
                        <FaHome /> Home
                    </NavLink>



                    <NavLink
                        to="/dashboard/bioData"
                        className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                    >
                        <FaUser /> My Biodata
                    </NavLink>





                    <NavLink
                        to="/dashboard/viewBiodata"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        <FaUser /> View Biodata
                    </NavLink>

                    <NavLink
                        to="/dashboard/myContactRequests"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        <FaUser /> My Contact Request
                    </NavLink>

                    <NavLink
                        to="/dashboard/myFavourites"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        <FaUser /> My Favourites Biodata
                    </NavLink>

                    <NavLink
                        to="/dashboard/got-married"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                            }`
                        }
                    >
                        <FaRing /> Got Married
                    </NavLink>























                    {/* admins link */}
                    {!roleLoading && role === 'admin' &&
                        <>


                        <NavLink
                            to="/dashboard/biodataInsights"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <FaChartPie /> Admin Dashboard
                        </NavLink>




                            <NavLink
                                to="/dashboard/premiumBenefits"
                                className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-yellow-600 ${isActive ? 'bg-yellow-600' : ''}`}
                            >
                                <FaCrown /> Premium Access
                            </NavLink>




                            <NavLink
                                to="/dashboard/adminPanel"
                                className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                            >
                                <FaUserShield /> Make an Admin
                            </NavLink>
                        <NavLink
                            to="/dashboard/approvedContactRequests"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                                }`
                            }
                        >
                            <FaCheckCircle /> Approved Contact Requests
                        </NavLink>


                        </>

                    }
                   
                    {/* admins link */}


                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600"
                    >
                        <FaSignOutAlt /> Logout
                    </button>


                </aside>

                {/* Drawer Toggle for Small Screens */}
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <label htmlFor="dashboard-drawer" className="cursor-pointer bg-gray-800 text-white px-3 py-2 rounded">
                        ☰
                    </label>
                </div>

                {/* Drawer for Small Screens */}
                <input type="checkbox" id="dashboard-drawer" className="hidden peer" />
                <aside className="peer-checked:flex hidden fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex-col p-4 space-y-4 z-40 lg:hidden">
                    <div>Heart Bridge Dashboard</div>

                    <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
                        <FaHome /> Home
                    </NavLink>

                    <NavLink to="/dashboard/bioData" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
                        <FaUser /> My Biodata
                    </NavLink>


                    <NavLink
                        to="/dashboard/viewBiodata"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        <FaUser /> View Biodata
                    </NavLink>

                    <NavLink
                        to="/dashboard/myContactRequests"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        <FaUser /> My Contact Request
                    </NavLink>

                    <NavLink
                        to="/dashboard/myFavourites"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                        }
                    >
                        <FaUser /> My Favourites Biodata
                    </NavLink>








                    {/* admins link */}
                {
                        !roleLoading && role === 'admin' &&
                    <>



                            <NavLink
                                to="/dashboard/biodataInsights"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                                    }`
                                }
                            >
                                <FaChartPie /> Admin Dashboard
                            </NavLink>

                            
                            <NavLink to="/dashboard/premiumBenefits" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-yellow-600 ${isActive ? 'bg-yellow-600' : ''}`}>
                                <FaCrown /> Premium Access
                            </NavLink>

                            <NavLink to="/dashboard/adminPanel" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}>
                                <FaUserShield /> Make an Admin
                            </NavLink>
                            <NavLink
                                to="/dashboard/approvedContactRequests"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''
                                    }`
                                }
                            >
                                <FaCheckCircle /> Approved Contact Requests
                            </NavLink>

                    </>
                }

                    {/* admins link */}








                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600"
                    >
                        <FaSignOutAlt /> Logout
                    </button>



                    <label htmlFor="dashboard-drawer" className="mt-auto text-sm underline cursor-pointer">Close</label>
                </aside>

                {/* Main content */}
                <main className="flex-1 bg-gray-50 p-4">
                    <Outlet />
                </main>
            </div>

        </div>
        
    );
};

export default DashboardLayout;
