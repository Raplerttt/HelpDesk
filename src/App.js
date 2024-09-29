import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import LayananPage from './pages/LayananPage';
import FormPage from './pages/FormPage';
import LaporanPage from './pages/LaporanPage';
import { useState } from 'react';

function App() {
  const [reportData, setReportData] = useState(null); // State untuk menyimpan data laporan
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/layanan' element={<LayananPage />} />
        <Route path='/Formulir' element={<FormPage/>} />
        <Route path='/Laporan' element={<LaporanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
