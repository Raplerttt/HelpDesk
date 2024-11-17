import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EditProfilPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Tidak menampilkan modal jika isOpen false

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white w-96 p-6 rounded-lg shadow-lg relative"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-lg">Edit Profile</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              className="p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Link
              to="/admin/profile"
              className="text-blue-500 hover:text-blue-400 transition duration-200"
            >
              Save Changes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilPopup;
