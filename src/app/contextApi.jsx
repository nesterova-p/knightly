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
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";

const defaultHabitState = {
    _id: "",
    name: "",
    icon: faIcons,
    clerkUserId: "",
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
    reminderTime: "",
    hasReminder: false,
    isTask: false,
    dueDate: new Date(),
    areas: [],
    completedDays: []
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
    },
    allFilteredHabitsObject: {
        allFilteredHabits: [],
        setAllFilteredHabits: () => {},
    },
    openDropDownObject: {
        openDropDown: false,
        setOpenDropDown: () => {},
    },
    dropDownPositionsObject: {
        dropDownPositions: { top: 0, left: 0 },
        setDropDownPositions: () => {},
    },
    openConfirmationWindowObject:{
        openConfirmationWindow: false,
        setOpenConfirmationWindow: () => {},
    },
    selectedItemsObject: {
        selectedItems: null,
        setSelectedItems: () => {},
    }
})

export const GlobalContextProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);

    const [allAreas, setAllAreas] = useState([]);
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
    const [allFilteredHabits, setAllFilteredHabits] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [dropDownPositions, setDropDownPositions] = useState({
        top: 0,
        left: 0,
    });
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);

    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        const fetchAllHabits = async () => {
            try {
                const response = await fetch(`/api/habits?clerkUserId=${user?.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch habits");
                }
                const data = await response.json();

                const updatedHabits = data.habits.map((habit) => {
                    if (typeof habit.icon === "string") {
                        return {
                            ...habit,
                            icon: textToIcon(habit.icon),
                        };
                    }
                    return habit;
                });

                const updatedHabitsWithAreas = updatedHabits.map((habit) => {
                    const updatedAreas = habit.areas.map((area) => {
                        if (typeof area.icon === "string") {
                            return {
                                ...area,
                                icon: textToIcon(area.icon),
                            };
                        }
                        return area;
                    });
                    return { ...habit, areas: updatedAreas };
                });

                console.log(updatedHabitsWithAreas);
                setAllHabits(updatedHabitsWithAreas);
            } catch (error) {
                console.error("Error fetching habits:", error);
            }
        };

        function fetchAllAreas() {
            const allAreasData = [
                { _id: uuidv4(), icon: textToIcon("faGlobe"), name: "All" },
                { _id: uuidv4(), icon: textToIcon("faBook"), name: "Study" },
                { _id: uuidv4(), icon: textToIcon("faLaptopCode"), name: "Code" }
            ];

            setAllAreas(allAreasData);
        }

        if (isLoaded && isSignedIn) {
            fetchAllHabits();
            fetchAllAreas();
        }
    }, [isLoaded, isSignedIn, user]);

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
            },
            allFilteredHabitsObject: {
                allFilteredHabits,
                setAllFilteredHabits,
            },
            openDropDownObject: {
                openDropDown,
                setOpenDropDown
            },
            dropDownPositionsObject: {
                dropDownPositions,
                setDropDownPositions
            },
            openConfirmationWindowObject:{
                openConfirmationWindow,
                setOpenConfirmationWindow
            },
            selectedItemsObject: {
                selectedItems,
                setSelectedItems
            }
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(GlobalContext)