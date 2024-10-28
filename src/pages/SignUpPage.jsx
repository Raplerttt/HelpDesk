import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

const SignUpPage = () => {
    const [loading, setLoading] = useState(true); // State untuk loading

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Sembunyikan loading setelah 1 detik (atau sesuaikan sesuai kebutuhan)
        }, 1000);

        return () => clearTimeout(timer); // Bersihkan timer saat komponen di-unmount
    }, []);

    if (loading) {
        return <LoadingSpinner />; // Tampilkan loading spinner jika loading
    }

    return (
        <div>
        <Navbar/>
        <SignUp/>
        <Footer/>
        </div>
    );
};

export default SignUpPage;