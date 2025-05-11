import React from "react";

export default function ToggleSwitch({ isOn, updateToggle }) {
    return (
        <div
            onClick={updateToggle}
            className={`
        w-16 h-8 rounded-full cursor-pointer
        relative transition-colors duration-300 ease-in-out
        ${isOn ? "bg-primary" : "bg-gray-300"}
        flex items-center p-1
      `}
            style={{ backgroundColor: isOn ? "primary" : "" }}
        >
            {/* Background gradient */}
            <div
                className={`
          absolute inset-0 rounded-full overflow-hidden
          ${isOn ? "opacity-40" : "opacity-0"}
          transition-opacity duration-300
        `}
            >
                <div className="w-full h-full bg-gradient-to-r from-primary to-pink-200"></div>
            </div>

            {/* handle */}
            <div
                className={`
          w-6 h-6 rounded-full bg-white shadow-md
          transform transition-transform duration-300 ease-in-out
          flex items-center justify-center
          ${isOn ? "translate-x-8" : "translate-x-0"}
        `}
            >
                <div
                    className={`
            w-4 h-4 rounded-full 
            ${isOn ? "bg-gradient-to-br from-primary to-pink-500 opacity-40" : "bg-gradient-to-br from-gray-200 to-gray-300 opacity-40"}
            transition-all duration-300
          `}
                />
            </div>
        </div>
    );
}