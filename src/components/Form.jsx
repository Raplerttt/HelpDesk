import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const Form = () => {
    const [tanggal, setTanggal] = useState('');
    const [pilihanKendala, setPilihanKendala] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [lampiran, setLampiran] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Ambil nama pengguna dari session storage
    const username = sessionStorage.getItem('username');

    const kembali = () => {
        navigate('/layanan');
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Cek apakah semua field terisi
        if (!tanggal || !pilihanKendala || !deskripsi) {
            alert('Silakan lengkapi semua field yang diperlukan.');
            return;
        }
    
        console.log("Submitting form with values:", { tanggal, pilihanKendala, deskripsi, lampiran });
    
        try {
            const token = sessionStorage.getItem('token');
            const formData = new FormData();
            formData.append('tanggal', tanggal);
            formData.append('pilihan_kendala', pilihanKendala);
            formData.append('deskripsi', deskripsi);
    
            if (lampiran) {
                formData.append('lampiran', lampiran); // hanya tambahkan jika ada lampiran
            }
    
            // Log FormData untuk memeriksa isi
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
    
            await axios.post('/forms/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Form berhasil dikirim');
            navigate('/layanan');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('Error: ' + (error.response?.data.error || 'Gagal mengirim form'));
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen p-10">
            <button className="text-blue-500 font-bold mb-6 ml-20" onClick={kembali}>
                &larr; Kembali
            </button>
            <div className="bg-white p-10 rounded-lg flex w-full max-w-6xl mx-auto">
                <div className="w-full lg:w-1/2 pr-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Formulir</h2>
                    
                    {/* Kotak untuk menampilkan nama pengguna */}
                    {username && (
                        <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                            <span className="font-medium text-gray-700">NIK Pengguna: <strong>{username}</strong></span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Tanggal</label>
                            <input
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Pilihan Kendala</label>
                            <select
                                value={pilihanKendala}
                                onChange={(e) => setPilihanKendala(e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            >
                                <option value="">Pilih Kendala</option>
                                <option value="Masalah Teknis">Masalah Teknis</option>
                                <option value="Permintaan Kendala">Permintaan Kendala</option>
                                <option value="Permintaan Perubahan">Permintaan Perubahan</option>
                                <option value="Masalah keamanan">Masalah keamanan</option>
                                <option value="Pertanyaan Informasi">Pertanyaan Informasi</option>
                                <option value="Pengaduan">Pengaduan</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Deskripsi</label>
                            <textarea
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                placeholder="Masukkan Deskripsi"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Lampiran</label>
                            <input
                                type="file"
                                onChange={(e) => setLampiran(e.target.files[0])}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                accept=".jpg,.png,.pdf"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" onClick={kembali}>
                                Batal
                            </button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-5">
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full lg:w-1/2 flex justify-center items-center m-20">
                    <img
                        src="/assets/01.png"
                        alt="Gambar Form"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Form;
