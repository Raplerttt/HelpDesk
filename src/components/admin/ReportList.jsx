import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaClipboardCheck, FaCogs } from 'react-icons/fa';
import SidebarSearch from './admin-components/SidebarSearch';
import MenuItem from './admin-components/MenuItem';
import ContentHeader from './admin-components/ContentHeader';
import axios from '../../utils/axios';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const token = sessionStorage.getItem('adminToken'); // Ambil token dari sessionStorage

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsResponse = await axios.get('admin/reports', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(reportsResponse.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, [token]);

  return (
    <div className="flex h-screen bg-blue-200">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-black shadow-lg">
        <SidebarSearch />
        <MenuItem label="Dashboard" icon={FaTachometerAlt} to="/admin/dashboard" />
        <MenuItem label="Laporan" icon={FaClipboardCheck} to="/admin/reports" />
        <MenuItem label="Statistik" icon={FaCogs} to="/admin/statistic" />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 p-6 overflow-y-auto">
        <ContentHeader adminName="Admin Name" />
        <div className="mb-6 text-xl font-semibold text-gray-700 border-b-2 pb-4 flex items-center space-x-2">
          <FaTachometerAlt className="text-2xl" />
          <p>Daftar Laporan</p>
        </div>
        <div className="container mx-auto px-4 py-8">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center">ID</th>
                <th className="px-6 py-3 text-center">Pelapor</th>
                <th className="px-6 py-3 text-center">Laporan</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Deskripsi</th>
                <th className="px-6 py-3 text-center">View Detail</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50 text-center">
                    <td className="px-6 py-3">{report.id}</td>
                    <td className="px-6 py-3">{report.user?.nama_lengkap || 'No Name'}</td>
                    <td className="px-3 py-4">{report.pilihan_kendala}</td>
                    <td
                      className={`px-6 py-3 ${
                        report.status === 'Ditolak'
                        ? 'text-red-600'  // Merah untuk Ditolak
                        : report.status === 'Menunggu'
                        ? ' text-yellow-600'  // Kuning untuk Menunggu
                        : report.status === 'Selesai'
                        ? 'text-green-600'  // Hijau untuk Selesai
                        : 'text-gray-600'
                      }`}
                    >
                    <td className="px-6 py-3">
                      <Link to={`/admin/reports/${report.id}`} className="text-blue-500 hover:text-blue-700">
                        {report.report}
                      </Link>
                    </td>
                      {report.status}
                    </td>
                    <td className="px-3 py-4">
                            <div className="overflow-hidden">
                                {report.deskripsi.length > 15 ? (
                                    <>
                                        {report.deskripsi.substring(0, 25)}...
                                    </>
                                ) : (
                                    report.deskripsi
                                )}
                            </div>
                    </td>
                    <td className="px-6 py-3">
                      <Link
                        to={`/admin/reports/${report.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No reports available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
