import React from "react";
import "./Flag.css";

export default function Flag({ children, className = "", ...props }) {
    return (
        <div
            className={`flag ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}