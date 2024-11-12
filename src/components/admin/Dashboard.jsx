import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaClipboardCheck, FaBug, FaCogs } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import ContentHeader from './admin-components/ContentHeader';
import InfoBox from './admin-components/InfoBox';
import OverlayLoading from './admin-components/OverlayLoading';
import SidebarSearch from './admin-components/SidebarSearch';
import MenuItem from './admin-components/MenuItem';
import SmallBox from './admin-components/SmallBox';
import ReportDetailModal from './admin-components/ReportDetailModal';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sampleReports = [
  { id: 1, user: 'John Doe', date: '2024-11-10', issueType: 'Masalah Teknis', description: 'Bug di halaman login', status: 'Pending', attachment: 'file1.png' },
  { id: 2, user: 'Jane Smith', date: '2024-11-09', issueType: 'Permintaan Perubahan', description: 'Laporan tidak dapat diakses', status: 'In Progress', attachment: 'file2.png' },
  { id: 3, user: 'Alice Brown', date: '2024-11-08', issueType: 'Masalah Keamanan', description: 'Kesalahan sistem', status: 'Completed', attachment: 'file3.png' },
  { id: 4, user: 'Bob White', date: '2024-11-07', issueType: 'Pertanyaan Informasi', description: 'Menanyakan prosedur laporan', status: 'Pending', attachment: 'file4.png' },
  { id: 5, user: 'Charlie Black', date: '2024-11-06', issueType: 'Pengaduan', description: 'Keluhan tentang layanan', status: 'In Progress', attachment: 'file5.png' },
];

const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', isActive: true },
  { id: 3, name: 'Alice Brown', email: 'alice@example.com', isActive: true },
  { id: 4, name: 'Bob White', email: 'bob@example.com', isActive: false },
  { id: 5, name: 'Charlie Black', email: 'charlie@example.com', isActive: true },
];

const Dashboard = () => {
  const [reports, setReports] = useState(sampleReports);
  const [isLoading, setIsLoading] = useState(false);
  const [dummyStats, setDummyStats] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null); // State to store selected report
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const calculateStats = (reports) => {
    const reportTypes = ['Masalah Teknis', 'Permintaan Perubahan', 'Masalah Keamanan', 'Pertanyaan Informasi', 'Pengaduan'];
    const stats = {};

    reportTypes.forEach(type => {
      stats[type] = reports.filter(report => report.issueType === type).length;
    });

    const statusCounts = {
      pendingReports: reports.filter(report => report.status === 'Pending').length,
      inProgressReports: reports.filter(report => report.status === 'In Progress').length,
      completedReports: reports.filter(report => report.status === 'Completed').length,
    };

    return {
      totalUsers: dummyUsers.length,
      activeUsers: dummyUsers.filter(user => user.isActive).length,
      totalReports: reports.length,
      ...stats,
      ...statusCounts,
    };
  };

  const updateReportStatus = (id, newStatus) => {
    setIsLoading(true);
    const updatedReports = reports.map(report =>
      report.id === id ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);
    setDummyStats(calculateStats(updatedReports));
    setIsLoading(false);
  };

  const viewReportDetail = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDummyStats(calculateStats(sampleReports)); // Replace sampleReports with your actual data
      setIsLoading(false);
    }, 2000);
  }, []); //

//   useEffect(() => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setDummyStats(calculateStats(sampleReports));
//       setIsLoading(false);
//     }, 2000);
//   }, []);

  const chartData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Laporan Status',
        data: [
          dummyStats?.pendingReports,
          dummyStats?.inProgressReports,
          dummyStats?.completedReports,
        ],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistik Laporan',
      },
    },
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
          <p>Dashboard</p>
        </div>

        {dummyStats ? (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <InfoBox title="Total Users" value={dummyStats.totalUsers} icon={<FaClipboardCheck />} color="blue" />
            <InfoBox title="Active Users" value={dummyStats.activeUsers} icon={<FaBug />} color="green" />
            <InfoBox title="Total Reports" value={dummyStats.totalReports} icon={<FaCogs />} color="yellow" />
            <InfoBox title="Pending Reports" value={dummyStats.pendingReports} icon={<FaClipboardCheck />} color="red" />
          </div>
        ) : (
          <p>Loading statistics...</p>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <SmallBox title="Masalah Teknis" value={dummyStats?.['Masalah Teknis']} icon={<FaBug />} color="red" />
          <SmallBox title="Permintaan Perubahan" value={dummyStats?.['Permintaan Perubahan']} icon={<FaClipboardCheck />} color="orange" />
          <SmallBox title="Masalah Keamanan" value={dummyStats?.['Masalah Keamanan']} icon={<FaCogs />} color="green" />
          <SmallBox title="Pertanyaan Informasi" value={dummyStats?.['Pertanyaan Informasi']} icon={<FaBug />} color="blue" />
          <SmallBox title="Pengaduan" value={dummyStats?.['Pengaduan']} icon={<FaClipboardCheck />} color="purple" />
        </div>

        {isLoading && <OverlayLoading />}

        <div className="overflow-x-auto bg-gray-300 shadow-md rounded-lg border-t-4 border-blue-600">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-10 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Issue Type</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Attachment</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                    <button className='px-3 py-3 mt-7'
                    onClick={() => viewReportDetail(report)}>
                    <td className="px-6 py-3 border-b-2 border-blue-500">{report.user}</td>
                    </button>
                  <td className="px-3 py-3">{report.date}</td>
                  <td className="px-3 py-3">{report.issueType}</td>
                  <td className="px-3 py-3">{report.description}</td>
                  <td className="px-3 py-3">{report.status}</td>
                  <td className="px-10 py-3">
                  <a href={`/path/to/attachments/${report.attachment}`} className="text-blue-600">
                    {report.attachment}
                    </a>
                  </td>
                  <td className="px-3 py-3">
                  <div className="mt-2 relative">
                    <select 
                        value={report.status} 
                        onChange={(e) => updateReportStatus(report.id, e.target.value)} 
                        className="px-4 py-2 mr-7 bg-gray-200 text-gray-700 rounded-md appearance-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    {/* Custom arrow for the select */}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          {dummyStats ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <p>Loading statistics chart...</p>
          )}
        </div>

        {showModal && selectedReport && (
            <ReportDetailModal report={selectedReport} setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
