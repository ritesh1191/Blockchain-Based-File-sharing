import React from "react";

function Button({ children, className = "", loading, variant = "primary", ...props }) {
    const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg",
        danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-xl",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    };
    
    const variantClass = variants[variant] || variants.primary;
    
    return (
        <button
            className={`${baseStyles} ${variantClass} ${className}`}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <div className="border-2 border-transparent rounded-full h-5 w-5 animate-spin border-b-white border-l-white border-r-white"></div>
            ) : (
                children
            )}
        </button>
    );
}

export default Button;
