import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

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
        <div className="min-h-screen p-5 md:p-10 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center">Laporan Anda</h1>
            {reports.length === 0 ? (
                <p className="text-center text-gray-600">Belum ada laporan yang diajukan.</p>
            ) : (
                reports.map((report) => (
                    <div key={report.id} className="bg-white p-5 mb-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                        <div className="flex flex-col items-center mb-4">
                            <h2 className="text-lg font-bold text-center">No. Ticket: {report.id}</h2>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-1 mb-4 md:mb-0">
                                <p className="text-gray-700"><strong>Kendala:</strong> {report.pilihan_kendala}</p>
                                <p className="text-gray-700"><strong>Nama Pelapor:</strong> {report.nama_lengkap}</p>
                                <p className="text-gray-700"><strong>Tanggal:</strong> {new Date(report.tanggal).toLocaleDateString()}</p>
                                <p className="text-gray-700"><strong>Deskripsi:</strong> {report.deskripsi}</p>
                            </div>
                            <div className="flex flex-col items-end">
                            {report.lampiran && (
                                <div className="mt-2">
                                    <strong>Lampiran:</strong>
                                    {console.log(report.lampiran)}
                                    <a href={report.lampiran} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline text-sm">
                                        {report.lampiran.split('/').pop()}
                                    </a>
                                </div>
                            )}
                            {/* Menampilkan status dengan warna sesuai */}
                            <div className={`mt-2 px-3 py-1 text-white rounded ${statusColors[report.status]}`}>
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
