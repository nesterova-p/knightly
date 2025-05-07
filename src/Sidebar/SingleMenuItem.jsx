// src/Sidebar/SingleMenuItem.jsx
"use client";

import React from "react";
import { useGlobalContextProvider } from "../app/contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SingleMenuItem({ menuItemProp }) {
    const {
        menuItemsObject: { menuItems, setMenuItems },
    } = useGlobalContextProvider();
    const selectedClass = menuItemProp.isSelected
        ? "bg-primary text-white"
        : "hover:text-primary";

    function handleClickedItem(){
        const copyMenuItems =menuItems.map((item) => {
            if(item.name === menuItemProp.name){
                return {...item, isSelected: true};
            }
            return {...item, isSelected: false};
        });
        setMenuItems(copyMenuItems);
    }

    return (
        <div
            onClick={handleClickedItem}
            className={
                `flex gap-2 items-center p-2 mb-3 ml-8 cursor-pointer rounded-md w-36 ` +
                selectedClass
            }
        >
            <FontAwesomeIcon
                icon={menuItemProp.icon}
                width={20}
                height={20}
            />
            <div>{menuItemProp.name}</div>
        </div>
    );
}
