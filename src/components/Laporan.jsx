import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { FiFileText, FiUser, FiCalendar, FiPaperclip } from 'react-icons/fi';  // Menggunakan ikon dari react-icons

const statusColors = {
    Dihapus: 'bg-red-500',   // Merah untuk ditolak/gagal
    Menunggu: 'bg-yellow-500', // Kuning untuk menunggu
    Selesai: 'bg-green-500',   // Hijau untuk selesai
};

const LaporanPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get('/forms/reports', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
                alert('Gagal mengambil laporan.');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="p-5 md:p-10">
            <h1 className="text-3xl font-bold mb-8 text-indigo-600">Laporan Anda</h1>
            {reports.length === 0 ? (
                <p className="text-center text-gray-600">Belum ada laporan yang diajukan.</p>
            ) : (
                reports.map((report) => (
                    <div key={report.id} className="bg-white p-5 mb-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
                        <div className="flex flex-col items-center mb-4">
                            <h2 className="text-xl font-semibold text-center text-indigo-700">No. Ticket: {report.id}</h2>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-1 mb-4 md:mb-0 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <FiFileText className="text-indigo-600" />
                                    <p className="text-gray-700 text-lg"><strong>Kendala:</strong> {report.pilihan_kendala}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FiUser className="text-indigo-600" />
                                    <p className="text-gray-700 text-lg"><strong>Nama Pelapor:</strong> {report.nama_lengkap}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FiCalendar className="text-indigo-600" />
                                    <p className="text-gray-700 text-lg"><strong>Tanggal:</strong> {new Date(report.tanggal).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FiFileText className="text-indigo-600" />
                                    <p className="text-gray-700 text-lg"><strong>Deskripsi:</strong> {report.deskripsi}</p>
                                </div>
                            </div>
                            <div className="flex justify-between gap-8 items-center mb-10">
                                {report.lampiran && (
                                    <div className="mt-2 flex items-center space-x-2">
                                        <FiPaperclip className="text-blue-500" />
                                        <a href={report.lampiran} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm overflow-hidden text-ellipsis max-w-xs">
                                            {report.lampiran.split('/').pop().length > 10
                                                ? `${report.lampiran.split('/').pop().slice(0, 10)}`
                                                : report.lampiran.split('/').pop()}
                                        </a>
                                    </div>
                                )}
                                <div className={`mt-2 px-4 py-2 text-white rounded-full ${statusColors[report.status]}`}>
                                    {report.status}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default LaporanPage;
