import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative">
                {/* Main spinner */}
                <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                
                {/* Inner spinner */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-transparent rounded-full animate-[spin_0.8s_linear_infinite] border-t-white"></div>
                
                {/* Loading text */}
                <div className="mt-4 text-center">
                    <span className="text-white text-sm font-medium tracking-wider animate-pulse">
                        Loading...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Loader; 