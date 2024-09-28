import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Login from '../components/Login';
import MediaPartner from '../components/MediaPartner';

const LoginPage = () => {
    return (
        <div>
        <Navbar/>
        <Login/>
        <MediaPartner/>
        <Footer/>
        </div>
    );
};

export default LoginPage;