"use client";

import React, { createContext, useContext, useState } from 'react'
import {faChartSimple, faLayerGroup, faRectangleList} from "@fortawesome/free-solid-svg-icons";

const GlobalContext = createContext({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => {}
    }
})

export const GlobalContextProvider = ({ children }) => {
    // initial menu state
    const [menuItems, setMenuItems] = useState([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ])

    return (
        <GlobalContext.Provider value={{ menuItemsObject: { menuItems, setMenuItems } }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(GlobalContext)