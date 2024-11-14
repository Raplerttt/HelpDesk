import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, ShoppingCartIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State untuk menu mobile

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Menghapus semua item dari sessionStorage
    sessionStorage.clear();

    // Menghapus semua cookies
    document.cookie.split(';').forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Redirect pengguna ke halaman utama setelah logout
    navigate('/');
  };

  return (
    <nav className="bg-white p-4 rounded-lg shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/layanan" className="text-orange-400 text-2xl font-bold">
          Pusat <span className="text-blue-700">Bantuan</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {/* Render tautan jika pengguna sudah login */}
          {isLoggedIn && (
            <>
              <Link to="/profil" className="flex items-center text-blue-700 hover:text-blue-500">
                <UserIcon className="h-5 w-5 mr-1" />
                Profil
              </Link>
              <Link to="/laporan" className="flex items-center text-blue-700 hover:text-blue-500">
                <ShoppingCartIcon className="h-5 w-5 mr-1" />
                Keranjang
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-blue-700 hover:text-blue-500 focus:outline-none"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-blue-700 focus:outline-none">
            {/* Icon untuk mobile menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white rounded-lg shadow-md mt-2 p-4">
          {isLoggedIn && (
            <>
              <Link to="/profil" className="block text-blue-700 hover:text-blue-500 mb-2">
                <UserIcon className="h-5 w-5 inline mr-1" />
                Profil
              </Link>
              <Link to="/laporan" className="block text-blue-700 hover:text-blue-500 mb-2">
                <ShoppingCartIcon className="h-5 w-5 inline mr-1" />
                Keranjang
              </Link>
              <button
                onClick={handleLogout}
                className="block text-blue-700 hover:text-blue-500"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 inline mr-1" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
