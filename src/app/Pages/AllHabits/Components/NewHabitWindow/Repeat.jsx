import {useGlobalContextProvider} from "../../../../contextApi";
import React, {useCallback, useEffect, useState} from "react";
import DailyOptions from "./DailyOptions";
import WeeklyOption from "./WeeklyOption";

export default function Repeat({ onChangeOption, initialDays, onDaysChange, onFrequencyChange, initialFrequency }){
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