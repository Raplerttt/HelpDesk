import React from 'react';
import "../style/spinner.css"

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
    );
};

export default LoadingSpinner;
