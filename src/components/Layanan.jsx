import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Import icon search

const Layanan = () => {
  const navigate = useNavigate();

  // Fungsi untuk memeriksa token
  const checkToken = () => {
    const token = sessionStorage.getItem('token');
    const tokenExpiry = sessionStorage.getItem('tokenExpiry');

    // Cek jika token tidak ada atau kedaluwarsa
    if (!token || (tokenExpiry && Date.now() > tokenExpiry)) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiry');
      navigate('/login'); // Redirect jika token tidak ada atau kedaluwarsa
    }
  };

  useEffect(() => {
    checkToken(); // Panggil fungsi pemeriksaan token
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      {/* Teks Utama */}
      <h1 className="text-3xl font-bold mb-6">Hi, Ada yang bisa saya bantu?</h1>

      {/* Search Bar dengan Icon */}
      <SearchBar />

      {/* Menu Layanan dengan Background Putih */}
      <ServiceMenu />
    </div>
  );
};

// Komponen untuk Search Bar
const SearchBar = () => (
  <div className="flex items-center w-full max-w-lg mb-10">
    <input
      type="text"
      placeholder="Cari bantuan..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
    />
    <button className="text-black px-5 py-5 rounded-r-lg">
      <FaSearch />
    </button>
  </div>
);

// Komponen untuk Menu Layanan
const ServiceMenu = () => (
  <div className="bg-white w-full py-10 rounded-lg">
    <div className="grid grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {/* Array layanan yang akan dirender */}
      {serviceItems.map((service, index) => (
        <ServiceItem key={index} service={service} />
      ))}
    </div>
  </div>
);

// Daftar layanan
const serviceItems = [
  { src: '/assets/arimbi.png', alt: 'Layanan 1', link: '/formulir' },
  { src: '/assets/bcc.png', alt: 'Layanan 2', link: '/formulir' },
  { src: '/assets/data.png', alt: 'Layanan 3', link: '/formulir' },
  { src: '/assets/lapor.png', alt: 'Layanan 4', link: '/formulir' },
  { src: '/assets/pmo.png', alt: 'Layanan 5', link: '/formulir' },
  { src: '/assets/ppid.png', alt: 'Layanan 6', link: '/formulir' },
  { src: '/assets/repositoryapps.png', alt: 'Layanan 7', link: '/formulir' },
  { src: '/assets/saring.png', alt: 'Layanan 8', link: '/formulir' },
  { src: '/assets/smartcity-bdg.png', alt: 'Layanan 9', link: '/formulir' },
];

// Komponen untuk setiap item layanan
const ServiceItem = ({ service }) => (
  <div className="flex flex-col items-center">
    <div className="border-2 border-black p-2 bg-gray-100">
      <a href={service.link}>
        <img src={service.src} alt={service.alt} className="w-23 h-23 mb-2" />
        <p className="text-center text-lg font-medium">{service.alt}</p>
      </a>
    </div>
  </div>
);

export default Layanan;
