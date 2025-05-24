import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";

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
            throw new Error("Failed to add habit");
        }

        const data = await response.json();
        const { _id } = data.habit;

        const updatedIdOfHabit = { ...habit, id: _id };

        setAllHabits([...allHabits, updatedIdOfHabit]);
        toast.success("Habit added successfully!");
    } catch (error) {
        toast.error("Something went wrong...");
    }
}