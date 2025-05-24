import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";

export async function updateCompletedDaysInServer(habit) {
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

        console.log("Updating completed days for habit:", habit._id);

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
            console.error("Error updating completed days:", errorData.message);
            return { success: false, error: errorData.message };
        }

        const data = await response.json();

        return {
            success: true,
            habit: data.habit,
            message: data.message
        };

    } catch (error) {
        console.error("Error updating completed days:", error);
        return { success: false, error: error.message };
    }
}

export async function toggleHabitCompletion({
                                                habit,
                                                selectedCurrentDay,
                                                isChecked,
                                                allHabits,
                                                setAllHabits
                                            }) {
    try {
        let updatedCompletedDays;

        if (isChecked) {
            const completedDay = {
                _id: `${Date.now()}-${Math.random()}`,
                date: selectedCurrentDay,
            };

            const currentCompletedDays = habit.completedDays || [];
            const isAlreadyCompleted = currentCompletedDays.some(
                (day) => day.date === selectedCurrentDay
            );

            if (!isAlreadyCompleted) {
                updatedCompletedDays = [...currentCompletedDays, completedDay];
            } else {
                updatedCompletedDays = currentCompletedDays;
            }
        } else {
            updatedCompletedDays = habit.completedDays
                ? habit.completedDays.filter((day) => day.date !== selectedCurrentDay)
                : [];
        }

        const updatedHabit = {
            ...habit,
            completedDays: updatedCompletedDays
        };

        const result = await updateCompletedDaysInServer(updatedHabit);

        if (result.success) {
            const updatedHabits = allHabits.map((h) =>
                h._id === habit._id ? updatedHabit : h
            );
            setAllHabits(updatedHabits);
            return true;
        } else {
            toast.error("Failed to update habit completion");
            return false;
        }

    } catch (error) {
        console.error("Error in toggleHabitCompletion:", error);
        toast.error("Something went wrong");
        return false;
    }
}