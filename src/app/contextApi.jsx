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
    completedDays: [],
    difficulty: "Easy"
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
    },
    areaWindowObject: {
        openAreaWindow: false,
        setOpenAreaWindow: () => {},
    },
    searchHabitsObject: {
        searchQuery: "",
        setSearchQuery: () => {},
    },
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
    const [openAreaWindow, setOpenAreaWindow] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAllHabits = async () => {
            try {
                const response = await fetch(`/api/habits?clerkUserId=${user?.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch habits");
                }
                const data = await response.json();

                const updatedHabits = data.habits.map((habit) => {
                    let processedHabit = { ...habit };

                    if (typeof habit.icon === "string") {
                        processedHabit.icon = textToIcon(habit.icon);
                    }

                    if (!habit.difficulty) {
                        processedHabit.difficulty = "Easy";
                    }

                    return processedHabit;
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

                const updatedHabitsWithMappedFrequency = updatedHabitsWithAreas.map((habit) => {
                    if (habit.frequency && habit.frequency[0] && habit.frequency[0].type) {
                        const updatedFrequency = [...habit.frequency];
                        if (updatedFrequency[0].type === "None") {
                            updatedFrequency[0].type = "Once";
                        } else if (updatedFrequency[0].type === "Weekly") {
                            updatedFrequency[0].type = "Each Day";
                            updatedFrequency[0].days = updatedFrequency[0].days.map(day => ({
                                ...day,
                                isSelected: true
                            }));
                        }
                        return { ...habit, frequency: updatedFrequency };
                    }
                    return habit;
                });

                console.log(updatedHabitsWithMappedFrequency);
                setAllHabits(updatedHabitsWithMappedFrequency);

            } catch (error) {
                console.error("Error fetching habits:", error);
            }
        };

        async function fetchAllAreas() {
            try {
                const response = await fetch(`/api/areas?clerkUserId=${user?.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch areas");
                }
                const data = await response.json();

                const updatedAreas = data.areas.map((area) => {
                    if (typeof area.icon === "string") {
                        return {
                            ...area,
                            icon: textToIcon(area.icon),
                        };
                    }
                    return area;
                });

                const allAreasData = [
                    { _id: "all", icon: textToIcon("faGlobe"), name: "All" },
                    ...updatedAreas
                ];

                setAllAreas(allAreasData);
            } catch (error) {
                console.error("Error fetching areas:", error);
                const defaultAreas = [
                    { _id: "all", icon: textToIcon("faGlobe"), name: "All" },
                    { _id: "study", icon: textToIcon("faBook"), name: "Study" },
                    { _id: "code", icon: textToIcon("faLaptopCode"), name: "Code" }
                ];
                setAllAreas(defaultAreas);
            }
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
            },
            areaWindowObject: {
                openAreaWindow,
                setOpenAreaWindow,
            },
            searchHabitsObject: {
                searchQuery,
                setSearchQuery,
            },
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContextProvider = () => useContext(GlobalContext)