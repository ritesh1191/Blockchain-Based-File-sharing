import React from "react";

function Input({ title, ...props }) {
    return (
        <div className="flex flex-col w-full">
            {title && (
                <label className="mb-2 text-sm font-medium text-gray-700" htmlFor={props.id || props.name}>
                    {title}
                </label>
            )}
            <input
                {...props}
                className="px-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 placeholder:text-gray-400 text-gray-700 hover:border-gray-300"
            />
        </div>
    );
}

export default Input;
