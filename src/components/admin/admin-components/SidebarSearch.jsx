import React, { useState } from 'react';

// Contoh URL gambar avatar admin
// const avatarUrl = '/assetes/01.png';

const SidebarSearch = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="p-4">
      {/* Admin Info */}
      <div className="flex items-center space-x-4 mt-3 ml-2">
        <img 
          src="/assets/01.png" 
          alt="Admin Avatar" 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div className="text-white">
          <p className="font-semibold">Admin Name</p>
          <p className="text-sm">Administrator</p>
        </div>
      </div>

      {/* Input Search */}
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 bg-white-700 text-black rounded mb-6 mt-5"
        placeholder="Search..."
      />

    </div>
  );
};

export default SidebarSearch;
