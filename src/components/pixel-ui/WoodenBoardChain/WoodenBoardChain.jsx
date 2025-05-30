import React from "react";
import "./WoodenBoardChain.css";

export default function woodenBoardChain({ children, className = "", ...props }) {
    return (
        <div
            className={`wooden-board ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}