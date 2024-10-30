import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, ShoppingCartIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Periksa apakah token ada di sessionStorage untuk menentukan status login
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token); // Set status login berdasarkan keberadaan token
  }, []);

  const handleLogout = () => {
    // Menghapus token dari sessionStorage
    sessionStorage.removeItem('token');
    // Mengarahkan pengguna kembali ke halaman login
    navigate('/');
  };

  return (
    <nav className="bg-white p-4 rounded-lg shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-orange-400 text-2xl font-bold">
          Pusat <span className="text-blue-700">Bantuan</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Render tautan jika pengguna sudah login */}
          {isLoggedIn && (
            <>
              <Link to="/profil" className="flex items-center text-blue-700 hover:text-blue-500">
                <UserIcon className="h-5 w-5 mr-1" />
                Profil
              </Link>
              <Link to="/cart" className="flex items-center text-blue-700 hover:text-blue-500">
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
          <div className="md:hidden">
            <button className="text-blue-700 focus:outline-none">
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
      </div>
    </nav>
  );
};

export default Navbar;
