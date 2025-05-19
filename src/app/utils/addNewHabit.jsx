import { v4 as uuidv4 } from "uuid";

export function addNewHabit({
                                allHabits,
                                setAllHabits,
                                newHabit
                            }) {
    if (!newHabit.name.trim()) {
        console.log("Please enter a name");
        return false;
    }

    const newHabitWithId = {
        ...newHabit,
        _id: newHabit._id || uuidv4(),
        createdAt: new Date().toISOString(),
    };

    if (newHabit.isTask) {
        console.log("Saving task:", newHabitWithId);
        // database for tasks
    } else {
        console.log("Saving habit:", newHabitWithId);
        // database for habits
    }

    setAllHabits([...allHabits, newHabitWithId]);

    return true; 
}