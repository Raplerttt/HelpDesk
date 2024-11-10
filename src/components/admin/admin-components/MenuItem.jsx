import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuItem = ({ label, icon, to }) => {
  return (
    <Link to={to} className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded">
      <div className="mr-2 ml-4 text-bold">
        <FontAwesomeIcon icon={icon} size="2x" /> {/* Ukuran icon diperbesar */}
      </div>
      <span>{label}</span>
    </Link>
  );
};

export default MenuItem;
