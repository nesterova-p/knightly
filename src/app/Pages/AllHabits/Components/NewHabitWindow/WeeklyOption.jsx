import React from "react";

export default function WeeklyOption({ weeks, setWeeks }){
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