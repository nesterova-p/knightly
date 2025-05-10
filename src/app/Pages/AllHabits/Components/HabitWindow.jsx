"use client";
import { v4 as uuidv4 } from "uuid";
import React, { memo, useRef, useState, useEffect } from "react";
import { useGlobalContextProvider } from "../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClose, faIcons, faQuestion} from "@fortawesome/free-solid-svg-icons";
import IconWindow from "../../AllHabits/Components/IconWindow/IconWindow";

const HeaderMemo = memo(Header);
const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

export default function HabitWindow() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;
    const [habitItem, setHabitItem] = useState({
        _id: "",
        name: "",
        icon: faQuestion,
    });
    const [openIconWindow, setOpenIconWindow] = useState(false);

    const onUpdateHabitName = (inputText) => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.name = inputText;
        setHabitItem(copyHabitItem);
    };

    const setIconSelected = (icon) => {
        setHabitItem(prev => ({
            ...prev,
            icon
        }));
    };

    return (
        <>
            {/* Soft Layer */}
            <div
                className={`fixed inset-0 bg-black opacity-25 z-40 ${openHabitWindow ? "block" : "hidden"}`}
                onClick={() => setOpenHabitWindow(false)}
            />

            {/* Modal */}
            <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 bg-white rounded-md shadow-lg ${openHabitWindow ? "block" : "hidden"}`}
            >
                <div className="p-6">
                    <HeaderMemo />
                    <InputNameAndIconButtonMemo
                        onUpdateHabitName={onUpdateHabitName}
                        habitName={habitItem.name}
                        selectedIcon={habitItem.icon}
                        setOpenIconWindow={setOpenIconWindow}
                    />
                    <SaveButton habit={habitItem} />
                </div>
            </div>

            {/* Icon Window */}
            <IconWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                setIconSelected={setIconSelected}
            />
        </>
    );
}

function Header() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    return (
        <div className="flex justify-between items-center mb-6">
            <span className="font-bold text-xl">Add New Habit</span>
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

function InputNameAndIconButton({ onUpdateHabitName, habitName, selectedIcon, setOpenIconWindow }) {
    const inputRef = useRef(null);
    const { habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;

    function updateInputHabit(event) {
        onUpdateHabitName(event.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        if (!openHabitWindow) {
            onUpdateHabitName("");
        }
    }, [openHabitWindow]);

    return (
        <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Habit Name</div>
            <div className="flex items-center">
                <input
                    ref={inputRef}
                    value={habitName}
                    onChange={(event) => updateInputHabit(event)}
                    className="flex-grow py-3 px-4 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Type a name for the habit..."
                />
                <button
                    className="ml-2 p-3 bg-primary text-white rounded-md hover:bg-primary transition-colors"
                    onClick={() => setOpenIconWindow(true)}
                >
                    <FontAwesomeIcon
                        icon={selectedIcon || faIcons}
                        width={16}
                        height={16}
                    />
                </button>
            </div>
        </div>
    );
}

function SaveButton({ habit }) {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    const handleSaveHabit = () => {
        if (!habit.name.trim()) {
            alert("Please enter a habit name");
            return;
        }

        const habitToSave = {
            ...habit,
            _id: habit._id || uuidv4(),
            createdAt: new Date().toISOString(),
        };

        console.log("Saving habit:", habitToSave);

        // save to database

        setOpenHabitWindow(false); // Changed from true to false to close the window
    };

    return (
        <button
            onClick={handleSaveHabit}
            className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary transition-colors"
        >
            Add a Habit
        </button>
    );
}