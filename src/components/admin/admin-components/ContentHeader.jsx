import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBell, FaSignOutAlt, FaCog } from 'react-icons/fa';

const ContentHeader = ({ adminName, notifications }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newNotification, setNewNotification] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Mengubah status notifikasi baru jika ada laporan baru
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      setNewNotification(true);
    }
  }, [notifications]);

  return (
    <div className="p-4 mb-10 shadow-md rounded-lg">
      <div className="flex justify-between items-center flex-wrap">
        <div className="text-lg font-semibold mb-2 md:mb-0">
          <Link to="/admin/home" className="text-blue-600 hover:text-blue-400 transition duration-300 ease-in-out">
            Home Admin
          </Link>
        </div>

        <div className="flex items-center space-x-4 relative w-full md:w-auto">
          <div className="font-semibold text-gray-800">{adminName}</div>

          {/* Ikon Profil dan Dropdown Menu */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-600 hover:text-gray-400 transition duration-300 ease-in-out focus:outline-none"
            >
              <FaUser size={24} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg w-48 p-2">
                <Link
                  to="/admin/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-200 ease-in-out"
                >
                  <FaCog size={18} />
                  <span>Edit Profile</span>
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg transition duration-200 ease-in-out"
                >
                  <FaSignOutAlt size={18} />
                  <span>Logout</span>
                </Link>
              </div>
            )}
          </div>

          {/* Ikon Notifikasi */}
          <Link
            to="/admin/reports"
            className="relative text-gray-600 hover:text-gray-400 transition duration-300 ease-in-out"
          >
            <FaBell size={24} />
            {/* Notifikasi Badge */}
            {newNotification && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-ping">
                3
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Slider Notifikasi */}
      {newNotification && (
        <div className="fixed top-16 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg w-80 sm:w-96 transform transition-transform duration-500 ease-in-out slide-in">
          <div className="flex justify-between items-center">
            <div className="font-semibold">New User Report</div>
            <button
              onClick={() => setNewNotification(false)}
              className="text-white hover:text-gray-200 transition duration-200 ease-in-out focus:outline-none"
            >
              <FaCog size={16} />
            </button>
          </div>
          <div className="text-sm mt-2">A new report from a user has been submitted. Check the details now!</div>
        </div>
      )}
    </div>
  );
};

export default ContentHeader;
