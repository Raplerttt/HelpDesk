import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import LayananPage from './pages/LayananPage';
import FormPage from './pages/FormPage';
import LaporanPage from './pages/LaporanPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/layanan' element={<LayananPage />} />
        <Route path='/formulir' element={<FormPage/>} />
        <Route path='/laporan' element={<LaporanPage />} />
      </Routes>
    </Router>
  );
}

export default App;
