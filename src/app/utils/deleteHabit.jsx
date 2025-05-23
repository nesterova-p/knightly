import toast from "react-hot-toast";

export function deleteHabit(allHabits, setAllHabits, selectedItems) {
    console.log(allHabits);
    try {
        const updatedHabits = allHabits.filter((habit) =>
            habit._id !== selectedItems?._id
        );
        setAllHabits(updatedHabits);
        toast.success(`${selectedItems?.isTask ? "Task" : "Habit"} deleted successfully`);
    } catch(error) {
        console.log(error);
        toast.error("Something went wrong");
    }
}