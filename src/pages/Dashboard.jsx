import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeSearch from '../components/EmployeeSearch';

const Dashboard = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Get username from localStorage
        const storedUserName = localStorage.getItem('user_name');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        {userName && (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Welcome, {userName}
                            </span>
                        )}
                        <div className="relative">
                            <button className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                                <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80" alt="Your avatar" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
                    <EmployeeSearch />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
