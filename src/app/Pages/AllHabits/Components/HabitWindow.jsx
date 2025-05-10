"use client";
import { v4 as uuidv4 } from "uuid";
import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import { useGlobalContextProvider } from "../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClose, faIcons, faQuestion} from "@fortawesome/free-solid-svg-icons";
import IconWindow from "../../AllHabits/Components/IconWindow/IconWindow";

const HeaderMemo = memo(Header);
const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

export default function HabitWindow() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;

    const defaultHabitState = {
        _id: "",
        name: "",
        icon: faIcons,
        frequency: [{
            type: "Daily",
            days: [
                {id: 1, name: "M", isSelected: true},
                {id: 2, name: "T", isSelected: false},
                {id: 3, name: "W", isSelected: false},
                {id: 4, name: "T", isSelected: false},
                {id: 5, name: "F", isSelected: false},
                {id: 6, name: "S", isSelected: false},
                {id: 7, name: "S", isSelected: false},
            ],
            number: 1
        }],
    };

    const [habitItem, setHabitItem] = useState(defaultHabitState);
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

    function changeRepeatOption(repeatOption) {
        const filterIsSelected = repeatOption.filter((singleOption) => singleOption.isSelected);
        const nameOfSelectedOption = filterIsSelected[0].name;
        const copyHabitItem = { ...habitItem };
        copyHabitItem.frequency[0].type = nameOfSelectedOption;
        setHabitItem(copyHabitItem);
    }

    const updateSelectedDays = useCallback((updatedDays) => {
        setHabitItem(prev => ({
            ...prev,
            frequency: [
                {
                    ...prev.frequency[0],
                    days: updatedDays
                }
            ]
        }));
    }, []);

    const updateWeeklyFrequency = useCallback((weekCount) => {
        setHabitItem(prev => ({
            ...prev,
            frequency: [
                {
                    ...prev.frequency[0],
                    number: weekCount
                }
            ]
        }));
    }, []);

    useEffect(() => {
        if (!openHabitWindow) {
            setHabitItem(defaultHabitState);
        }
    }, [openHabitWindow]);

    return (
        <>
            {/* Soft Layer */}
            <div
                className={`fixed inset-0 bg-black opacity-25 z-40 ${openHabitWindow ? "block" : "hidden"}`}
                onClick={() => setOpenHabitWindow(false)}
            />

            {/* Modal */}
            <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 bg-white rounded-lg shadow-lg ${openHabitWindow ? "block" : "hidden"}`}
            >
                <div className="p-6">
                    <HeaderMemo />
                    <InputNameAndIconButtonMemo
                        onUpdateHabitName={onUpdateHabitName}
                        habitName={habitItem.name}
                        selectedIcon={habitItem.icon}
                        setOpenIconWindow={setOpenIconWindow}
                    />
                    <Repeat
                        onChangeOption={changeRepeatOption}
                        initialDays={habitItem.frequency[0].days}
                        onDaysChange={updateSelectedDays}
                        onFrequencyChange={updateWeeklyFrequency}
                        initialFrequency={habitItem.frequency[0].number}
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
        if (openHabitWindow) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
        } else {
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

function Repeat({ onChangeOption, initialDays, onDaysChange, onFrequencyChange, initialFrequency }){
    const { habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;

    const [repeatOption, setRepeatOption] = useState([
        {name: "Daily", isSelected: true},
        {name: "Weekly", isSelected: false},
    ]);

    const defaultDays = [
        {id: 1, name: "M", isSelected: true},
        {id: 2, name: "T", isSelected: false},
        {id: 3, name: "W", isSelected: false},
        {id: 4, name: "T", isSelected: false},
        {id: 5, name: "F", isSelected: false},
        {id: 6, name: "S", isSelected: false},
        {id: 7, name: "S", isSelected: false},
    ];

    const [allDays, setAllDays] = useState(initialDays || defaultDays);

    const [weeks, setWeeks] = useState(initialFrequency || 1);

    const handleDaysChange = useCallback((days) => {
        onDaysChange(days);
    }, [onDaysChange]);

    const handleWeeksChange = useCallback((weekCount) => {
        onFrequencyChange(weekCount);
    }, [onFrequencyChange]);

    useEffect(() => {
        handleDaysChange(allDays);
    }, [allDays, handleDaysChange]);

    useEffect(() => {
        handleWeeksChange(weeks);
    }, [weeks, handleWeeksChange]);

    useEffect(() => {
        if (openHabitWindow) {
            setAllDays(defaultDays);
            setWeeks(1);
            setRepeatOption([
                {name: "Daily", isSelected: true},
                {name: "Weekly", isSelected: false},
            ]);
        }
    }, [openHabitWindow]);

    function changeRepeatOption(indexClicked) {
        const updatedRepeatOption = repeatOption.map((singleOption, index) => {
            if(index === indexClicked) {
                return { ...singleOption, isSelected: true };
            } else {
                return { ...singleOption, isSelected: false };
            }
        });
        setRepeatOption(updatedRepeatOption);
        onChangeOption(updatedRepeatOption);
    }

    const selectedOption = repeatOption.find(option => option.isSelected)?.name || "Daily";

    return (
        <div className="flex flex-col gap-2 mb-6">
            <span className="text-sm text-gray-600 mb-2">Repeat</span>
            <div className="flex gap-2 items-center">
                {repeatOption.map((singleOption, index) => (
                    <button
                        className={`py-2 px-4 rounded-md text-sm ${
                            singleOption.isSelected
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        key={index}
                        onClick={() => changeRepeatOption(index)}
                    >
                        {singleOption.name}
                    </button>
                ))}
            </div>
            {selectedOption === "Daily" ? (
                <DailyOptions allDays={allDays} setAllDays={setAllDays} />
            ) : (
                <WeeklyOption weeks={weeks} setWeeks={setWeeks} />
            )}
        </div>
    );
}

function DailyOptions({ allDays, setAllDays }){
    function selectedDays(singleDayIndex){
        const selectedCount = allDays.filter(day => day.isSelected).length;

        const updatedAllDays = allDays.map((singleDay, index) => {
            if (
                selectedCount === 1 &&
                singleDay.isSelected === true &&
                index === singleDayIndex
            ) {
                return singleDay;
            }
            return index === singleDayIndex
                ? { ...singleDay, isSelected: !singleDay.isSelected }
                : singleDay;
        });
        setAllDays(updatedAllDays);
    }

    return (
        <div className="mt-5 flex flex-col gap-4">
            <span className="font-medium opacity-85">On These Days</span>
            <div className="flex gap-3 w-full">
                {allDays.map((singleDay, singleDayIndex) => (
                    <span
                        key={singleDay.id}
                        onClick={() => selectedDays(singleDayIndex)}
                        className={`flex items-center justify-center w-9 h-9 rounded-full cursor-pointer font-medium text-sm ${
                            singleDay.isSelected
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {singleDay.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

function WeeklyOption({ weeks, setWeeks }){
    function updateCounter(option) {
        if (option === "up") {
            setWeeks(prev => (prev < 7 ? prev + 1 : 7));
        }

        if (option === "down") {
            setWeeks(prev => (prev > 1 ? prev - 1 : 1));
        }
    }

    return (
        <div className="mt-7 flex gap-4 items-center">
            <div className="flex flex-col gap-2">
                <span className="font-medium">Frequency</span>
                <span className="text-sm text-gray-400">
                    {weeks} times a week
                </span>
            </div>
            <div className="flex items-center justify-center ml-auto">
                <button
                    onClick={() => updateCounter("down")}
                    className="p-3 w-10 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
                >
                    -
                </button>
                <span className="p-4 px-5 select-none">{weeks}</span>
                <button
                    onClick={() => updateCounter("up")}
                    className="p-3 w-10 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
                >
                    +
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

        setOpenHabitWindow(false);
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