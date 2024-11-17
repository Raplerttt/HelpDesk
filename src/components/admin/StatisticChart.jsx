import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from '../../utils/axios';
import { FaTachometerAlt, FaClipboardCheck, FaCogs } from 'react-icons/fa';
import SidebarSearch from './admin-components/SidebarSearch';
import MenuItem from './admin-components/MenuItem';
import ContentHeader from './admin-components/ContentHeader';

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatisticChart = () => {
  // State untuk statistik dan status loading
  const [statistics, setStatistics] = useState({
    totalReports: 0,
    pendingReports: 0,
    inProgressReports: 0,
    completedReports: 0
  });
  const [loading, setLoading] = useState(true); // State untuk status loading

  // Mengambil data statistik laporan dari API
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        setLoading(true); // Set loading to true saat mulai mengambil data
        const response = await axios.get('admin/statistics', {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });// Ganti dengan endpoint API yang sesuai
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // Bisa menambahkan pesan error untuk memberitahukan pengguna
      } finally {
        setLoading(false); // Set loading to false setelah selesai mengambil data
      }
    };

    fetchStatistics();
  }, []); // Dependensi kosong, hanya akan dijalankan sekali saat mount

  // Data untuk chart (menggunakan data yang didapat dari API)
  const data = {
    labels: ['Masalah Teknis', 'Permintaan Kendala', 'Permintaan Perubahan', 'Masalah Keamanan', 'Pertanyaan Informasi', 'Pengaduan'],
    datasets: [
        {
            label: 'Jumlah Laporan',
            data: [
                statistics.masalahTeknisReports,
                statistics.permintaanKendalaReports,
                statistics.permintaanPerubahanReports,
                statistics.masalahKeamananReports,
                statistics.pertanyaanInformasiReports,
                statistics.pengaduanReports,
            ],
            fill: false, // Tidak ada area yang terisi di bawah grafik
            borderColor: 'rgba(75,192,192,1)', // Warna garis grafik
            tension: 0.1, // Kelenturan garis
        },
    ],
};

  // Opsi untuk chart
  const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Grafik Status Laporan',
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) => {
                    return `Jumlah: ${tooltipItem.raw}`; // Menampilkan jumlah laporan di tooltip
                },
            },
        },
    },
  };

  // Jika data masih loading, tampilkan loading spinner atau teks
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blue-200">
      <div className="w-64 bg-blue-900 text-black shadow-lg">
        <SidebarSearch />
        <MenuItem label="Dashboard" icon={FaTachometerAlt} to="/admin/dashboard" />
        <MenuItem label="Laporan" icon={FaClipboardCheck} to="/admin/reports" />
        <MenuItem label="Statistik" icon={FaCogs} to="/admin/statistic" />
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <ContentHeader adminName="Admin Name" />
        <div className="mb-6 text-xl font-semibold text-gray-700 border-b-2 pb-4 flex items-center space-x-2">
          <FaTachometerAlt className="text-2xl" />
          <p>Statistik Laporan</p>
        </div>
        <div className="p-6 bg-blue-200">
          {/* Chart Section */}
          <h2 className="text-lg font-medium">Grafik Status Laporan</h2>
          <Line data={data} options={options} />

          {/* Table Section */}
          <div className="mt-6">
          <h2 className="text-lg font-medium">Statistik Laporan</h2>
          <table className="min-w-full table-auto mt-4 bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
      <tr>
        <th className="px-6 py-3 text-left">Jenis Laporan</th>
        <th className="px-6 py-3 text-left">Jumlah</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-6 py-3">Masalah Teknis</td>
        <td className="px-6 py-3">{statistics.masalahTeknisReports}</td>
      </tr>
      <tr>
        <td className="px-6 py-3">Permintaan Kendala</td>
        <td className="px-6 py-3">{statistics.permintaanKendalaReports}</td>
      </tr>
      <tr>
        <td className="px-6 py-3">Permintaan Perubahan</td>
        <td className="px-6 py-3">{statistics.permintaanPerubahanReports}</td>
      </tr>
      <tr>
        <td className="px-6 py-3">Masalah Keamanan</td>
        <td className="px-6 py-3">{statistics.masalahKeamananReports}</td>
      </tr>
      <tr>
        <td className="px-6 py-3">Pertanyaan Informasi</td>
        <td className="px-6 py-3">{statistics.pertanyaanInformasiReports}</td>
      </tr>
      <tr>
        <td className="px-6 py-3">Pengaduan</td>
        <td className="px-6 py-3">{statistics.pengaduanReports}</td>
      </tr>
    </tbody>
  </table>
</div>

        </div>
      </div>
    </div>
  );
};

export default StatisticChart;
