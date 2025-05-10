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

    return (
        <GlobalContext.Provider value={{
            menuItemsObject: { menuItems, setMenuItems },
            openSideBarObject: { openSideBar, setOpenSideBar }
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(GlobalContext)