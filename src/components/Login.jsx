import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi

    const handleLogin = async (e) => {
        e.preventDefault(); // Mencegah reload halaman

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { 
                username,
                password,
            });

            console.log(response.data); // Handle success
            alert('Login berhasil!'); // Pop up berhasil
            
            // Menyimpan token ke localStorage
            localStorage.setItem('token', response.data.token);
            
            // Mengatur waktu kedaluwarsa token (misalnya, 1 jam = 3600000 ms)
            const expirationTime = 3600000; // 1 jam
            setTimeout(() => {
                localStorage.removeItem('token');
                alert('Token telah kedaluwarsa, silakan login kembali.');
                navigate('/'); // Redirect ke halaman login
            }, expirationTime);
            
            navigate('/layanan'); // Redirect ke halaman utama
        } catch (error) {
            console.error(error);
            alert('Error logging in: ' + (error.response?.data.error || 'Unknown error'));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Menghapus token dari localStorage
        alert('Anda telah logout.'); // Memberi tahu pengguna
        navigate('/login'); // Redirect ke halaman login
    };

    useEffect(() => {
        // Mengecek apakah pengguna sudah login
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/layanan'); // Redirect jika sudah login
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-between px-10 mt-20 max-w-6xl mx-auto">
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
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md ">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Masuk</h2>
                <form onSubmit={handleLogin}>
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
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Masuk
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#"
                        >
                            Lupa Password?
                        </a>
                    </div>
                    <div className="flex items-center mt-5">
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="/" // Ganti dengan path pendaftaran
                        >
                            Belum Punya Akun?
                        </a>
                    </div>
                </form>
                <div className="flex justify-center mt-5">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
