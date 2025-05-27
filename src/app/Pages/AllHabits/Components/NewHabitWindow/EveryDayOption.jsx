import React, { useEffect } from "react";

export default function EveryDayOption({ allDays, setAllDays }) {
    useEffect(() => {
        const allDaysSelected = allDays.map(day => ({
            ...day,
            isSelected: true
        }));
        setAllDays(allDaysSelected);
    }, []);

    const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    return (
        <div className="mt-5 flex flex-col gap-4">
            <span className="font-medium opacity-85">Every Day</span>
            <div className="flex gap-3 w-full">
                {allDays.map((singleDay, singleDayIndex) => (
                    <span
                        key={singleDay.id}
                        className={`flex items-center justify-center w-9 h-9 rounded-full font-medium text-sm bg-primary text-white cursor-default`}
                    >
                        {dayNames[singleDayIndex]}
                    </span>
                ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
                This habit will repeat every day of the week
            </p>
        </div>
    );
}