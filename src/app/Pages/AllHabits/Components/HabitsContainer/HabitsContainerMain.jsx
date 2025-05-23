import { useGlobalContextProvider } from "../../../../contextApi";
import { useEffect } from "react";
import EmptyPlaceHolder from "../../../AllHabits/Components/EmptyPlaceHolder";
import { SingleHabitCard } from "../../../AllHabits/Components/SingleHabitCard";
import SuccessPlaceHolder from "../../../AllHabits/Components/SuccessPlaceHolder";

export default function HabitsContainerMain() {
    const {
        allHabitObject,
        selectedCurrentDayObject,
        selectedAreaStringObject,
        allFilteredHabitsObject
    } = useGlobalContextProvider();

    const { allHabits } = allHabitObject;
    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { selectedAreaString } = selectedAreaStringObject;
    const { allFilteredHabits, setAllFilteredHabits } = allFilteredHabitsObject;

    useEffect(() => {
        const currentDate = new Date(selectedCurrentDay);
        const currentDayIndex = currentDate.getDay();
        const dayId = currentDayIndex === 0 ? 7 : currentDayIndex;

        console.log("Current day index:", dayId, "Selected area:", selectedAreaString);

        const filteredHabitsByFrequency = allHabits.filter((singleHabit) => {
            if (!singleHabit.frequency || !singleHabit.frequency[0] || !singleHabit.frequency[0].days) {
                return false;
            }
            return singleHabit.frequency[0].days.some(
                (day) => day.id === dayId && day.isSelected
            );
        });

        let filteredHabitsByArea = [];
        if (selectedAreaString !== "All") {
            filteredHabitsByArea = filteredHabitsByFrequency.filter((habit) => {
                if (!habit.areas) return false;
                return habit.areas.some((area) => area.name === selectedAreaString);
            });
        } else {
            filteredHabitsByArea = filteredHabitsByFrequency;
        }

        setAllFilteredHabits(filteredHabitsByArea);

    }, [selectedCurrentDay, allHabits, selectedAreaString, setAllFilteredHabits]);

    const nonEmptyHabits = allFilteredHabits.filter(habit => habit && habit.name && habit.name.trim() !== "");

    const areAllHabitsCompleted = nonEmptyHabits.length > 0 && nonEmptyHabits.every((singleHabit) => {
        return singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        );
    });

    const nonCompletedHabits = nonEmptyHabits.filter((singleHabit) => {
        return !(singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        ));
    });

    return (
        <div className="p-3">
            {nonEmptyHabits.length > 0 ? (
                <>
                    {areAllHabitsCompleted ? (
                        <SuccessPlaceHolder/>
                    ) : (
                        // remaining habits to complete
                        nonCompletedHabits.map((singleHabit, singleHabitIndex) => (
                            <div key={singleHabitIndex}>
                                <SingleHabitCard singleHabit={singleHabit} />
                            </div>
                        ))
                    )}
                </>
            ) : (
                <EmptyPlaceHolder/>
            )}
        </div>
    );
}