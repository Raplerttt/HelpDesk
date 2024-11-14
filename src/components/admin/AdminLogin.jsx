import React, { useState } from 'react';
import axios from '../../utils/axios';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Menggunakan React Router untuk navigasi

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi halaman

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Pastikan URL sesuai dengan yang ada di backend
      const response = await axios.post('admin/login', formData);

      // Cek apakah token ada di response
      if (response.data.token) {
        // Simpan token dan username di sessionStorage
        sessionStorage.setItem('adminToken', response.data.token);
        sessionStorage.setItem('adminUsername', formData.username); // Menyimpan username

        // Redirect ke dashboard admin
        navigate('/admin/dashboard'); // Gunakan react-router-dom untuk pengalihan
      } else {
        setError('Token tidak ditemukan dalam response. Coba lagi.');
      }
    } catch (err) {
      // Menampilkan error yang lebih jelas jika terjadi kegagalan
      setError(err.response?.data?.message || 'Login gagal, periksa kembali kredensial Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 animate__animated animate__fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          <FaSignInAlt className="w-8 h-8 inline-block mr-2 text-blue-500" />
          Login Admin
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text" 
              name="username" 
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan username Anda"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan password Anda"
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border animate-spin border-white border-2 border-t-transparent rounded-full w-5 h-5"></div> // Spinner saat loading
              ) : (
                <>
                  <FaSignInAlt className="w-5 h-5 mr-2" />
                  Login
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm">
          Belum punya akun?{' '}
          <a href="/admin/signup" className="text-blue-500 hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
