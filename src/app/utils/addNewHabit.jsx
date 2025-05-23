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

    const newHabitWithId = {
        ...newHabit,
        _id: newHabit._id || uuidv4(),
        createdAt: new Date().toISOString(),
    };

    if (newHabit.isTask) {
        toast.success("Task created successfully!");
        console.log("Saving task:", newHabitWithId);
        // database for tasks
    } else {
        toast.success("Habit created successfully!");
        console.log("Saving habit:", newHabitWithId);
        // database for habits
    }

    setAllHabits([...allHabits, newHabitWithId]);

    return true;
}