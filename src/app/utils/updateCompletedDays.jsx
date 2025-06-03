import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";
import { getXPForDifficulty } from "./xpLevelUtils";

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
                clerkUserId: updatedHabit.clerkUserId,
                difficulty: updatedHabit.difficulty
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

export async function updateUserXP(clerkUserId, xpToAdd) {
    try {
        console.log(`Updating user XP: ${xpToAdd} points for user ${clerkUserId}`);

        const response = await fetch("/api/user/xp", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clerkUserId,
                xpToAdd
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error updating user XP:", errorData.message);
            return { success: false, error: errorData.message };
        }

        const data = await response.json();
        return {
            success: true,
            userData: data.user,
            message: data.message
        };

    } catch (error) {
        console.error("Error updating user XP:", error);
        return { success: false, error: error.message };
    }
}

export async function toggleHabitCompletion({
                                                habit,
                                                selectedCurrentDay,
                                                isChecked,
                                                allHabits,
                                                setAllHabits,
                                                userXPObject
                                            }) {
    try {
        let updatedCompletedDays;
        let xpChange = 0;

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
                xpChange = getXPForDifficulty(habit.difficulty || 'Easy');
                const taskType = habit.isTask ? 'Task' : 'Habit';
                toast.success(
                    `${taskType} completed! +${xpChange} XP earned! 🎉`,
                    {
                        duration: 3000,
                        style: {
                            background: '#638a58',
                            color: 'white',
                        }
                    }
                );
            } else {
                updatedCompletedDays = currentCompletedDays;
            }
        } else {
            const wasCompleted = habit.completedDays?.some((day) => day.date === selectedCurrentDay);

            updatedCompletedDays = habit.completedDays
                ? habit.completedDays.filter((day) => day.date !== selectedCurrentDay)
                : [];

            if (wasCompleted) {
                // Remove xp when unchecking
                xpChange = -getXPForDifficulty(habit.difficulty || 'Easy');

                toast(
                    `Task unchecked. ${Math.abs(xpChange)} XP removed.`,
                    {
                        duration: 2000,
                        style: {
                            background: '#1d2b1a',
                            color: 'white',
                        },
                        icon: 'ℹ️'
                    }
                );
            }
        }

        const updatedHabit = {
            ...habit,
            completedDays: updatedCompletedDays
        };

        const habitResult = await updateCompletedDaysInServer(updatedHabit);

        if (habitResult.success) {
            const updatedHabits = allHabits.map((h) =>
                h._id === habit._id ? updatedHabit : h
            );
            setAllHabits(updatedHabits);

            if (xpChange !== 0 && userXPObject) {
                const { clerkUserId, setUserXP, setUserLevel } = userXPObject;

                const xpResult = await updateUserXP(clerkUserId, xpChange);

                if (xpResult.success && xpResult.userData) {
                    setUserXP(xpResult.userData.totalXP || 0);
                    setUserLevel(xpResult.userData.level || 1);

                    const previousXP = (xpResult.userData.totalXP || 0) - xpChange;
                    const { calculateLevelFromXP } = await import('./xpLevelUtils');
                    const previousLevel = calculateLevelFromXP(previousXP);
                    const newLevel = calculateLevelFromXP(xpResult.userData.totalXP || 0);

                    if (newLevel > previousLevel) {
                        const { getLevelTitle } = await import('./xpLevelUtils');
                        toast.success(
                            `🎊 LEVEL UP! You are now ${getLevelTitle(newLevel)}! 🎊`,
                            {
                                duration: 5000,
                                style: {
                                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                                    color: '#000',
                                    fontWeight: 'bold',
                                }
                            }
                        );
                    }
                } else {
                    console.warn("Failed to update user XP, but habit was updated successfully");
                }
            }

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