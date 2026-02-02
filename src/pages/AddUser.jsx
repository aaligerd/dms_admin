import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AddUser = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_mail: '',
        user_emp_code: '',
        org_id: '',
        dept_id: ''
    });

    const [organisations, setOrganisations] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchOrganisations = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/org`);
                const data = await response.json();
                if (Array.isArray(data.data)) {
                    setOrganisations(data.data);
                } else if (Array.isArray(data)) {
                    setOrganisations(data);
                } else {
                    setOrganisations([]);
                }
            } catch (error) {
                console.error('Error fetching organisations:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/dept`);
                const data = await response.json();
                if (Array.isArray(data.data)) {
                    setDepartments(data.data);
                } else if (Array.isArray(data)) {
                    setDepartments(data);
                } else {
                    setDepartments([]);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchOrganisations();
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/user/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                let data = await response.json();
                alert(data.msg);
                setFormData({ user_name: '', user_mail: '', user_emp_code: '', org_id: '', dept_id: '' });
            } else {
                let data = await response.json();
                alert(data.msg);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user');
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Add User</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
                    <div className="w-full max-w-lg mx-auto mt-10">
                        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
                            <div className="p-6 bg-indigo-600">
                                <h2 className="text-2xl font-bold text-white text-center">Create New User</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">
                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Username</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Email Address</label>
                                    <input
                                        type="email"
                                        name="user_mail"
                                        value={formData.user_mail}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Employee Code</label>
                                    <input
                                        type="text"
                                        name="user_emp_code"
                                        value={formData.user_emp_code}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                        placeholder="Enter employee code"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Organisation</label>
                                    <select
                                        name="org_id"
                                        value={formData.org_id}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                    >
                                        <option value="">Select Organisation</option>
                                        {organisations.map((org) => (
                                            <option key={org.org_id || org.id} value={org.org_id || org.id}>{org.org_name || org.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Department</label>
                                    <select
                                        name="dept_id"
                                        value={formData.dept_id}
                                        onChange={handleChange}
                                        required
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none focus:ring"
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((dept) => (
                                            <option key={dept.dept_id || dept.id} value={dept.dept_id || dept.id}>{dept.dept_name || dept.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button type="submit" className="px-8 py-2.5 text-white transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 font-semibold shadow-md">
                                        Create User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddUser;
