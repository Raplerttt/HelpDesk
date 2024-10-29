import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon mata
import '../style/buttonpass.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State untuk kontrol visibilitas password
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/layanan'); // Redirect ke halaman layanan jika sudah login
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('users/login', { username, password });
      console.log(response.data);
      alert('Login berhasil!');

      // Menyimpan token ke sessionStorage
      sessionStorage.setItem('token', response.data.token);
      // Atur waktu kedaluwarsa token (1 jam = 3600000 ms)
      sessionStorage.setItem('tokenExpiry', Date.now() + 3600000);
      navigate('/layanan');
    } catch (error) {
      console.error(error);
      alert('Error logging in: ' + (error.response?.data.error || 'Unknown error'));
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem('token');
      const tokenExpiry = sessionStorage.getItem('tokenExpiry');

      // Cek apakah token ada dan belum kedaluwarsa
      if (token && tokenExpiry && Date.now() > tokenExpiry) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiry');
        alert('Session expired. Please log in again.');
        navigate('/login');
      }
    };

    checkToken(); // Cek token saat komponen pertama kali dimuat

    // Set interval untuk memeriksa token setiap menit
    const intervalId = setInterval(checkToken, 60000); // 60000 ms = 1 menit

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-between px-10 mt-20 max-w-6xl mx-auto">
      {/* Logo Section (Sebelah Kiri) */}
      <LogoSection />

      {/* Form Section (Sebelah Kanan) */}
      <LoginForm 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} // Pass state dan setter untuk password
      />
    </div>
  );
};

// Komponen untuk Logo
const LogoSection = () => (
  <div className="flex flex-col items-center p-2">
    <img src="/assets/01.png" alt="Logo" className="w-80 h-80 mb-1" />
    <div className="flex flex-col items-center">
      <p className="text-orange-400 text-5xl font-bold">Pusat</p>
      <p className="text-blue-700 text-5xl font-bold -mt-11">Bantuan</p>
    </div>
  </div>
);

// Komponen untuk Form Login
const LoginForm = ({ username, setUsername, password, setPassword, handleLogin, showPassword, setShowPassword }) => (
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
    <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Masuk</h2>
    <form onSubmit={handleLogin}>
      <FormInput
        id="username"
        label="Username"
        type="text"
        placeholder="Masukkan Username Anda"
        value={username}
        onChange={setUsername}
      />
      <div className="mb-4 relative"> {/* Tambahkan relative di sini */}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" // Tambahkan padding kanan untuk memberi ruang bagi ikon
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
          className="absolute inset-y-0 right-2 flex items-center button-icon" // Atur ke right-2 untuk sedikit menggeser ikon ke dalam
          style={{ top: '72%', transform: 'translateY(-50%)' }} // Geser ke tengah secara vertikal
          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
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
  </div>
);

// Komponen untuk Input Form
const FormInput = ({ id, label, type, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      autoComplete={type === 'password' ? "current-password" : "username"}
    />
  </div>
);

export default Login;
