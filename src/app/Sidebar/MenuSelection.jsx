"use client";

import React from "react";
import { useGlobalContextProvider } from "../contextApi";
import SingleMenuItem from "./SingleMenuItem";

export default function MenuSelection() {
    const {
        menuItemsObject: { menuItems },
    } = useGlobalContextProvider();

    return (
        <div className="mt-[180px]">
            {menuItems.map((item, index) => (
                <div key={index}>
                    <SingleMenuItem menuItemProp={item} />
                </div>
            ))}
        </div>
    );
}

