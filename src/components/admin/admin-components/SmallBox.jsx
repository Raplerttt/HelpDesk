import React from 'react';

const SmallBox = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-${color}-100 p-4 rounded shadow-md text-black flex items-center`}>
      <div className="flex-1">
        <h5 className="font-semibold text-sm">{title}</h5>
        <h3 className="font-bold text-lg">{value}</h3>
      </div>
      <div className="text-2xl text-gray-700">{icon}</div>
    </div>
  );
};

export default SmallBox;
