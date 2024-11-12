import React, { useState } from 'react';
import axios from 'axios';
import { FaSignInAlt } from 'react-icons/fa'; // Menggunakan ikon login dari react-icons

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    try {
      const response = await axios.post('/api/admin/login', formData); // Endpoint login di backend
      if (response.data.success) {
        // Simpan token di sessionStorage atau localStorage
        sessionStorage.setItem('adminToken', response.data.token);
        window.location.href = '/admin/dashboard'; // Redirect ke halaman dashboard
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100 animate__animated animate__fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          <FaSignInAlt className="w-8 h-8 inline-block mr-2 text-blue-500" />
          Login Admin
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
                <div className="spinner-border animate-spin w-5 h-5"></div>
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
