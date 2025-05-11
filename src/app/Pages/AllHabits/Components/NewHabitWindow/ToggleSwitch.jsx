import React from "react";

export default function ToggleSwitch({ isOn, updateToggle }) {
    return (
        <div
            className={`${
                isOn ? "bg-primary" : "bg-slate-400"
            } w-16 h-[30px] relative rounded-lg flex`}
        >
            <div onClick={updateToggle} className="w-1/2 h-full"></div>
            <div onClick={updateToggle} className="w-1/2 h-full"></div>
            <div
                className={`bg-white h-6 w-6 rounded-full ${
                    isOn ? "right" : "left"
                }-[3px] top-[3px] absolute`}
            ></div>
        </div>
    );
}
