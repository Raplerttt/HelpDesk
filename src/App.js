import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import LayananPage from './pages/LayananPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/layanan' element={<LayananPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;