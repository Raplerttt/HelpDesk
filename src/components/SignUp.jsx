import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon mata
import LoadingSpinner from './LoadingSpinner';
import "../style/buttonpass.css"

const SignUp = () => {
    const [nik, setNik] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
    const [passwordError, setPasswordError] = useState(''); // State untuk pesan kesalahan password

    const navigate = useNavigate();

    const validatePassword = (password) => {
        // Regex untuk memeriksa password harus terdiri dari huruf, angka, dan karakter khusus
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset pesan kesalahan
        setPasswordError('');

        // Validasi password sebelum mengirim data
        if (!validatePassword(password)) {
            setPasswordError('Password harus terdiri dari minimal 8 karakter, termasuk huruf, angka, dan karakter khusus.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('users/daftar', {
                NIK: nik,
                nama_lengkap: fullName,
                email,
                username,
                password,
            });
            console.log(response.data);
            alert('User registered successfully!');
            navigate('/layanan');
        } catch (error) {
            console.error(error);
            alert('Error registering user: ' + (error.response?.data.error || 'Unknown error'));
        } finally {
            setLoading(false);
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
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline pr-10" // Tambahkan padding kanan untuk memberi ruang bagi ikon
                            id="password"
                            type={showPassword ? "text" : "password"} // Toggle antara text dan password
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <button 
                            type="button" 
                            className="absolute inset-y-0 right-2 flex items-center button-icon-sign" // Atur ke right-2 untuk sedikit menggeser ikon ke dalam
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {/* Pesan kesalahan akan ditampilkan di atas tombol */}
                    {passwordError && (
                        <p className="text-red-500 text-xs mb-4">{passwordError}</p> // Tampilkan pesan kesalahan jika ada
                    )}
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
                            href="/"
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
