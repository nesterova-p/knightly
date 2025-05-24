import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export function addNewHabit({
                                allHabits,
                                setAllHabits,
                                newHabit
                            }) {
    if (!newHabit.name.trim()) {
        toast.error("The habit name field is still empty!");
        return false;
    }

    try {
        const newHabitWithId = {
            ...newHabit,
            _id: newHabit._id || uuidv4(),
            createdAt: new Date().toISOString(),
            completedDays: newHabit.completedDays || []
        };

        setAllHabits([...allHabits, newHabitWithId]);

        if (newHabit.isTask) {
            toast.success("Task created successfully!");
        } else {
            toast.success("Habit created successfully!");
        }

        return true;
    } catch (error) {
        console.error("Error adding habit:", error);
        toast.error("Something went wrong while creating the habit");
        return false;
    }
}