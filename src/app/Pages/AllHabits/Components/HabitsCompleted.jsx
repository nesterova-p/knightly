import { useGlobalContextProvider } from "../../../contextApi";
import { SingleHabitCard } from "../../AllHabits/Components/SingleHabitCard";

export default function HabitsCompleted() {
    const {
        allFilteredHabitsObject,
        selectedCurrentDayObject
    } = useGlobalContextProvider();

    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { allFilteredHabits } = allFilteredHabitsObject;

    const areAllHabitsNotCompleted = allFilteredHabits.every((singleHabit) => {
        return !(singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        ));
    });

    return (
        <div className="bg-white mt-7 p-8 py-10 rounded-md">
            <span className="font-bold text-lg mb-2">
                Habits Completed
            </span>
            <div className="mt-7 opacity-50">
                <div className="mt-10 w-full flex justify-center">
                    {areAllHabitsNotCompleted && (
                        <p className=" text-gray-400 w-72 text-center">
                            {`Habit stacking is like a superpower! Don't let it go to waste!`}
                        </p>
                    )}
                </div>

                {allFilteredHabits.map((singleHabit, index) => (
                    <div key={index}>
                        {singleHabit.completedDays && singleHabit.completedDays.some(
                            (day) => day.date === selectedCurrentDay
                        ) && (
                            <SingleHabitCard singleHabit={singleHabit} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}