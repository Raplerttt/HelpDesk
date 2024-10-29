import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import LayananPage from './pages/LayananPage';
import FormPage from './pages/FormPage';
import LaporanPage from './pages/LaporanPage';
import Profil from './components/Profil';
import ProtectedRoute from './components/ProtectedRoute';

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
      </Routes>
    </Router>
  );
}

export default App;
