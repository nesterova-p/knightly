import { useGlobalContextProvider } from "../../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

export default function Header() {
    const { habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { setOpenHabitWindow, openHabitWindow, habitItem } = habitWindowObject;
    const { setSelectedItems, selectedItems } = selectedItemsObject;
    const [header, setHeader] = useState("Add New Habit");

    useEffect(() => {
        if (selectedItems) {
            setHeader(habitItem?.isTask ? "Edit Task" : "Edit Habit");
        } else {
            setHeader(habitItem?.isTask ? "Add New Task" : "Add New Habit");
        }
    }, [openHabitWindow, selectedItems, habitItem?.isTask]);

    return (
        <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-xl">{header}</span>
            <FontAwesomeIcon
                onClick={() => {
                    setOpenHabitWindow(false);
                    setSelectedItems(null);
                }}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                icon={faClose}
                width={20}
                height={20}
            />
        </div>
    );
}