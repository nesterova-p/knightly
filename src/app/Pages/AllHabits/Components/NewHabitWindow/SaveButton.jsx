import { useGlobalContextProvider } from "../../../../contextApi";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function SaveButton({ habit }) {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    const handleSaveHabit = () => {
        if (!habit.name.trim()) {
            alert("Please enter a name");
            return;
        }

        const itemToSave = {
            ...habit,
            _id: habit._id || uuidv4(),
            createdAt: new Date().toISOString(),
        };


        if (habit.isTask) {
            console.log("Saving task:", itemToSave);
            // database for tasks
        } else {
            console.log("Saving habit:", itemToSave);
            // database for habits
        }

        setOpenHabitWindow(false);
    };

    return (
        <button
            onClick={handleSaveHabit}
            className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary transition-colors"
        >
            {habit.isTask ? "Add a Task" : "Add a Habit"}
        </button>
    );
}