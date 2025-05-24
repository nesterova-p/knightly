import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";

export async function editTheHabitInServer(habit) {
    try {
        const habitIconToText = iconToText(habit.icon);

        const areasCopy = habit.areas.map((area) => ({
            ...area,
            icon: iconToText(area.icon),
        }));

        const updatedHabit = {
            ...habit,
            icon: habitIconToText,
            areas: areasCopy
        };

        console.log("Updating habit with ID:", habit._id);

        const response = await fetch(`/api/habits?habitId=${habit._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updatedHabit.name,
                icon: updatedHabit.icon,
                areas: updatedHabit.areas,
                frequency: updatedHabit.frequency,
                notificationTime: updatedHabit.notificationTime || updatedHabit.reminderTime,
                isNotificationOn: updatedHabit.isNotificationOn || updatedHabit.hasReminder,
                completedDays: updatedHabit.completedDays,
                isTask: updatedHabit.isTask,
                dueDate: updatedHabit.dueDate,
                hasReminder: updatedHabit.hasReminder,
                reminderTime: updatedHabit.reminderTime,
                clerkUserId: updatedHabit.clerkUserId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Something went wrong");
            return { success: false, error: errorData.message };
        }

        const data = await response.json();
        toast.success("Habit has been updated successfully");

        return {
            success: true,
            habit: data.habit,
            message: data.message
        };

    } catch (error) {
        console.error("Error updating habit:", error);
        toast.error("Something went wrong");
        return { success: false, error: error.message };
    }
}

export async function updateHabitInServer({
                                              allHabits,
                                              setAllHabits,
                                              selectedItems,
                                              habit
                                          }) {
    try {
        const result = await editTheHabitInServer(habit);

        if (result.success) {
            const updateAllHabits = allHabits.map((singleHabit) => {
                if (singleHabit._id === selectedItems._id) {
                    return { ...habit, _id: selectedItems._id };
                }
                return singleHabit;
            });

            setAllHabits(updateAllHabits);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in updateHabitInServer:", error);
        toast.error("Something went wrong");
        return false;
    }
}