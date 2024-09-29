// LaporanPage.js
import React from 'react';

const LaporanPage = ({ reportData }) => {
    if (!reportData) {
        return <p>Belum ada laporan yang diajukan.</p>;
    }
    return (
        <div className="min-h-screen p-10 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-center">Laporan Anda</h1>
            {reportData ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>
                    <p><strong>Kendala:</strong> {reportData.issue}</p>
                    <p><strong>Nama:</strong> {reportData.name}</p>
                    <p><strong>Email:</strong> {reportData.email}</p>
                    <p><strong>Tanggal:</strong> {reportData.date}</p>
                    <p><strong>Deskripsi:</strong> {reportData.description}</p>
                    <p><strong>No Tiket:</strong> {reportData.ticketNumber}</p>
                    <p><strong>Status:</strong> {reportData.status}</p>
                    {reportData.attachment && (
                        <div className="mt-4">
                            <strong>Lampiran:</strong> 
                            <a href={URL.createObjectURL(reportData.attachment)} target="_blank" rel="noopener noreferrer">
                                {reportData.attachment.name}
                            </a>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center">Tidak ada laporan yang tersedia.</p>
            )}
        </div>
    );
};

export default LaporanPage;
