import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

const PasswordReset = () => {
    const userName = localStorage.getItem('user_name');
    // load all users
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const url = `${process.env.REACT_APP_API_BASE_URL}/user/`;
                const response = await fetch(url);
                const data = await response.json();
                setUsers(data.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleResetPassword = async (userId) => {
        console.log(userId);
        const url = `${process.env.REACT_APP_API_BASE_URL}/auth/password/reset/basic`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId
            }),
        });
        const data = await response.json();
        if (data.status === 'success') {
            alert(data.message);
        } else {
            alert(data.message);
        }
    }


    return (
        <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white ml-10 lg:ml-0 md:ml-0">Password Reset</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        {userName && (
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:block md:block">
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

                <div>
                    <table className="table-auto min-w-full divide-y divide-gray-300 dark:divide-gray-700 border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">ID</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200">{user.user_emp_code}</td>
                                    <td className="px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200">{user.user_name}</td>
                                    <td className="px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200">
                                        <button className="flex px-2 py-1 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600" onClick={() => handleResetPassword(user.user_id)}>
                                            Reset <span className='ml-1 hidden lg:block md:block'>Password</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default PasswordReset