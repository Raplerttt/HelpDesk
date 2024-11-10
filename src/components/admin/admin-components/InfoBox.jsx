import React from 'react';

const InfoBox = ({ title, value, icon, color = 'blue' }) => {
  return (
    <div className={`bg-${color}-500 p-4 rounded shadow-md text-white flex items-center`}>
      <div className="flex-1">
        <h5 className="font-semibold text-sm">{title}</h5>
        <h3 className="font-bold text-xl">{value}</h3>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default InfoBox;
