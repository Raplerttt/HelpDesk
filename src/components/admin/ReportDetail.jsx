import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaExclamationCircle, FaFileAlt } from 'react-icons/fa';
import axios from '../../utils/axios';

const ReportDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/admin/reports/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`,
          },
        });
        setReport(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Laporan tidak ditemukan');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const closeModal = () => {
    setError(null);
    navigate('/admin/reports'); // Arahkan kembali ke halaman daftar laporan
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Error</h3>
          <p className="text-gray-600">{error}</p>
          <div className="mt-6 text-center">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
        {/* Tombol kembali */}
        <Link to="/admin/reports" className="text-blue-500 flex items-center space-x-2 mb-6 p-4 hover:text-blue-700">
          <FaArrowLeft />
          <span className="font-medium">Kembali ke Daftar Laporan</span>
        </Link>

        <div className="p-6 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Detail Laporan</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 text-gray-600">
              <FaUser className="text-xl text-blue-500" />
              <div>
                <strong className="text-lg">Pelapor:</strong>
                <p className="mt-1 text-lg font-medium text-gray-800">{report.user?.nama_lengkap}</p>
              </div>
            </div>
            <div
              className={`flex items-center justify-center space-x-2 text-lg font-semibold ${
                report.status === 'Ditolak'
                  ? 'bg-red-100 text-red-600'  // Merah untuk Ditolak
                  : report.status === 'Menunggu'
                  ? 'bg-yellow-100 text-yellow-600'  // Kuning untuk Menunggu
                  : report.status === 'Selesai'
                  ? 'bg-green-100 text-green-600'  // Hijau untuk Selesai
                  : 'bg-gray-100 text-gray-600'  // Default jika status tidak dikenali
              } px-4 py-2 rounded-full inline-block`}
            >
              <FaExclamationCircle />
              <span>{report.status}</span>
            </div>
          </div>

          <div className="border-t border-gray-300 my-6"></div>

          <div className="text-gray-700">
            <div className="flex items-center space-x-2 text-lg text-gray-600">
              <FaFileAlt className="text-blue-500" />
              <strong className="block">Judul Laporan:</strong>
            </div>
            <p className="mt-2 text-lg">{report.pilihan_kendala}</p>
          </div>

          <div className="border-t border-gray-300 my-6"></div>

          <div className="text-gray-700">
            <div className="flex items-center space-x-2 text-lg text-gray-600">
              <FaFileAlt className="text-blue-500" />
              <strong className="block">Deskripsi:</strong>
            </div>
            <p className="mt-2 text-md text-gray-600">{report.deskripsi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
