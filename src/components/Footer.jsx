import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-3 flex justify-between items-center px-10 mt-20 rounded-lg">
      {/* Logo Kecil dan Copyright (Sebelah Kiri) */}
      <div className="flex flex-col items-center">
        <a href="/layanan">
        <img src="/assets/01.png" alt="Logo" className="w-10 h-10" />
        </a>
        <p className="text-sm mt-2">© 2024 Diskominfo.</p>
      </div>

      {/* Media Partner (Sebelah Kanan) */}
      <div className="flex space-x-4 grid-cols-3">
        <div className="flex flex-col items-center gap-2">
        <img src="/assets/arimbi.png" alt="Partner 1" className="w-10 h-10" />
        <img src="/assets/bcc.png" alt="Partner 2" className="w-10 h-10" />
        <img src="/assets/data.png" alt="Partner 3" className="w-10 h-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
        <img src="/assets/arimbi.png" alt="Partner 1" className="w-10 h-10" />
        <img src="/assets/bcc.png" alt="Partner 2" className="w-10 h-10" />
        <img src="/assets/data.png" alt="Partner 3" className="w-10 h-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
        <img src="/assets/arimbi.png" alt="Partner 1" className="w-10 h-10" />
        <img src="/assets/bcc.png" alt="Partner 2" className="w-10 h-10" />
        <img src="/assets/data.png" alt="Partner 3" className="w-10 h-10" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
