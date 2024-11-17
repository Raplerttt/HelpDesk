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
import AdminLoginPages from './pages/AdminLoginPages';
import AdminSignupPages from './pages/AdminSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/daftar' element={<SignUpPage />}/>
        <Route path='/profil' element={<ProtectedRoute element={<Profil />} isAdminRoute={false}/>} />
        <Route path='/layanan' element={<ProtectedRoute element={<LayananPage />} isAdminRoute={false}/>} />
        <Route path='/formulir' element={<ProtectedRoute element={<FormPage />} isAdminRoute={false}/>} />
        <Route path='/laporan' element={<ProtectedRoute element={<LaporanPage />} isAdminRoute={false}/>} />
        {/* Rute khusus untuk dashboard admin */}
        <Route path='/admin/dashboard' element={<ProtectedRoute element={<DashboardAdmin />} isAdminRoute={true} />} />
        <Route path='/admin/statistic' element={<ProtectedRoute element={<StatisticPage />} isAdminRoute={true} />} />
        <Route path='/admin/reports/:id' element={<ProtectedRoute element={<ReportDetail />} isAdminRoute={true} />} />
        <Route path='/admin/reports' element={<ProtectedRoute element={<ReportList />} isAdminRoute={true} />} />
        <Route path='/admin/login' element={<AdminLoginPages />}/>
        <Route path='/admin/signup' element={<AdminSignupPages />} />
      </Routes>
    </Router>
  );
}

export default App;
