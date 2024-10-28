import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './LoadingSpinner'; // Import komponen LoadingSpinner

const SignUp = () => {
    const [nik, setNik] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State untuk loading

    const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        setLoading(true); // Set loading menjadi true sebelum melakukan request

        try {
            const response = await axios.post('/daftar', { // URL lengkap ke endpoint backend
                NIK: nik,
                nama_lengkap: fullName,
                email,
                username,
                password,
            });
            console.log(response.data); // Handle success
            alert('User registered successfully!'); // Pop up berhasil
            navigate('/layanan'); // Redirect ke halaman utama
        } catch (error) {
            console.error(error);
            alert('Error registering user: ' + (error.response?.data.error || 'Unknown error'));
        } finally {
            setLoading(false); // Set loading menjadi false setelah selesai
        }
    };

    return (
        <div className="flex items-center justify-between px-10 mt-20 max-w-6xl mx-auto relative">
            {/* Logo Section (Sebelah Kiri) */}
            <div className="flex flex-col items-center p-2">
                <img
                    src="/assets/01.png"
                    alt="Logo"
                    className="w-80 h-80 mb-1"
                />
                <div className="flex flex-col items-center">
                    <p className="text-orange-400 text-5xl font-bold">Pusat</p>
                    <p className="text-blue-700 text-5xl font-bold -mt-11">Bantuan</p>
                </div>
            </div>

            {/* Form Section (Sebelah Kanan) */}
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Daftar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nik">
                            NIK
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nik"
                            type="text"
                            placeholder="Masukkan NIK Anda"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Nama Lengkap
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            placeholder="Masukkan Nama Lengkap"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Masukkan Email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Masukkan Username Anda"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Daftar
                        </button>
                    </div>
                    <div className="flex items-center mt-5">
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="/Login"
                        >
                            Sudah Punya Akun?
                        </a>
                    </div>
                </form>
            </div>

            {/* Tampilkan Spinner jika loading */}
            {loading && <LoadingSpinner />}
        </div>
    );
};

export default SignUp;
