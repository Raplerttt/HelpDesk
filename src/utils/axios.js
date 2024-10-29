import axios from "axios";

// Membuat instance Axios dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Ganti dengan baseURL backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

// Menambahkan interceptor untuk menyertakan token di setiap permintaan
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // Ambil token dari sessionStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Menyertakan token dalam header
    }
    return config; // Mengembalikan konfigurasi yang telah diperbarui
  },
  (error) => {
    return Promise.reject(error); // Menangani error jika ada
  }
);

export default axiosInstance; // Ekspor instance Axios yang telah dikonfigurasi
