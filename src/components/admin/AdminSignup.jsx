import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaUserAlt, FaLock } from 'react-icons/fa'; // Ikon email, username, dan password

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    username: '',
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
      const response = await axios.post('/api/admin/signup', formData); // Endpoint signup di backend
      if (response.data.success) {
        // Redirect ke halaman login
        window.location.href = '/admin/login';
      }
    } catch (err) {
      setError('Error creating account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100 animate__animated animate__fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Daftar Admin
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Nama</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUserAlt className="text-gray-500 ml-3" />
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-3 mt-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaEnvelope className="text-gray-500 ml-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Username</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUserAlt className="text-gray-500 ml-3" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 mt-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaLock className="text-gray-500 ml-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Daftar'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm">
          Sudah punya akun? <a href="/admin/login" className="text-blue-500 hover:underline">Login di sini</a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
