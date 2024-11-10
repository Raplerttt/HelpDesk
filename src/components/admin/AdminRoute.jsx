import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';// Menggunakan hook useAuth untuk mengambil data user

function AdminRoute({ element: Component, ...rest }) {
  const { user } = useAuth(); // Ambil informasi user dari hook useAuth

  // Cek apakah user ada dan memiliki peran admin
  if (!user || user.role !== 'admin') {
    // Jika bukan admin, alihkan ke halaman login atau halaman lain yang sesuai
    return <Navigate to="/" replace />;
  }

  // Jika admin, tampilkan komponen yang diminta
  return Component ? <Component {...rest} /> : <Outlet />;
}

export default AdminRoute;
