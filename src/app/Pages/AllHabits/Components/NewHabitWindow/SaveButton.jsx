import { useGlobalContextProvider } from "../../../../contextApi";
import React, { useState, useEffect } from "react";
import { addNewHabit } from "../../../../utils/addNewHabit.jsx";
import { updateHabitInServer } from "../../../../utils/editHabitInServer.jsx";
import toast from "react-hot-toast";

export default function SaveButton({ habit }) {
    const {
        allHabitObject,
        habitWindowObject,
        selectedItemsObject
    } = useGlobalContextProvider();

    const { allHabits, setAllHabits } = allHabitObject;
    const { setOpenHabitWindow, openHabitWindow } = habitWindowObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;
    const [buttonText, setButtonText] = useState("Add a Habit");

    useEffect(() => {
        if (selectedItems) {
            setButtonText(habit?.isTask ? "Edit Task" : "Edit Habit");
        } else {
            setButtonText(habit?.isTask ? "Add a Task" : "Add a Habit");
        }
    }, [openHabitWindow, selectedItems, habit?.isTask]);

    async function checkNewHabitObject() {
        if (habit.name.trim() === "") {
            return toast.error("The habit name field is still empty!");
        }

        if (!selectedItems) {
            const habitExist = allHabits.some(
                (singleHabit) => singleHabit.name === habit.name
            );

            if (!habitExist) {
                try {
                    await addNewHabit({
                        allHabits,
                        setAllHabits,
                        habit
                    });
                    setOpenHabitWindow(false);
                    setSelectedItems(null);
                } catch (error) {
                    console.error("Error adding habit:", error);
                }
            } else {
                toast.error(`${habit?.isTask ? "Task" : "Habit"} already exists`);
            }
        } else {
            const habitExist = allHabits.some(
                (singleHabit) => singleHabit.name === habit.name && singleHabit._id !== selectedItems._id
            );

            if (!habitExist) {
                try {
                    const success = await updateHabitInServer({
                        allHabits,
                        setAllHabits,
                        selectedItems,
                        habit
                    });

                    if (success) {
                        setOpenHabitWindow(false);
                        setTimeout(() => {
                            setSelectedItems(null);
                        }, 100);
                    }
                } catch (error) {
                    console.error("Error updating habit:", error);
                    toast.error("Something went wrong...");
                }
            } else {
                toast.error(`A ${habit?.isTask ? "task" : "habit"} with this name already exists!`);
            }
        }
    }

    return (
        <button
            onClick={checkNewHabitObject}
            className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary transition-colors"
        >
            {buttonText}
        </button>
    );
}