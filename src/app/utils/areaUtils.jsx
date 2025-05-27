import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";

export async function addNewArea({ allAreas, setAllAreas, area }) {
    const { icon } = area;
    const areaIconText = iconToText(icon);
    const updatedArea = { ...area, icon: areaIconText };

    try {
        const response = await fetch("/api/areas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedArea),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error || "Failed to create area");
            return false;
        }

        const data = await response.json();
        const { _id } = data.area;
        const updatedIdOfArea = { ...area, _id: _id };

        setAllAreas([...allAreas, updatedIdOfArea]);
        toast.success("Area created successfully!");
        return true;

    } catch (error) {
        console.error("Error creating area:", error);
        toast.error("Something went wrong while creating the area");
        return false;
    }
}

export async function updateAreaInServer({ allAreas, setAllAreas, selectedArea, area, allHabits, setAllHabits }) {
    try {
        const areaIconText = iconToText(area.icon);
        const updatedArea = { ...area, icon: areaIconText };

        const response = await fetch(`/api/areas?areaId=${selectedArea._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updatedArea.name,
                icon: updatedArea.icon,
                clerkUserId: updatedArea.clerkUserId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Failed to update area");
            return false;
        }

        const updateAllAreas = allAreas.map((singleArea) => {
            if (singleArea._id === selectedArea._id) {
                return { ...area, _id: selectedArea._id };
            }
            return singleArea;
        });

        setAllAreas(updateAllAreas);

        if (allHabits && setAllHabits && selectedArea.name !== area.name) {
            const updatedHabits = allHabits.map((habit) => {
                if (habit.areas && habit.areas.some(habitArea => habitArea.name === selectedArea.name)) {
                    const updatedHabitAreas = habit.areas.map(habitArea => {
                        if (habitArea.name === selectedArea.name) {
                            return { ...habitArea, name: area.name, icon: area.icon };
                        }
                        return habitArea;
                    });
                    return { ...habit, areas: updatedHabitAreas };
                }
                return habit;
            });
            setAllHabits(updatedHabits);
        }

        toast.success("Area updated successfully!");
        return true;

    } catch (error) {
        console.error("Error updating area:", error);
        toast.error("Something went wrong while updating the area");
        return false;
    }
}

export async function deleteArea(allAreas, setAllAreas, selectedArea, allHabits, setAllHabits) {
    try {
        const response = await fetch('/api/areas', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ areaId: selectedArea?._id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData.message);
            toast.error("Failed to delete area");
            return false;
        }

        // delete area from habits that use it
        if (allHabits && setAllHabits) {
            const habitsToUpdate = allHabits.filter(habit =>
                habit.areas && habit.areas.some(area => area.name === selectedArea.name)
            );

            for (const habit of habitsToUpdate) {
                const updatedAreas = habit.areas.filter(area => area.name !== selectedArea.name);

                try {
                    await fetch(`/api/habits?habitId=${habit._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: habit.name,
                            icon: iconToText(habit.icon),
                            areas: updatedAreas.map(area => ({
                                ...area,
                                icon: iconToText(area.icon)
                            })),
                            frequency: habit.frequency,
                            notificationTime: habit.reminderTime,
                            isNotificationOn: habit.hasReminder,
                            completedDays: habit.completedDays,
                            isTask: habit.isTask,
                            dueDate: habit.dueDate,
                            hasReminder: habit.hasReminder,
                            reminderTime: habit.reminderTime,
                            clerkUserId: habit.clerkUserId
                        }),
                    });
                } catch (error) {
                    console.warn(`Failed to update habit ${habit.name}:`, error);
                }
            }

            const updatedHabits = allHabits.map((habit) => {
                if (habit.areas && habit.areas.some(area => area.name === selectedArea.name)) {
                    const filteredAreas = habit.areas.filter(area => area.name !== selectedArea.name);
                    return { ...habit, areas: filteredAreas };
                }
                return habit;
            });

            setAllHabits(updatedHabits);
        }

        const updatedAreas = allAreas.filter((area) =>
            area._id !== selectedArea?._id
        );

        setAllAreas(updatedAreas);
        toast.success("Area deleted successfully");
        return true;

    } catch (error) {
        toast.error("Something went wrong");
        console.error("Error deleting area:", error);
        return false;
    }
}