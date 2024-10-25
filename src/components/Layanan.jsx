import React, { useEffect } from 'react';
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
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/arimbi.png" alt="Layanan 1" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          {/* Layanan 2 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/bcc.png" alt="Layanan 2" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          {/* Layanan 3 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/data.png" alt="Layanan 3" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          {/* Layanan 4 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/lapor.png" alt="Layanan 4" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          {/* Layanan 5 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/pmo.png" alt="Layanan 5" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          {/* Layanan 6 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/ppid.png" alt="Layanan 6" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          {/* Layanan 7 */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/repositoryapps.png" alt="Layanan 7" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/saring.png" alt="Layanan 8" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="border-2 border-black p-2 bg-gray-100">
              <a href="/formulir">
                <img src="/assets/smartcity-bdg.png" alt="Layanan 9" className="w-23 h-23 mb-2" />
                <p className="text-center text-lg font-medium"></p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layanan;
