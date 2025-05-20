"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import { useGlobalContextProvider } from "../../../contextApi";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import IconWindow from "../../AllHabits/Components/IconWindow/IconWindow";
import Header from "./NewHabitWindow/Header";
import InputNameAndIconButton from "./NewHabitWindow/InputNameAndIconButton";
import Reminder from "./NewHabitWindow/Reminder";
import Repeat from "./NewHabitWindow/Repeat";
import SaveButton from "./NewHabitWindow/SaveButton";
import TimePicker from "./NewHabitWindow/TimePicker";
import AreasNewHabit from "./NewHabitWindow/AreasNewHabit";

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
    areas: []
};

const HeaderMemo = memo(Header);
const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

export default function HabitWindow() {
    const { habitWindowObject, openTimePickerObject } = useGlobalContextProvider();
    const { openHabitWindow, setOpenHabitWindow, habitItem, setHabitItem } = habitWindowObject;
    const { setOpenTimePickerWindow } = openTimePickerObject;

    const [openIconWindow, setOpenIconWindow] = useState(false);
    const [selectedAreas, setSelectedAreas] = useState([]);

    const onUpdateHabitName = useCallback((inputText) => {
        setHabitItem(prev => ({
            ...prev,
            name: inputText
        }));
    }, [setHabitItem]);

    const setIconSelected = useCallback((icon) => {
        setHabitItem(prev => ({
            ...prev,
            icon
        }));
    }, [setHabitItem]);

    const changeRepeatOption = useCallback((repeatOption) => {
        const filterIsSelected = repeatOption.filter((singleOption) => singleOption.isSelected);
        const nameOfSelectedOption = filterIsSelected[0].name;

        setHabitItem(prev => ({
            ...prev,
            frequency: [{
                ...prev.frequency[0],
                type: nameOfSelectedOption
            }],
            isTask: nameOfSelectedOption === "None"
        }));
    }, [setHabitItem]);

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

    const updateDueDate = useCallback((date) => {
        setHabitItem(prev => ({
            ...prev,
            dueDate: date
        }));
    }, [setHabitItem]);

    const getSelectedAreaItems = useCallback((selectedAreaItems) => {
        setSelectedAreas(selectedAreaItems);
        setHabitItem(prev => ({
            ...prev,
            areas: selectedAreaItems
        }));
    }, [setHabitItem]);

    useEffect(() => {
        if (!openHabitWindow) {
            setHabitItem({
                ...defaultHabitState,
                areas: []
            });
            setOpenTimePickerWindow(false);
            setSelectedAreas([]);
        }
    }, [openHabitWindow, setOpenTimePickerWindow, setHabitItem]);

    return (
        <>
            <div
                className={`fixed inset-0 bg-black opacity-25 z-40 ${openHabitWindow ? "block" : "hidden"}`}
                onClick={() => setOpenHabitWindow(false)}
            />

            <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 bg-white rounded-lg shadow-lg ${openHabitWindow ? "block" : "hidden"} max-h-[90vh] overflow-y-auto`}
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
                        onDateChange={updateDueDate}
                    />
                    <Reminder />
                    <AreasNewHabit onChange={getSelectedAreaItems}/>
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