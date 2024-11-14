import React, { useState } from 'react';
import axios from '../../utils/axios'; // Pastikan path ini sesuai dengan lokasi axios instance Anda
import { FaEnvelope, FaUserAlt, FaLock } from 'react-icons/fa';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler untuk mengubah data input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Cek data formData yang akan dikirim
    console.log("Data yang dikirim:", formData);

    try {
        const response = await axios.post('admin/register', formData);

        // Periksa status code dan data response dari backend
        console.log("Response dari server:", response.data);

        if (response.status === 201) {  // Status 201 untuk berhasil
            window.location.href = '/admin/login'; // Arahkan ke halaman login setelah berhasil
        } else {
            // Jika ada error dalam response
            setError(response.data.error || 'Error creating account. Please try again.');
        }
    } catch (err) {
        // Tangani error di sini dan tampilkan lebih jelas
        setError(err.response?.data?.message || 'Error creating account. Please try again.');
        console.error('Signup Error:', err.response?.data); // Log error detail untuk debugging
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100 animate__animated animate__fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Daftar Admin</h2>
        
        {/* Menampilkan error jika ada */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <FormInputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={<FaEnvelope className="text-gray-500 ml-3" />}
          />
          <FormInputField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            icon={<FaUserAlt className="text-gray-500 ml-3" />}
          />
          <FormInputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon={<FaLock className="text-gray-500 ml-3" />}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Daftar'}
          </button>
        </form>
        
        <p className="text-center text-sm mt-4">
          Sudah punya akun?{' '}
          <a href="/admin/login" className="text-blue-500 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

// Komponen untuk input field yang berisi ikon dan label
const FormInputField = ({ label, name, type, value, onChange, icon }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold">{label}</label>
    <div className="flex items-center border border-gray-300 rounded-md">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 mt-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
  </div>
);

export default AdminSignup;
