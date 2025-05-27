import { useGlobalContextProvider } from "../../../contextApi";
import { SingleHabitCard } from "../../AllHabits/Components/SingleHabitCard";

export default function HabitsCompleted() {
    const {
        allFilteredHabitsObject,
        selectedCurrentDayObject,
        searchHabitsObject
    } = useGlobalContextProvider();

    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { allFilteredHabits } = allFilteredHabitsObject;
    const { searchQuery } = searchHabitsObject;

    const areAllHabitsNotCompleted = allFilteredHabits.every((singleHabit) => {
        return !(singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        ));
    });

    let completedHabits = allFilteredHabits.filter((singleHabit) => {
        return singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        );
    });

    if (searchQuery.trim()) {
        completedHabits = completedHabits.filter((habit) =>
            habit.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const hasCompletedHabitsAfterSearch = completedHabits.length > 0;

    return (
        <div className="bg-white mt-7 p-8 py-10 rounded-md">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">
                    Habits Completed
                </span>
                {searchQuery.trim() && (
                    <span className="text-sm text-gray-500">
                        {completedHabits.length} found
                    </span>
                )}
            </div>

            <div className="mt-7 opacity-50">
                <div className="mt-10 w-full flex justify-center">
                    {(areAllHabitsNotCompleted || !hasCompletedHabitsAfterSearch) && (
                        <p className="text-gray-400 w-72 text-center">
                            {searchQuery.trim() && !hasCompletedHabitsAfterSearch ? (
                                `No completed habits found for "${searchQuery}"`
                            ) : (
                                `Habit stacking is like a superpower! Don't let it go to waste!`
                            )}
                        </p>
                    )}
                </div>

                {completedHabits.map((singleHabit, index) => (
                    <div key={index}>
                        <SingleHabitCard singleHabit={singleHabit} />
                    </div>
                ))}
            </div>
        </div>
    );
}