import React from "react";
import "./FramedBox.css";

export default function FramedBox({ children }) {
    return (
        <div className="pixel-frame">
            <div className="pixel-frame-content">
                {children}
            </div>
        </div>
    );
}
