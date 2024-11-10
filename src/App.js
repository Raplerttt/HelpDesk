import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import LayananPage from './pages/LayananPage';
import FormPage from './pages/FormPage';
import LaporanPage from './pages/LaporanPage';
import Profil from './pages/ProfilPage';
import DashboardAdmin from './pages/AdminDashboard'; // Import halaman dashboard admin
import StatisticPage from './pages/StatisticPage'
import ProtectedRoute from './components/ProtectedRoute';
import ReportDetail from './pages/ReportDetailPage';
import ReportList from './components/admin/ReportList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/daftar' element={<SignUpPage />} />
        <Route path='/profil' element={<ProtectedRoute element={<Profil />} />} />
        <Route path='/layanan' element={<ProtectedRoute element={<LayananPage />} />} />
        <Route path='/formulir' element={<ProtectedRoute element={<FormPage />} />} />
        <Route path='/laporan' element={<ProtectedRoute element={<LaporanPage />} />} />
        {/* Rute khusus untuk dashboard admin */}
        <Route path='/admin/dashboard' element={<DashboardAdmin />} />
        <Route path='/admin/statistic' element={<StatisticPage />} />
        <Route path='/admin/reports/:id' element={<ReportDetail />} />
        <Route path='/admin/reports' element={<ReportList />} />
      </Routes>
    </Router>
  );
}

export default App;
