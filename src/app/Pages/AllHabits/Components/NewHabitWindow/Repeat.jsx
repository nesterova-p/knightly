import {useGlobalContextProvider} from "../../../../contextApi";
import React, {useCallback, useEffect, useState} from "react";
import DailyOptions from "./DailyOptions";
import EachDayOption from "./EveryDayOption";
import DateOption from "./DateOption";

export default function Repeat({ onChangeOption, initialDays, onDaysChange, onFrequencyChange, initialFrequency, onDateChange }){
    const { habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { openHabitWindow, habitItem } = habitWindowObject;
    const { selectedItems } = selectedItemsObject;

    const [repeatOption, setRepeatOption] = useState([
        {name: "Once", isSelected: false},
        {name: "Daily", isSelected: true},
        {name: "Every Day", isSelected: false},
    ]);

    const defaultDays = [
        {id: 1, name: "Mo", isSelected: true},
        {id: 2, name: "Tu", isSelected: false},
        {id: 3, name: "We", isSelected: false},
        {id: 4, name: "Th", isSelected: false},
        {id: 5, name: "Fr", isSelected: false},
        {id: 6, name: "Sa", isSelected: false},
        {id: 7, name: "Su", isSelected: false},
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
        if (openHabitWindow) {
            if (selectedItems) {
                const currentHabitSelected = selectedItems;
                let selectedOptionOfHabitSelected = currentHabitSelected.frequency[0].type;
                if (selectedOptionOfHabitSelected === "None") {
                    selectedOptionOfHabitSelected = "Once";
                } else if (selectedOptionOfHabitSelected === "Weekly") {
                    selectedOptionOfHabitSelected = "Every Day";
                }

                const copyRepeatOptions = repeatOption.map((singleOption) => {
                    if (singleOption.name === selectedOptionOfHabitSelected) {
                        return { ...singleOption, isSelected: true };
                    }
                    return { ...singleOption, isSelected: false };
                });

                setRepeatOption(copyRepeatOptions);

                if (currentHabitSelected.frequency[0].days) {
                    setAllDays(currentHabitSelected.frequency[0].days);
                }

                if (currentHabitSelected.frequency[0].number) {
                    setWeeks(currentHabitSelected.frequency[0].number);
                }
            } else {
                const copyRepeatOptions = repeatOption.map((singleOption) => {
                    return { ...singleOption, isSelected: false };
                });

                copyRepeatOptions[1].isSelected = true;
                setRepeatOption(copyRepeatOptions);
                setAllDays(defaultDays);
                setWeeks(1);
            }
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

            {selectedOption === "Once" ? (
                <DateOption selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            ) : selectedOption === "Daily" ? (
                <DailyOptions allDays={allDays} setAllDays={setAllDays} />
            ) : selectedOption === "Every Day" ? (
                <EachDayOption allDays={allDays} setAllDays={setAllDays} />
            ) : null}
        </div>
    );
}