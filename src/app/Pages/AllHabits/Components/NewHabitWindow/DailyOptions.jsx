import React from "react";

export default function DailyOptions({ allDays, setAllDays }){
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
