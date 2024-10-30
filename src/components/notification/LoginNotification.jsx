import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Notifikasi akan hilang setelah 2 detik

    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmounted
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-green-500 text-white rounded-lg shadow-lg p-4 max-w-md w-full">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
