import { useGlobalContextProvider } from "../../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Header() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow, habitItem } = habitWindowObject;

    return (
        <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-xl">
                {habitItem?.isTask ? "Add New Task" : "Add New Habit"}
            </span>
            <FontAwesomeIcon
                onClick={() => {
                    setOpenHabitWindow(false)
                }}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                icon={faClose}
                width={20}
                height={20}
            />
        </div>
    );
}