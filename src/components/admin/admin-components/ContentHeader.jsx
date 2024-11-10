import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBell } from 'react-icons/fa'; // Menggunakan react-icons untuk profil dan notifikasi

const ContentHeader = ({ adminName }) => {
  return (
    <div className="text-red p-4 mb-10">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link to="/admin/home" className="hover:text-gray-400">
            Home Admin
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div>{adminName}</div>

          {/* Ikon Profil */}
          <Link
            to="/admin/profile"
            className="text-gray-600 hover:text-gray-400"
          >
            <FaUser size={24} />
          </Link>

          {/* Ikon Notifikasi */}
          <Link
            to="/admin/reports"
            className="relative text-gray-600 hover:text-gray-400"
          >
            <FaBell size={24} />
            {/* Notifikasi Badge */}
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
