import React, { useState, useEffect, useRef } from 'react';
import axios from '../../../utils/axios'; // Pastikan axios sudah diatur dengan benar
import { FaSearch, FaSpinner } from 'react-icons/fa'; // Import ikon pencarian dan spinner dari react-icons

// Contoh URL gambar avatar admin
const avatarUrl = '/assets/01.png';

const SidebarSearch = () => {
  const [query, setQuery] = useState(''); // Untuk menyimpan input pencarian
  const [adminName, setAdminName] = useState(''); // Untuk menyimpan nama admin
  const [reporters, setReports] = useState([]); // Untuk menyimpan data pelapor
  const [filteredReporters, setFilteredReports] = useState([]); // Untuk menyimpan hasil pencarian
  const [loading, setLoading] = useState(false); // Untuk menunjukkan status loading

  const debounceTimeout = useRef(null); // Gunakan useRef untuk debounce timeout

  useEffect(() => {
    // Mengambil nama admin dari sessionStorage saat komponen pertama kali di-render
    const storedUsername = sessionStorage.getItem('adminUsername');
    if (storedUsername) {
      setAdminName(storedUsername); // Menyimpan nama admin dari sessionStorage
    }
  }, []);

  useEffect(() => {
    // Mengambil daftar pelapor dari API
    const fetchReports = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
          throw new Error('Token not found');
        }

        setLoading(true); // Set loading saat fetching data
        const response = await axios.get('admin/reports', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setReports(response.data);
        setFilteredReports(response.data);  // Set data pelapor sebagai hasil awal
        setLoading(false); // Matikan loading setelah data diambil
      } catch (error) {
        console.error('Error fetching reporters:', error);
        setLoading(false); // Matikan loading jika terjadi error
      }
    };
    
    fetchReports();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredReports([]); // Jika query kosong, hapus hasil pencarian
        return;
      }

      setLoading(true); // Set loading saat pencarian sedang dilakukan
      const filtered = reporters.filter((report) => {
        // Memeriksa apakah user.nama_lengkap ada dan cocok
        return report.user?.nama_lengkap && report.user?.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase());
      });

      setFilteredReports(filtered);
      setLoading(false); // Matikan loading setelah pencarian selesai
    }, 300); // Debounce untuk pencarian
  };

  return (
    <div className="p-4">
      {/* Admin Info */}
      <div className="flex items-center space-x-4 mt-3 ml-2">
        <img
          src={avatarUrl}
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-white">
          <p className="font-semibold">{adminName || 'Admin Name'}</p> {/* Menampilkan nama admin */}
          <p className="text-sm">Administrator</p>
        </div>
      </div>

      {/* Input Search dengan Ikon */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch} // Mengubah query pencarian
          className="w-full p-2 bg-white-700 text-black rounded mb-6 mt-5 pl-10" // Menambahkan padding kiri untuk ikon
          placeholder="Cari berdasarkan nama"
        />
        {/* Ikon Search */}
        <FaSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20} // Ukuran ikon
        />
        {/* Menampilkan spinner loading jika sedang mencari */}
        {loading && (
          <FaSpinner
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 animate-spin"
            size={20} // Ukuran ikon
          />
        )}
      </div>

      {/* Daftar Pelapor yang difilter */}
      <div className="mt-4">
        {/* Tampilkan dropdown hanya jika ada query dan hasil pencarian */}
        {query && (
          <ul className="max-h-60 overflow-auto bg-white shadow-lg rounded">
            {filteredReporters.length > 0 ? (
              filteredReporters.map((report) => (
                <li key={report.id} className="text-black py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  {report.user?.nama_lengkap}
                </li>
              ))
            ) : (
              <li className="text-black py-2 px-4">No matching reporters found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarSearch;
