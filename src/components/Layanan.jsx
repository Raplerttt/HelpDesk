import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import icon search

const Layanan = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      {/* Teks Utama */}
      <h1 className="text-3xl font-bold mb-6">Hi, Ada yang bisa saya bantu?</h1>

      {/* Search Bar dengan Icon */}
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

      {/* Menu Layanan dengan Background Putih */}
      <div className="bg-white w-full py-10 rounded-lg">
        <div className="grid grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          {/* Layanan 1 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan1.png" alt="Layanan 1" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 1</p>
          </div>
          {/* Layanan 2 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan2.png" alt="Layanan 2" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 2</p>
          </div>
          {/* Layanan 3 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan3.png" alt="Layanan 3" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 3</p>
          </div>
          {/* Layanan 4 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan4.png" alt="Layanan 4" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 4</p>
          </div>
          {/* Layanan 5 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan5.png" alt="Layanan 5" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 5</p>
          </div>
          {/* Layanan 6 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan6.png" alt="Layanan 6" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 6</p>
          </div>
          {/* Layanan 7 */}
          <div className="flex flex-col items-center">
            <img src="/assets/layanan7.png" alt="Layanan 7" className="w-20 h-20 mb-2" />
            <p className="text-center text-lg font-medium">Layanan 7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
