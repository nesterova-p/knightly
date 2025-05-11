"use client";
import { v4 as uuidv4 } from "uuid";
import React, { memo, useState, useEffect, useCallback } from "react";
import { useGlobalContextProvider } from "../../../contextApi";
import {faIcons} from "@fortawesome/free-solid-svg-icons";
import IconWindow from "../../AllHabits/Components/IconWindow/IconWindow";
import Header from "./NewHabitWindow/Header";
import InputNameAndIconButton from "./NewHabitWindow/InputNameAndIconButton";
import Reminder from "./NewHabitWindow/Reminder";
import Repeat from "./NewHabitWindow/Repeat";
import SaveButton from "./NewHabitWindow/SaveButton";
import TimePicker from "./NewHabitWindow/TimePicker";

const defaultHabitState = {
    _id: "",
    name: "",
    icon: faIcons,
    hasReminder: false,
    reminderTime: "08:00 AM",
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

const HeaderMemo = memo(Header);
const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

export default function HabitWindow() {
    const { habitWindowObject, openTimePickerObject } = useGlobalContextProvider();
    const { openHabitWindow, setOpenHabitWindow, habitItem, setHabitItem } = habitWindowObject;
    const { setOpenTimePickerWindow } = openTimePickerObject;

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
    }, [setHabitItem]);

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
    }, [setHabitItem]);

    useEffect(() => {
        if (!openHabitWindow) {
            setHabitItem(defaultHabitState);
            setOpenTimePickerWindow(false);
        }
    }, [openHabitWindow, setOpenTimePickerWindow, setHabitItem]);

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
                    <Reminder />
                    <SaveButton habit={habitItem} />
                </div>
            </div>

            <TimePicker />
            <IconWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                setIconSelected={setIconSelected}
            />
        </>
    );
}