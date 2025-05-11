import {useGlobalContextProvider} from "../../../../contextApi";
import {v4 as uuidv4} from "uuid";
import React from "react";

export default function SaveButton({ habit }) {
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