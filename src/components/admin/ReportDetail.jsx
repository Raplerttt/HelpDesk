import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const sampleReports = [
    { 
      id: 1, 
      user: 'John Doe', 
      report: 'Bug di halaman login', 
      status: 'Pending', 
      description: 'Ada masalah saat login menggunakan akun. Pengguna tidak bisa masuk setelah beberapa kali mencoba.' 
    },
    { 
      id: 2, 
      user: 'Jane Smith', 
      report: 'Laporan tidak dapat diakses', 
      status: 'In Progress', 
      description: 'Pengguna melaporkan tidak bisa mengakses halaman laporan. Sistem error saat mencoba membuka halaman.' 
    },
    { 
      id: 3, 
      user: 'Alice Brown', 
      report: 'Kesalahan sistem', 
      status: 'Completed', 
      description: 'Terjadi kesalahan sistem saat melakukan pemrosesan. Permintaan tidak bisa diproses sesuai dengan waktu yang ditentukan.' 
    },
    { 
      id: 4, 
      user: 'Mark Johnson', 
      report: 'Tampilan tidak responsif', 
      status: 'Pending', 
      description: 'Halaman tidak dapat menyesuaikan ukuran layar dengan benar pada perangkat mobile.' 
    },
    { 
      id: 5, 
      user: 'Emma Williams', 
      report: 'Fitur pencarian tidak berfungsi', 
      status: 'In Progress', 
      description: 'Pengguna tidak dapat menggunakan fitur pencarian di halaman produk. Hasil pencarian tidak muncul meskipun query benar.' 
    },
    { 
      id: 6, 
      user: 'Oliver Jones', 
      report: 'Masalah dengan notifikasi email', 
      status: 'Completed', 
      description: 'Pengguna tidak menerima notifikasi melalui email saat ada pembaruan akun atau status pesanan.' 
    },
    { 
      id: 7, 
      user: 'Sophia Lee', 
      report: 'Error 404 pada halaman profile', 
      status: 'Pending', 
      description: 'Pengguna tidak bisa mengakses halaman profil dan selalu mendapatkan halaman error 404 setelah login.' 
    },
    { 
      id: 8, 
      user: 'Liam Harris', 
      report: 'Masalah kecepatan loading halaman', 
      status: 'In Progress', 
      description: 'Halaman memerlukan waktu yang sangat lama untuk dimuat, terutama pada koneksi internet lambat.' 
    },
    { 
      id: 9, 
      user: 'Mia Martinez', 
      report: 'Kesalahan pada integrasi API', 
      status: 'Completed', 
      description: 'API tidak mengembalikan data yang benar untuk permintaan tertentu dan menyebabkan tampilan tidak sesuai.' 
    },
    { 
      id: 10, 
      user: 'Lucas Wilson', 
      report: 'Masalah pada tampilan gambar', 
      status: 'Pending', 
      description: 'Gambar pada halaman produk tidak tampil dengan baik, muncul broken link pada beberapa produk.' 
    }
  ];
  

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();  // Hook untuk navigasi

  useEffect(() => {
    const foundReport = sampleReports.find(report => report.id === parseInt(id));
    if (!foundReport) {
      setShowModal(true);
    } else {
      setReport(foundReport);
    }
  }, [id]);

  const closeModal = () => {
    setShowModal(false);
    navigate('/admin/dashboard');  // Arahkan kembali ke halaman dashboard admin
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Laporan Tidak Ditemukan</h3>
          <p className="text-gray-600">Laporan yang Anda cari tidak ditemukan. Pastikan ID laporan yang Anda masukkan sudah benar.</p>
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

  if (!report) {
    return null; // Tidak perlu render apa-apa lagi jika tidak ada laporan dan modal sudah tampil
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Kembali ke halaman sebelumnya */}
        <Link to="/admin/dashboard" className="text-blue-500 flex items-center space-x-2 mb-6 p-4 hover:text-blue-700">
          <FaArrowLeft />
          <span>Kembali ke Daftar Laporan</span>
        </Link>

        <div className="p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Detail Laporan</h2>
          
          {/* Card Content */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                <strong className="text-lg">Pelapor:</strong>
                <p className="mt-1">{report.user}</p>
              </div>
              <div className={`text-lg font-semibold ${report.status === 'Pending' ? 'text-red-500' : report.status === 'In Progress' ? 'text-yellow-500' : 'text-green-500'}`}>
                {report.status}
              </div>
            </div>

            <div className="text-gray-700">
              <strong className="block text-lg">Judul Laporan:</strong>
              <p>{report.report}</p>
            </div>

            <div className="text-gray-700">
              <strong className="block text-lg">Deskripsi:</strong>
              <p>{report.description}</p>
            </div>

          </div>

          {/* Optional Action Button */}
          <div className="mt-8 flex justify-end">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
              Tindakan Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
