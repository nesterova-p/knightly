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
        allFilteredHabitsObject,
        searchHabitsObject
    } = useGlobalContextProvider();

    const { allHabits } = allHabitObject;
    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { selectedAreaString } = selectedAreaStringObject;
    const { allFilteredHabits, setAllFilteredHabits } = allFilteredHabitsObject;
    const { searchQuery } = searchHabitsObject;

    useEffect(() => {
        const currentDate = new Date();
        const [year, month, day] = selectedCurrentDay.split('-').map(Number);
        currentDate.setFullYear(year, month - 1, day);
        currentDate.setHours(0, 0, 0, 0);

        const dayOfWeek = currentDate.getDay();
        const dayId = dayOfWeek === 0 ? 7 : dayOfWeek;

        console.log("Current day index:", dayId, "Selected area:", selectedAreaString);

        const filteredHabitsByFrequency = allHabits.filter((singleHabit) => {
            if (singleHabit.isTask || (singleHabit.frequency && singleHabit.frequency[0]?.type === "Once")) {
                if (singleHabit.dueDate) {
                    const taskDueDate = new Date(singleHabit.dueDate);
                    const taskDateString = taskDueDate.toISOString().split('T')[0];
                    const currentDateString = selectedCurrentDay;
                    return taskDateString === currentDateString;
                }
                return false;
            }

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

        let filteredHabitsBySearch = filteredHabitsByArea;
        if (searchQuery.trim()) {
            filteredHabitsBySearch = filteredHabitsByArea.filter((habit) =>
                habit.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setAllFilteredHabits(filteredHabitsBySearch);

    }, [selectedCurrentDay, allHabits, selectedAreaString, searchQuery, setAllFilteredHabits]); // DODANE searchQuery

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

    const isEmptyDueToSearch = searchQuery.trim() && nonEmptyHabits.length === 0;

    return (
        <div className="p-3">
            {nonEmptyHabits.length > 0 ? (
                <>
                    {areAllHabitsCompleted ? (
                        <SuccessPlaceHolder/>
                    ) : (
                        nonCompletedHabits.map((singleHabit, singleHabitIndex) => (
                            <div key={singleHabitIndex}>
                                <SingleHabitCard singleHabit={singleHabit} />
                            </div>
                        ))
                    )}
                </>
            ) : (
                isEmptyDueToSearch ? (
                    <SearchEmptyPlaceHolder searchQuery={searchQuery} />
                ) : (
                    <EmptyPlaceHolder/>
                )
            )}
        </div>
    );
}

function SearchEmptyPlaceHolder({ searchQuery }) {
    const { searchHabitsObject } = useGlobalContextProvider();
    const { setSearchQuery } = searchHabitsObject;

    return (
        <div className={"flex justify-center items-center flex-col py-8"}>
            <div className="text-6xl mb-4">🔍</div>
            <span className={"text-center text-gray-500 py-2"}>
                No habits found for "<strong>{searchQuery}</strong>"
            </span>
            <button
                onClick={() => setSearchQuery("")}
                className="mt-3 px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
                Clear search
            </button>
        </div>
    );
}