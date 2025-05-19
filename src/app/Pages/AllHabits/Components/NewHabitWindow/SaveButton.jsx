import { useGlobalContextProvider } from "../../../../contextApi";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import {addNewHabit} from "../../../../utils/addNewHabit.jsx";

export default function SaveButton({ habit }) {
    const { habitWindowObject, allHabitObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;
    const { allHabits, setAllHabits } = allHabitObject;

    function checkNewHabitObject() {
        if(habit.name.trim() === "") {
            return console.log("Please enter a name");
        }

        const habitExist = allHabits.some(
            (single) => single.name === habit.name
        );

        if (!habitExist) {
            const success = addNewHabit({allHabits, setAllHabits, newHabit: habit});
            if (success) {
                setOpenHabitWindow(false);
            }
        } else {
            console.log("Habit already exists");
        }
    }

    return (
        <button
            onClick={checkNewHabitObject}
            className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary transition-colors"
        >
            {habit.isTask ? "Add a Task" : "Add a Habit"}
        </button>
    );
}