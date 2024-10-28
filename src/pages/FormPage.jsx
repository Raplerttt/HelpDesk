import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Form from '../components/Form';
import LoadingSpinner from '../components/LoadingSpinner';

const FormPage = () => {
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
        <Form/>
        <Footer/>
        </div>
    );
};

export default FormPage;