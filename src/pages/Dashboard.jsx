import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeSearch from '../components/EmployeeSearch';

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const storedUserName = localStorage.getItem('user_name');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white ml-8 lg:ml-0 md:ml-0 ">
                            Admin Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        {userName && (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                                Welcome, {userName}
                            </span>
                        )}
                        <img
                            className="w-8 h-8 rounded-full "
                            src="https://images.unsplash.com/photo-1528892952291-009c663ce843"
                            alt="avatar"
                        />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <EmployeeSearch />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
