"use client";

import React, {createContext, useContext, useEffect, useState} from 'react'
import {
    faChartSimple,
    faCode,
    faGraduationCap,
    faLayerGroup,
    faRectangleList,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {faIcons} from "@fortawesome/free-solid-svg-icons";
import {iconToText, textToIcon} from "../app/Pages/AllHabits/Components/IconWindow/IconData";
import {getDateString} from "../app/utils/dateFormating";

const defaultHabitState = {
    _id: "",
    name: "",
    icon: faIcons,
    isTask: false,
    hasReminder: false,
    reminderTime: "08:00 AM",
    dueDate: new Date(),
    frequency: [{
        type: "Daily",
        days: [
            {id: 1, name: "Mo", isSelected: true},
            {id: 2, name: "Tu", isSelected: false},
            {id: 3, name: "We", isSelected: false},
            {id: 4, name: "Th", isSelected: false},
            {id: 5, name: "Fr", isSelected: false},
            {id: 6, name: "Sa", isSelected: false},
            {id: 7, name: "Su", isSelected: false},
        ],
        number: 1
    }],
};

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
        habitItem: defaultHabitState,
        setHabitItem: () => {},
    },
    openTimePickerObject:{
        openTimePickerWindow: false,
        setOpenTimePickerWindow: () => {},
    },
    tasksObject: {
        tasks: [],
        setTasks: () => {},
    },
    allAreasObject: {
        allAreas: [],
        setAllAreas: () => {},
    },
    allHabitObject: {
        allHabits: [],
        setAllHabits: () => {},
    },
    selectedCurrentDayObject:{
        selectedCurrentDay: "",
        setSelectedCurrentDay: () => {},
    },
    offsetDayObject: {
        offsetDay: 0,
        setOffsetDay: () => {},
    },
    selectedAreasObject: {
        selectedAreas: {},
        setSelectedAreas: () => {},
    },
    selectedAreaStringObject: {
        selectedAreaString: "All",
        setSelectedAreaString: () => {},
    }
})

export const GlobalContextProvider = ({ children }) => {
    // initial menu state
    const [menuItems, setMenuItems] = useState([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);

    const [allAreas, setAllAreas] = useState([
        {id: 1, icon: faUser, name: "All"},
        {id: 2, icon: faGraduationCap, name: "Study"},
        {id: 3, icon: faCode, name: "Code"},
    ]);

    {/* add rewards*/}

    const [openSideBar, setOpenSideBar] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);
    const [openHabitWindow, setOpenHabitWindow] = useState(false);
    const [openTimePickerWindow, setOpenTimePickerWindow] = useState(false);
    const [habitItem, setHabitItem] = useState(defaultHabitState);
    const [tasks, setTasks] = useState([]);
    const [allHabits, setAllHabits] = useState([]);
    const [selectedCurrentDay, setSelectedCurrentDay] = useState(() => getDateString(new Date()));
    const [offsetDay, setOffsetDay] = useState(0);
    const [selectedAreas, setSelectedAreas] = useState({});
    const [selectedAreaString, setSelectedAreaString] = useState("All");

    useEffect(() => {
        function fetchData() {
            const allHabitsData = [{
                _id: "",
                name: "",
                icon: iconToText(faIcons),
                isTask: false,
                hasReminder: false,
                reminderTime: "08:00 AM",
                dueDate: new Date(),
                frequency: [{
                    type: "Daily",
                    days: [
                        {id: 1, name: "Mo", isSelected: true},
                        {id: 2, name: "Tu", isSelected: false},
                        {id: 3, name: "We", isSelected: false},
                        {id: 4, name: "Th", isSelected: false},
                        {id: 5, name: "Fr", isSelected: false},
                        {id: 6, name: "Sa", isSelected: false},
                        {id: 7, name: "Su", isSelected: false},
                    ],
                    number: 1
                }]
            }];

            setTimeout(() => {
                setAllHabits(allHabitsData);
            }, 1000);
        }

        fetchData();
    }, []);


    return (
        <GlobalContext.Provider value={{
            menuItemsObject: { menuItems, setMenuItems },
            openSideBarObject: { openSideBar, setOpenSideBar },
            darkModeObject: { isDarkMode, setDarkMode },
            habitWindowObject: {
                openHabitWindow,
                setOpenHabitWindow,
                habitItem,
                setHabitItem
            },
            openTimePickerObject: { openTimePickerWindow, setOpenTimePickerWindow },
            tasksObject: { tasks, setTasks },
            allAreasObject: { allAreas, setAllAreas },
            allHabitObject: { allHabits, setAllHabits },
            selectedCurrentDayObject: { selectedCurrentDay, setSelectedCurrentDay },
            offsetDayObject: { offsetDay, setOffsetDay },
            selectedAreasObject: {
                selectedAreas,
                setSelectedAreas,
            },
            selectedAreaStringObject: {
                selectedAreaString,
                setSelectedAreaString,
            }
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(GlobalContext)