import CircularProgressBar from "../../Components/SecondSideBar/CircularProgressBar";
import { useGlobalContextProvider } from "../../../../contextApi";
import { useState, useEffect } from "react";
import { calculateCurrentStreak, calculateTotalPerfectDays } from "../../../../utils/statisticsUtils";

export default function MainStats() {
    const {
        allHabitObject: { allHabits },
        selectedCurrentDayObject: { selectedCurrentDay }
    } = useGlobalContextProvider();

    const [todayProgress, setTodayProgress] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [perfectDays, setPerfectDays] = useState(0);

    useEffect(() => {
        calculateTodayProgress();
        calculateBestStreak();
        calculatePerfectDays();
    }, [allHabits, selectedCurrentDay]);

    const calculateTodayProgress = () => {
        if (!allHabits || allHabits.length === 0) {
            setTodayProgress(0);
            return;
        }

        const currentDate = new Date(selectedCurrentDay);
        currentDate.setHours(0, 0, 0, 0);
        const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][currentDate.getDay()];
        const dateStr = currentDate.toISOString().split('T')[0];

        const todayHabits = allHabits.filter((habit) => {
            if (habit.isTask) {
                if (!habit.dueDate) return false;
                const taskDueDate = new Date(habit.dueDate);
                taskDueDate.setHours(0, 0, 0, 0);
                return taskDueDate.toISOString().split('T')[0] === dateStr;
            } else {
                // Check if habit is scheduled for this day
                return habit.frequency &&
                    habit.frequency[0] &&
                    habit.frequency[0].days &&
                    habit.frequency[0].days.some(day => day.name === dayOfWeek && day.isSelected);
            }
        });

        if (todayHabits.length === 0) {
            setTodayProgress(100); // No habits scheduled = 100% complete
            return;
        }

        const completedToday = todayHabits.filter((habit) =>
                habit.completedDays && habit.completedDays.some(
                    (day) => day.date === dateStr
                )
        );

        const progress = Math.round((completedToday.length / todayHabits.length) * 100);
        setTodayProgress(progress);
    };

    const calculateBestStreak = () => {
        if (!allHabits || allHabits.length === 0) {
            setBestStreak(0);
            return;
        }

        let maxStreak = 0;
        allHabits.forEach(habit => {
            const streak = calculateCurrentStreak(habit);
            if (streak > maxStreak) {
                maxStreak = streak;
            }
        });

        setBestStreak(maxStreak);
    };

    const calculatePerfectDays = () => {
        if (!allHabits || allHabits.length === 0) {
            setPerfectDays(0);
            return;
        }

        const perfectDayCount = calculateTotalPerfectDays(allHabits);
        setPerfectDays(perfectDayCount);
    };

    const statisticsInfo = [
        { id: 1, num: bestStreak, subTitle: "Best streak" },
        { id: 2, num: perfectDays, subTitle: "Perfect days" },
    ];

    return (
        <div className="flex mx-4 max-sm:mx-2 w-full flex-col gap-4 justify-center items-center mt-5 rounded-xl p-4 pt-5 bg-slate-50">
            <span className="font-bold text-xl cursor-pointer hover:text-primary transition-colors">
                Statistics
            </span>

            <div className="relative pt-2 w-full flex justify-center">
                <CircularProgressBar progress={todayProgress} />
                <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="font-bold text-xl text-primary mt-2">
                        {todayProgress}%
                    </span>
                    <span className="text-[11px] text-slate-400 text-center mt-1">
                        Today's Progress
                    </span>
                </div>
            </div>

            <div className="my-2 flex justify-center gap-6 flex-wrap items-center w-full max-sm:gap-4">
                {statisticsInfo.map((singleItem, singleItemIndex) => (
                    <div className="flex items-center gap-3" key={singleItemIndex}>
                        <div className="w-2 h-2 bg-customRed rounded-full"></div>
                        <div className="text-[12px]">
                            <span className="flex flex-col font-bold">
                                {singleItem.num}
                            </span>
                            <span className="text-gray-500">
                                {singleItem.subTitle}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}