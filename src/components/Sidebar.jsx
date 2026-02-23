import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from './Modal';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
    const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
    const [orgName, setOrgName] = useState('');
    const [deptName, setDeptName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user_role, setUserRole] = useState('');
    const [userPasswordReseter, setUserPasswordReseter] = useState(false);


    useEffect(() => {
        const user_role = localStorage.getItem('user_role');
        setUserRole(user_role);
    }, []);


    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const user_emp_id = localStorage.getItem('user_emp_id');
        try {
            const response = await fetch(`${API_BASE_URL}/auth/password/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, user_emp_id }),
            });

            if (response.ok) {
                alert('Password reset successfully');
                setPassword('');
                setConfirmPassword('');
                setIsResetPasswordModalOpen(false);
            } else {
                alert('Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('Error resetting password');
        }
    };

    const handleLogout = () => {
        // Clear localStorage keys
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_emp_id');
        localStorage.removeItem('user_org_id');
        localStorage.removeItem('user_name');

        // Navigate to login page
        navigate('/login');
    };

    const handleAddOrg = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/org/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ org_name: orgName }),
            });

            if (response.ok) {
                alert('Organisation added successfully');
                setOrgName('');
                setIsOrgModalOpen(false);
            } else {
                alert('Failed to add organisation');
            }
        } catch (error) {
            console.error('Error adding organisation:', error);
            alert('Error adding organisation');
        }
    };

    const handleAddDept = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/dept/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dept_name: deptName }),
            });

            if (response.ok) {
                alert('Department added successfully');
                setDeptName('');
                setIsDeptModalOpen(false);
            } else {
                alert('Failed to add department');
            }
        } catch (error) {
            console.error('Error adding department:', error);
            alert('Error adding department');
        }
    };

    const navItems = [
        {
            name: 'Dashboard', path: '/dashboard', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        {
            name: 'Secreening Process', path: '/send-email', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 14 14" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm6 2.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M1.547 9.302A4 4 0 0 1 4.5 8a4 4 0 0 1 2.953 1.302c.26.284.03.698-.355.698H1.902c-.385 0-.615-.414-.355-.698M8.875 5.5c0-.345.28-.625.625-.625h2a.625.625 0 0 1 0 1.25h-2a.625.625 0 0 1-.625-.625M9.5 7.875a.625.625 0 1 0 0 1.25h2a.625.625 0 0 0 0-1.25z"
                    />
                </svg>
            )
        },
        {
            name: 'Add Organisation',
            action: () => setIsOrgModalOpen(true),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        },
        {
            name: 'Add Department',
            action: () => setIsDeptModalOpen(true),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            )
        },
        {
            name: 'Add User', path: '/add-user', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            )
        },
        // {
        //     name: 'Add Employee', path: '/add-employee', icon: (
        //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        //         </svg>
        //     )
        // },
        {
            name: 'Change Password',
            action: () => setIsResetPasswordModalOpen(true),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            )
        },
        {
            name: 'Requisition List', path: '/requisition', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <g stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.692 7.889h4.52M11.692 12h4.52m-4.52 4.111h4.52M8.066 8.506a.617.617 0 1 0 0-1.234a.617.617 0 0 0 0 1.234m0 4.111a.617.617 0 1 0 0-1.234a.617.617 0 0 0 0 1.234m0 4.111a.617.617 0 1 0 0-1.234a.617.617 0 0 0 0 1.234" />
                        <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="6" />
                    </g>
                </svg>
            )
        },
        {
            name: 'Requisition Form', path: '/add-requisition', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 28 28" fill="currentColor">
                    <path d="M6 12.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0m2.5-1a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m-1 2.5a1 1 0 1 1 2 0a1 1 0 0 1-2 0m5.5-7.25a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75m.75 6.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5zM6 7.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 7.25M6.75 3A3.75 3.75 0 0 0 3 6.75v14.5A3.75 3.75 0 0 0 6.75 25h14.5A3.75 3.75 0 0 0 25 21.25V6.75A3.75 3.75 0 0 0 21.25 3zM4.5 6.75A2.25 2.25 0 0 1 6.75 4.5h14.5a2.25 2.25 0 0 1 2.25 2.25v14.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25z" />
                </svg>
            )
        },
    ];

    return (

        <>
            {/* 🔹 ADDED: mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-3 left-3 z-50 flex items-center justify-center w-9 h-9
                bg-black backdrop-blur-md text-white rounded-xl shadow-lg border border-gray-800
                 active:scale-95 transition-all duration-200"
            >
                <span className="text-xl">☰</span>
            </button>

            <div
                className={`fixed md:static top-0 left-0 z-50 h-screen w-70
                bg-white border-r dark:bg-gray-900 dark:border-gray-700
                transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-2 right-3 text-2xl text-gray-700 dark:text-gray-200"
                >
                    ✕
                </button>

                <div className="h-full px-4 py-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">DMS Admin</h2>
                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav className='md:-mt-5 -mt-6 lg:-mt-3'> 
                            {navItems.map((item, index) => {
                                if (item.path) {
                                    return (
                                        <NavLink
                                            key={index}
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200' : ''}`
                                            }
                                        >
                                            {item.icon}
                                            <span className="mx-4 font-medium">{item.name}</span>
                                        </NavLink>
                                    );
                                } else {
                                    return (
                                        <button
                                            key={index}
                                            onClick={item.action}
                                            className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                                        >
                                            {item.icon}
                                            <span className="mx-4 font-medium">{item.name}</span>
                                        </button>
                                    );
                                }
                            })}
                            {user_role && user_role === 'SUPERADMIN' && (
                                <NavLink
                                    to="/password-reset"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 mt-5 mb-4 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200' : ''}`
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="mx-4 font-medium">Password Reset</span>
                                </NavLink>
                            )}
                        </nav>

                        <div className="flex items-center px-4 -mx-2 mt-auto">
                            <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="mx-1">Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Add Organisation Modal */}
                    <Modal isOpen={isOrgModalOpen} onClose={() => setIsOrgModalOpen(false)} title="Add Organisation">
                        <form onSubmit={(e) => { e.preventDefault(); handleAddOrg(); }}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Organisation Name</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                    placeholder="Enter organisation name"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="button" onClick={() => setIsOrgModalOpen(false)} className="px-4 py-2 mr-2 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 text-white transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                                    Add Organisation
                                </button>
                            </div>
                        </form>
                    </Modal>

                    {/* Add Department Modal */}
                    <Modal isOpen={isDeptModalOpen} onClose={() => setIsDeptModalOpen(false)} title="Add Department">
                        <form onSubmit={(e) => { e.preventDefault(); handleAddDept(); }}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Department Name</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                    placeholder="Enter department name"
                                    value={deptName}
                                    onChange={(e) => setDeptName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="button" onClick={() => setIsDeptModalOpen(false)} className="px-4 py-2 mr-2 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 text-white transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                                    Add Department
                                </button>
                            </div>
                        </form>
                    </Modal>

                    {/* Reset Password Modal */}
                    <Modal isOpen={isResetPasswordModalOpen} onClose={() => setIsResetPasswordModalOpen(false)} title="Reset Password">
                        <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                            <div className="mb-4 flex flex-col gap-4">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Reset Password</label>
                                <input
                                    type="password"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                    placeholder="Enter confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button type="button" onClick={() => setIsResetPasswordModalOpen(false)} className="px-4 py-2 mr-2 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 text-white transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
