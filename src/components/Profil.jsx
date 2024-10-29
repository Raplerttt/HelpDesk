import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Mengambil token dari sessionStorage
                const token = sessionStorage.getItem('token');
                const response = await axios.get('users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                // Sesuaikan dengan struktur data yang diterima
                setProfile(response.data.user); // Pastikan Anda mengakses property yang benar
            } catch (error) {
                console.error("Gagal mengambil data profil", error);
                alert('Error: ' + (error.response?.data.error || 'Tidak dapat mengambil data profil'));
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Profil Pengguna</h2>
            {profile ? (
                <div>
                    <ProfileField label="NIK" value={profile.NIK} /> {/* Periksa huruf kapital */}
                    <ProfileField label="Nama Lengkap" value={profile.nama_lengkap} />
                    <ProfileField label="Email" value={profile.email} />
                    <ProfileField label="Username" value={profile.username} />
                </div>
            ) : (
                <p className="text-red-500 text-center">Gagal memuat profil pengguna.</p>
            )}
        </div>
    );
};

// Komponen kecil untuk menampilkan setiap field profil
const ProfileField = ({ label, value }) => (
    <div className="mb-4">
        <label className="block text-gray-600 font-bold">{label}:</label>
        <p className="text-gray-700">{value || 'Tidak tersedia'}</p> {/* Tambahkan fallback jika value kosong */}
    </div>
);

export default Profile;
