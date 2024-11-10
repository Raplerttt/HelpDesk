import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardCheck, FaCogs } from 'react-icons/fa';
import SidebarSearch from './admin-components/SidebarSearch';
import MenuItem from './admin-components/MenuItem';
import ContentHeader from './admin-components/ContentHeader';

const sampleReports = [
  { id: 1, user: 'John Doe', report: 'Bug di halaman login', status: 'Pending', description: 'Ada masalah saat login menggunakan akun.' },
  { id: 2, user: 'Jane Smith', report: 'Laporan tidak dapat diakses', status: 'In Progress', description: 'Pengguna melaporkan tidak bisa mengakses halaman laporan.' },
  { id: 3, user: 'Alice Brown', report: 'Kesalahan sistem', status: 'Completed', description: 'Terjadi kesalahan sistem saat melakukan pemrosesan.' },
  // ... data dummy lainnya
];

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(sampleReports);
  }, []);

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
          <p>Daftar Laporan</p>
        </div>
    <div className="container mx-auto px-4 py-8">

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Pelapor</th>
            <th className="px-6 py-3 text-left">Laporan</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id} className="border-b">
              <td className="px-6 py-3">{report.id}</td>
              <td className="px-6 py-3">{report.user}</td>
              <td className="px-6 py-3">
                <Link to={`/admin/reports/${report.id}`} className="text-blue-500 hover:text-blue-700">
                  {report.report}
                </Link>
              </td>
              <td className={`px-6 py-3 ${report.status === 'Pending' ? 'text-red-500' : report.status === 'In Progress' ? 'text-yellow-500' : 'text-green-500'}`}>
                {report.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default ReportList;
