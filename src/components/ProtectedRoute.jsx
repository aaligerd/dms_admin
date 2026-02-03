import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userEmpId = localStorage.getItem('user_emp_id');

    if (!userEmpId) {
        // Redirect to login if user is not authenticated
        return <Navigate to="/dms/login" replace />;
    }

    // Render the protected component if authenticated
    return children;
};

export default ProtectedRoute;
