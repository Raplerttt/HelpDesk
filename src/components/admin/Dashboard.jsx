import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { FaTachometerAlt, FaClipboardCheck, FaBug, FaCogs, FaBars, FaTimes, FaRegHourglass, FaCheckCircle } from 'react-icons/fa';
import ContentHeader from './admin-components/ContentHeader';
import InfoBox from './admin-components/InfoBox';
import OverlayLoading from './admin-components/OverlayLoading';
import SidebarSearch from './admin-components/SidebarSearch';
import MenuItem from './admin-components/MenuItem';
// import SmallBox from './admin-components/SmallBox';
import ReportDetailModal from './admin-components/ReportDetailModal';
// import ReportRow from './admin-components/ReportRow'; // Extracted row component

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalReports: 0,
        pendingReports: 0
    });
    const [reports, setReports] = useState([]);

    const handleReportClick = (report) => {
        setSelectedReport(report);
        setShowModal(true);
    };

    const handleStatusChange = async (reportId, newStatus) => {
        try {
            const token = sessionStorage.getItem("adminToken");
            if (!token) {
                throw new Error("No token found. Please log in.");
            }
    
            // Kirim permintaan PATCH untuk memperbarui status laporan
            const response = await axios.patch(
                `admin/reports/${reportId}/status`,
                { status: newStatus }, // Kirim status yang benar
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Perbarui status di state tanpa mengubah data laporan lainnya
            setReports((prevReports) =>
                prevReports.map((report) =>
                    report.id === reportId ? { ...report, status: newStatus } : report
                )
            );
    
            console.log(response.data.message); // Sukses
        } catch (error) {
            if (error.response) {
                console.error("Error updating status", error.response.data);
                alert(error.response.data.message || "Error updating status");
            } else {
                console.error("Error updating status", error.message);
                alert(error.message);
            }
        }
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("adminToken");
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }

                // Fetch statistics
                const statsResponse = await axios.get('admin/statistics', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Fetch all reports
                const reportsResponse = await axios.get('admin/reports', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setStats(statsResponse.data);
                setReports(reportsResponse.data);  // Set reports data
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    

    return (
        <div className="flex h-screen bg-blue-200">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            
            {/* Main Content Area */}
            <div className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${sidebarOpen ? '' : 'ml-0'}`}>
                <ContentHeader adminName="Admin Name" />
                <DashboardHeader />
                
                <StatsGrid stats={stats} />
                
                {isLoading && <OverlayLoading />}
                
                <ReportTable reports={reports} onReportClick={handleReportClick} onStatusChange={handleStatusChange} />
                
                <ReportDetailModal show={showModal} setShow={setShowModal} report={selectedReport} />
            </div>
        </div>
    );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => (
    <>
        <div className={`w-64 bg-blue-900 text-black shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
            <SidebarSearch />
            <MenuItem label="Dashboard" icon={FaTachometerAlt} to="/admin/dashboard" />
            <MenuItem label="Laporan" icon={FaClipboardCheck} to="/admin/reports" />
            <MenuItem label="Statistik" icon={FaCogs} to="/admin/statistic" />
        </div>

        <button
            className={`lg:hidden text-white absolute top-4 left-4 ${sidebarOpen ? 'hidden' : ''}`}
            onClick={() => setSidebarOpen(true)}
        >
            <FaBars size={30} />
        </button>

        <button
            className={`lg:hidden text-white absolute top-4 left-4 ${sidebarOpen ? 'block' : 'hidden'}`}
            onClick={() => setSidebarOpen(false)}
        >
            <FaTimes size={30} />
        </button>
    </>
);

const DashboardHeader = () => (
    <div className="mb-6 text-xl font-semibold text-gray-700 border-b-2 pb-4 flex items-center space-x-2">
        <FaTachometerAlt className="text-2xl" />
        <p>Dashboard</p>
    </div>
);

const StatsGrid = ({ stats }) => (
    <div className="grid grid-cols-3 gap-4 mb-6">
        <InfoBox title="Total Users" icon={<FaClipboardCheck />} color="blue" value={stats.totalUsers} />
        <InfoBox title="Active Users" icon={<FaBug />} color="green" value={stats.activeUsers} />
        <InfoBox title="Total Reports" icon={<FaCogs />} color="yellow" value={stats.totalReports} />
        <InfoBox title="Pending Reports" icon={<FaClipboardCheck />} color="red" value={stats.pendingReports} />
    </div>
);

const ReportTable = ({ reports, onReportClick, onStatusChange }) => (
    <div className="overflow-x-auto bg-gray-300 shadow-md rounded-lg border-t-4 border-blue-600">
        <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-10 py-3 text-center">Name</th>
                    <th className="px-2 py-3 text-center">Date</th>
                    <th className="px-2 py-3 text-center">Issue Type</th>
                    <th className="px-2 py-3 text-center">Description</th>
                    <th className="px-2 py-3 text-center">Status</th>
                    <th className="px-2 py-3 text-center">Attachment</th>
                    <th className="px-2 py-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <tr
                            className="text-center"
                            key={report.id}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent row click entirely
                            }}
                        >
                            <td>{report.user?.nama_lengkap || 'No Name'}</td>
                            <td>{new Date(report.tanggal).toLocaleDateString()}</td>
                            <td className="px-3 py-4">{report.pilihan_kendala}</td>
                            <td className="px-3 py-4">{report.deskripsi}</td>
                            <td className="px-3 py-4">{report.status}</td>
                            <td className="px-3 py-4">
                                {report.lampiran ? (
                                    <a href={report.lampiran} target="_blank" rel="noopener noreferrer">View Attachment</a>
                                ) : (
                                    'No Attachment'
                                )}
                            </td>
                            <td className="px-6 py-4 flex justify-center space-x-2">
                                {/* Tombol Status */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click event
                                        onStatusChange(report.id, 'Ditolak');
                                    }}
                                    className="bg-blue-500 text-white p-2 rounded-md"
                                    title="Tolak Laporan"
                                >
                                    <FaTimes size={20} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click event
                                        onStatusChange(report.id, 'Menunggu');
                                    }}
                                    className="bg-yellow-500 text-white p-2 rounded-md"
                                    title="Set as In Progress"
                                >
                                    <FaRegHourglass size={20} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent row click event
                                        onStatusChange(report.id, 'Selesai');
                                    }}
                                    className="bg-green-500 text-white p-2 rounded-md"
                                    title="Set as Completed"
                                >
                                    <FaCheckCircle size={20} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center py-4">No reports available</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);


export default Dashboard;