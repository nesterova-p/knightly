import {useGlobalContextProvider} from "../../../../contextApi";
import React, {useCallback, useEffect, useState} from "react";
import DailyOptions from "./DailyOptions";
import WeeklyOption from "./WeeklyOption";
import DateOption from "./DateOption";

export default function Repeat({ onChangeOption, initialDays, onDaysChange, onFrequencyChange, initialFrequency, onDateChange }){
    const { habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { openHabitWindow, habitItem } = habitWindowObject;
    const { selectedItems } = selectedItemsObject;

    const [repeatOption, setRepeatOption] = useState([
        {name: "None", isSelected: false},
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
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDaysChange = useCallback((days) => {
        onDaysChange(days);
    }, [onDaysChange]);

    const handleWeeksChange = useCallback((weekCount) => {
        onFrequencyChange(weekCount);
    }, [onFrequencyChange]);

    const handleDateChange = useCallback((date) => {
        if(onDateChange) {
            onDateChange(date);
        }
    }, [onDateChange]);

    useEffect(() => {
        handleDaysChange(allDays);
    }, [allDays, handleDaysChange]);

    useEffect(() => {
        handleWeeksChange(weeks);
    }, [weeks, handleWeeksChange]);

    useEffect(() => {
        handleDateChange(selectedDate);
    }, [selectedDate, handleDateChange]);

    useEffect(() => {
        if (selectedItems) {
            const currentHabitSelected = selectedItems;
            const selectedOptionOfHabitSelected = currentHabitSelected.frequency[0].type;

            const copyRepeatOptions = repeatOption.map((singleOption) => {
                if (singleOption.name === selectedOptionOfHabitSelected) {
                    return { ...singleOption, isSelected: true };
                }
                return { ...singleOption, isSelected: false };
            });

            setRepeatOption(copyRepeatOptions);
        } else {
            const copyRepeatOptions = repeatOption.map((singleOption) => {
                return { ...singleOption, isSelected: false };
            });

            copyRepeatOptions[1].isSelected = true;
            setRepeatOption(copyRepeatOptions);
        }
    }, [openHabitWindow, selectedItems]);

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

            {selectedOption === "None" ? (
                <DateOption selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            ) : selectedOption === "Daily" ? (
                <DailyOptions allDays={allDays} setAllDays={setAllDays} />
            ) : (
                <WeeklyOption weeks={weeks} setWeeks={setWeeks} />
            )}
        </div>
    );
}