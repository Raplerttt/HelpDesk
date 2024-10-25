import React from 'react';
const {useNavigate} = require('react-router-dom');

const Form = () => {

    const navigate = useNavigate();


    const kembali = () => {
        navigate('/layanan');
    }
    return (
        <div className="min-h-screen p-10">
            <button className="text-blue-500 font-bold mb-6 ml-20"
                    onClick={kembali}>
                &larr; Kembali
            </button>
            <div className="bg-white p-10 rounded-lg flex w-full max-w-6xl mx-auto">
                <div className="w-1/2 pr-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Formulir</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Tanggal</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Pilihan Kendala</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            >
                                <option>Pilih Kendala</option>
                                <option>Masalah Teknis</option>
                                <option>Masalah Pembayaran</option>
                                <option>Masalah Akses</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Deskripsi</label>
                            <textarea
                                placeholder="Masukkan Deskripsi"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Lampiran</label>
                            <input
                                type="file"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                                accept=".jpg,.png,.pdf"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                                Batal
                            </button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-5">
                                Kirim
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 flex justify-center items-center m-20">
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
