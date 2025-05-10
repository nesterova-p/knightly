"use client";

import React, { createContext, useContext, useState } from 'react'
import {faChartSimple, faLayerGroup, faRectangleList} from "@fortawesome/free-solid-svg-icons";

const GlobalContext = createContext({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => {}
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => {},
    },
    darkModeObject:{
        isDarkMode: false,
        setDarkMode : () => {},
    },
    habitWindowObject:{
        openHabitWindow: false,
        setOpenHabitWindow: () => {},
    }
})

export const GlobalContextProvider = ({ children }) => {
    // initial menu state
    const [menuItems, setMenuItems] = useState([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ])
    {/* add rewards*/}

    const [openSideBar, setOpenSideBar] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);
    const [openHabitWindow, setOpenHabitWindow] = useState(false); // Fixed naming here

    return (
        <GlobalContext.Provider value={{
            menuItemsObject: { menuItems, setMenuItems },
            openSideBarObject: { openSideBar, setOpenSideBar },
            darkModeObject: { isDarkMode, setDarkMode },
            habitWindowObject: { openHabitWindow, setOpenHabitWindow }, // Fixed naming here
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(GlobalContext)