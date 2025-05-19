"use client";

import Sidebar from "../../app/Sidebar/Sidebar";
import {useGlobalContextProvider} from "../contextApi";
import {useEffect, useState} from "react";
import Areas from "../Pages/Areas/Areas";
import Statistics from "../Pages/Statistics/Statistics";
import AllHabits from "../AllHabits";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


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
        <div className="flex bg-slate-50">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Sidebar />
                {selectedComponent}
                <SoftLayer/>
            </LocalizationProvider>
        </div>

    )
}

function SoftLayer(){
    const {openSideBarObject} = useGlobalContextProvider();
    const {openSideBar} = openSideBarObject;
    return (
        <div className={`w-full h-full bg-black fixed top-0 left-0 opacity-25 z-40 ${openSideBar ? "fixed" : "hidden"} `}>
        </div>
    )
}