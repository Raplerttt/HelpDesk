import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAdminRoute, ...rest }) => {
    // Token untuk admin dan user
    const adminToken = sessionStorage.getItem('adminToken');  // Token admin
    const userToken = sessionStorage.getItem('token');        // Token user

    // Jika token tidak ada (pengguna belum login)
    if (!adminToken && isAdminRoute) {
        // Jika route adalah untuk admin, arahkan ke halaman login admin
        return <Navigate to="/admin/login" replace />;
    }
    
    if (!userToken && !isAdminRoute) {
        // Jika route adalah untuk user, arahkan ke halaman login user
        return <Navigate to="/" replace />;
    }

    // Jika sudah login, tampilkan komponen yang diminta
    return element;
};

export default ProtectedRoute;
