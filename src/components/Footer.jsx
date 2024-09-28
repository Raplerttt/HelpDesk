import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-3 flex justify-between items-center px-10 mt-20 rounded-lg">
      {/* Logo Kecil dan Copyright (Sebelah Kiri) */}
      <div className="flex flex-col items-center">
        <img src="/assets/01.png" alt="Logo" className="w-10 h-10" />
        <p className="text-sm mt-2">© 2024 Diskominfo.</p>
      </div>

      {/* Media Partner (Sebelah Kanan) */}
      <div className="flex space-x-4">
        <img src="/assets/partner-logo1.png" alt="Partner 1" className="w-20 h-20" />
        <img src="/assets/partner-logo2.png" alt="Partner 2" className="w-20 h-20" />
        <img src="/assets/partner-logo3.png" alt="Partner 3" className="w-20 h-20" />
        {/* Tambahkan logo partner lainnya sesuai kebutuhan */}
      </div>
    </footer>
  );
};

export default Footer;
