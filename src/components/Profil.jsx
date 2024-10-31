import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: '', username: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get('users/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setProfile(response.data.user);
                setFormData({ email: response.data.user.email, username: response.data.user.username });
            } catch (error) {
                console.error("Gagal mengambil data profil", error);
                alert('Error: ' + (error.response?.data.error || 'Tidak dapat mengambil data profil'));
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            await axios.put('users/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile((prev) => ({ ...prev, ...formData }));
            setModalOpen(false);
            alert('Profil berhasil diperbarui!');
        } catch (error) {
            console.error("Gagal memperbarui profil", error);
            alert('Error: ' + (error.response?.data.error || 'Tidak dapat memperbarui profil'));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Profil Pengguna</h2>
            {profile ? (
                <div>
                    <ProfileField label="NIK" value={profile.NIK} />
                    <ProfileField label="Nama Lengkap" value={profile.nama_lengkap} />
                    <ProfileField label="Email" value={profile.email} />
                    <ProfileField label="Username" value={profile.username} />
                    <button 
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() => setModalOpen(true)}
                    >
                        Edit Profil
                    </button>
                    {isModalOpen && (
                        <Modal onClose={() => setModalOpen(false)}>
                            <h3 className="text-lg font-semibold mb-4">Edit Profil</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-600 font-bold">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600 font-bold">Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        type="button" 
                                        className="mr-2 bg-gray-300 py-2 px-4 rounded" 
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}
                </div>
            ) : (
                <p className="text-red-500 text-center">Gagal memuat profil pengguna.</p>
            )}
        </div>
    );
};

const ProfileField = ({ label, value }) => (
    <div className="mb-4">
        <label className="block text-gray-600 font-bold">{label}:</label>
        <p className="text-gray-700">{value || 'Tidak tersedia'}</p>
    </div>
);

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                {children}
            </div>
        </div>
    );
};

export default Profile;
