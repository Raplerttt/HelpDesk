import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ label, icon, to }) => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-500 text-white' : 'text-gray-400';
  };
  return (
    <Link
        to={to}
        className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${isActive(to)}`}
      >
      <div className="mr-2 ml-4 text-bold">
        <FontAwesomeIcon icon={icon} size="2x" /> {/* Ukuran icon diperbesar */}
      </div>
      <span>{label}</span>
    </Link>
  );
};

export default MenuItem;
