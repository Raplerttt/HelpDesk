import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ForgotPasswordPopup from './ForgotPassword'; // Pastikan nama komponen sesuai
import Notification from './notification/LoginNotification'; // Import komponen Notification
import '../style/buttonpass.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State untuk S&K
  const [notification, setNotification] = useState(''); // State untuk notifikasi
  const [showNotification, setShowNotification] = useState(false); // State untuk menampilkan notifikasi
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/layanan');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert('Anda harus menyetujui syarat dan ketentuan sebelum login.');
      return;
    }

    try {
      const response = await axios.post('users/login', { username, password });
      console.log(response.data);

      // Set notifikasi sukses
      setNotification('Login berhasil!');
      setShowNotification(true);

      // Tampilkan notifikasi selama 2 detik sebelum navigasi
      setTimeout(() => {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('tokenExpiry', Date.now() + 3600000);
        navigate('/layanan');
      }, 2000);
    } catch (error) {
      console.error(error);
      setNotification('Error logging in: ' + (error.response?.data.error || 'Unknown error'));
      setShowNotification(true);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem('token');
      const tokenExpiry = sessionStorage.getItem('tokenExpiry');

      if (token && tokenExpiry && Date.now() > tokenExpiry) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiry');
        alert('Session expired. Please log in again.');
        navigate('/login');
      }
    };

    checkToken();
    const intervalId = setInterval(checkToken, 60000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-10 mt-20 max-w-6xl mx-auto">
      <LogoSection />
      <LoginForm 
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin} 
        showPassword={showPassword} 
        setShowPassword={setShowPassword} 
        handleOpenPopup={handleOpenPopup}
        acceptedTerms={acceptedTerms}  
        setAcceptedTerms={setAcceptedTerms} 
      />
      {isPopupOpen && <ForgotPasswordPopup onClose={handleClosePopup} />}
      
      {/* Tampilkan Notifikasi */}
      {showNotification && 
        <Notification 
          message={notification} 
          onClose={() => setShowNotification(false)} 
        />
      }
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
const LoginForm = ({ username, setUsername, password, setPassword, handleLogin, showPassword, setShowPassword, handleOpenPopup, acceptedTerms, setAcceptedTerms }) => (
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
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button 
          type="button" 
          className="absolute inset-y-0 right-2 flex items-center button-icon-in"
          style={{ top: '50%', transform: 'translateY(-50%)' }} 
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!acceptedTerms && 'opacity-50 cursor-not-allowed'}`}
          type="submit"
          disabled={!acceptedTerms} // Nonaktifkan tombol jika S&K belum disetujui
        >
          Masuk
        </button>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
          onClick={handleOpenPopup}
        >
          Lupa Password?
        </a>
      </div>
      <div className="flex items-center mt-5">
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/daftar" // Ganti dengan path pendaftaran
        >
          Belum Punya Akun?
        </a>
      </div>
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="terms"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          Saya menyetujui <a href="/terms" className="text-blue-500">syarat dan ketentuan</a>.
        </label>
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
