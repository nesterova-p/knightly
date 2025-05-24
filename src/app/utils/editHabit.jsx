import toast from "react-hot-toast";

export function editHabit({
                              allHabits,
                              setAllHabits,
                              selectedItems,
                              habit
                          }) {
    try {
        const findTheHabit = allHabits.findIndex(
            (singleHabit) => singleHabit._id === selectedItems._id
        );
        const copyAllHabits = [...allHabits];

        copyAllHabits[findTheHabit] = habit;
        setAllHabits(copyAllHabits);

        toast.success("Habit has been updated successfully");
        return true;
    } catch (error) {
        toast.error("Something went wrong");
        console.error("Error updating habit:", error);
        return false;
    }
}