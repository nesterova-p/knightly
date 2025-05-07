"use client";

import {SignOutButton, useUser} from "@clerk/nextjs";
import Sidebar from "../../Sidebar/Sidebar";
import {useGlobalContextProvider} from "../contextApi";
import {useEffect, useState} from "react";
import Areas from "../Pages/Areas/Areas";
import Statistics from "../Pages/Statistics/Statistics";
import AllHabits from "../Pages/AllHabits/AllHabits";

export default function Dashboard() {
    const {menuItemsObject} = useGlobalContextProvider();
    const {menuItems} = menuItemsObject;
    const [selectedMenu, setSelectedMenu] = useState(null);
    let selectedComponent = null;

    useEffect(() => {
        menuItems.forEach(menuItem => {
            if (menuItem.isSelected) {
                setSelectedMenu(menuItem);
            }
        })
    }, [menuItems]);

    // which component to render
    switch (selectedMenu && selectedMenu.name) {
        case "All Habits":
            selectedComponent = <AllHabits />;
            break;
        case "Statistics":
            selectedComponent = <Statistics />;
            break;
        case "Areas":
            selectedComponent = <Areas />;
            break;
        default:
            selectedComponent = null;
    }

    return(
        <div className="flex">
            <Sidebar />
            {selectedComponent}
        </div>

    )
}