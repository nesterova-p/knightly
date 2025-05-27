import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";
import { scheduleNotifications, scheduleTaskNotification, requestNotificationPermission } from "./notificationFunctions";

export async function addNewHabit({
                                      allHabits,
                                      setAllHabits,
                                      habit
                                  }) {
    const { icon, areas } = habit;

    const habitIconText = iconToText(icon);
    const areasCopy = areas.map((area) => ({
        ...area,
        icon: iconToText(area.icon),
    }));

    const updatedHabit = { ...habit, icon: habitIconText, areas: areasCopy };

    try {
        const response = await fetch("/api/habits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedHabit),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error === "A habit with this name already exists") {
                toast.error(`${updatedHabit.isTask ? "Task" : "Habit"} with this name already exists!`);
                return;
            }
            throw new Error("Failed to add habit");
        }

        const data = await response.json();
        const { _id } = data.habit;
        const updatedIdOfHabit = { ...habit, _id: _id };

        setAllHabits([...allHabits, updatedIdOfHabit]);

        if (updatedIdOfHabit.hasReminder) {
            if (typeof window !== 'undefined' && 'Notification' in window) {
                if (Notification.permission !== 'granted') {
                    const granted = await requestNotificationPermission();
                    if (!granted) {
                        toast.success(`${updatedIdOfHabit.isTask ? "Task" : "Habit"} added successfully!`);
                        return;
                    }
                }

                try {
                    if (updatedIdOfHabit.isTask) {
                        if (updatedIdOfHabit.dueDate && updatedIdOfHabit.reminderTime) {
                            scheduleTaskNotification(
                                updatedIdOfHabit.reminderTime,
                                updatedIdOfHabit.dueDate,
                                updatedIdOfHabit.name
                            );
                            toast.success(`Task "${updatedIdOfHabit.name}" added with reminder!`);
                        } else {
                            toast.success(`Task "${updatedIdOfHabit.name}" added successfully!`);
                        }
                    } else {
                        if (updatedIdOfHabit.frequency && updatedIdOfHabit.frequency[0] && updatedIdOfHabit.frequency[0].days) {
                            const selectedDays = updatedIdOfHabit.frequency[0].days
                                .filter(day => day.isSelected)
                                .map(day => day.name);

                            if (selectedDays.length > 0 && updatedIdOfHabit.reminderTime) {
                                scheduleNotifications(
                                    updatedIdOfHabit.reminderTime,
                                    selectedDays,
                                    updatedIdOfHabit.name
                                );
                                toast.success(`Habit "${updatedIdOfHabit.name}" added with reminders!`);
                            } else {
                                toast.success(`Habit "${updatedIdOfHabit.name}" added successfully!`);
                            }
                        } else {
                            toast.success(`Habit "${updatedIdOfHabit.name}" added successfully!`);
                        }
                    }
                } catch (notificationError) {
                    toast.error('Habit added but reminder setup failed');
                }
            } else {
                toast.success(`${updatedIdOfHabit.isTask ? "Task" : "Habit"} added successfully!`);
            }
        } else {
            toast.success(`${updatedIdOfHabit.isTask ? "Task" : "Habit"} added successfully!`);
        }

    } catch (error) {
        toast.error("Something went wrong while adding the habit...");
    }
}