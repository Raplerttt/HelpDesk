import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaTachometerAlt, FaClipboardCheck, FaBug, FaCogs } from 'react-icons/fa';
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
  // Inisialisasi dummy data untuk statistik
  const [statistics] = useState({
    totalReports: 150,
    pendingReports: 20,
    inProgressReports: 50,
    completedReports: 80
  });

  // Data untuk chart (misalnya menggunakan data status laporan)
  const data = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Reports Status',
        data: [statistics.pendingReports, statistics.inProgressReports, statistics.completedReports],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  // Opsi untuk chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Laporan Statistik'
      }
    }
  };

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
              <td className="px-6 py-3">Pending</td>
              <td className="px-6 py-3">{statistics.pendingReports}</td>
            </tr>
            <tr>
              <td className="px-6 py-3">In Progress</td>
              <td className="px-6 py-3">{statistics.inProgressReports}</td>
            </tr>
            <tr>
              <td className="px-6 py-3">Completed</td>
              <td className="px-6 py-3">{statistics.completedReports}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}

export default StatisticChart;
