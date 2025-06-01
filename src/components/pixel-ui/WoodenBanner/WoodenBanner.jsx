import React from "react";
import "./WoodenBanner.css";

export default function WoodenBanner({ children, className = "", ...props }) {
    return (
        <div
            className={`wooden-banner ${className}`}
            {...props}
        >
            <div className="wooden-banner-content">
                {children}
            </div>
        </div>
    );
}