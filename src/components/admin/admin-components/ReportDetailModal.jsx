import React from 'react';

const ReportDetailModal = ({ report, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false); // Menutup modal
  };

  if (!report) return null; // Jika laporan tidak ada, jangan tampilkan modal

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Detail Laporan</h3>

        {/* Card Content */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong className="text-gray-600">Pelapor:</strong>
            <span>{report.user}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Tanggal:</strong>
            <span>{report.date}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Jenis Masalah:</strong>
            <span>{report.issueType}</span>
          </div>
          <div className="flex justify-between">
            <strong className="text-gray-600">Deskripsi:</strong>
            <p>{report.description}</p>
          </div>

          {/* Attachment Section */}
          <div className="flex justify-between">
            <strong className="text-gray-600">Attachment:</strong>
            {report.attachment ? (
              <a
                href={`/path/to/attachments/${report.attachment}`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Lampiran
              </a>
            ) : (
              <span className="text-gray-500">Tidak ada lampiran</span>
            )}
          </div>

          <div className="flex justify-between">
            <strong className="text-gray-600">Status:</strong>
            <span
              className={
                report.status === 'Pending'
                  ? 'text-red-500'
                  : report.status === 'In Progress'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }
            >
              {report.status}
            </span>
          </div>
        </div>

        {/* Button Tutup */}
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
};

export default ReportDetailModal;
