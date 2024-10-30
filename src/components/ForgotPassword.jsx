import React, { useState } from 'react';

const ForgotPasswordPopup = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika untuk mengirim email di sini (misalnya, panggilan API)
        setMessage(`Kami telah mengirimkan instruksi reset password ke ${email}`);
        setEmail('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">Lupa Password</h2>
                {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
                    >
                        Kirim
                    </button>
                </form>
                <button 
                    onClick={onClose} 
                    className="mt-4 text-blue-500 hover:text-blue-700 transition duration-200"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPopup;
