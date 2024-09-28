import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 rounded-lg">
      <div className="container mx-auto flex items-center">
        <div className="text-orange-400 text-xl m-2 font-bold">
          Pusat
        </div>
        <div className="text-blue-700 text-xl font-bold">
          Bantuan
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            {/* Icon untuk mobile menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
