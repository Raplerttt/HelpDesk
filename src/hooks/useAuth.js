// hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from '../utils/axios'; // jika menggunakan axios untuk komunikasi dengan backend

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cek status login ketika komponen pertama kali dirender
    const checkAuth = async () => {
      try {
        const response = await axios.get('/check-auth'); // Ganti dengan endpoint yang memeriksa autentikasi
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data); // Menyimpan data pengguna
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/login', { username, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user); // Menyimpan data pengguna yang login
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return { login, logout, isAuthenticated, user };
};

export default useAuth;
