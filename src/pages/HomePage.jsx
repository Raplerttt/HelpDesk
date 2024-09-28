import React from 'react';
import Navbar from '../components/Navbar';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';

function HomePage (){
    return (
        <div>
        <Navbar/>
        <SignUp/>
        <Footer/>
        </div>
    );
};

export default HomePage;