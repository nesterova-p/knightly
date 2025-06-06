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

        const [year, month, day] = selectedCurrentDay.split('-').map(Number);
        const currentDate = new Date(year, month - 1, day);
        const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dayId = dayOfWeek === 0 ? 7 : dayOfWeek; // Convert to 1-7 where 1=Monday
        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const dayName = dayNames[dayOfWeek];

        let scheduledHabits = [];

        allHabits.forEach((habit) => {
            let isScheduledForToday = false;

            if (habit.isTask || (habit.frequency && habit.frequency[0]?.type === "Once")) {
                if (habit.dueDate) {
                    const taskDueDate = new Date(habit.dueDate);
                    const taskDateStr = taskDueDate.toISOString().split('T')[0];
                    isScheduledForToday = taskDateStr === selectedCurrentDay;
                }
            } else if (habit.frequency && habit.frequency[0] && habit.frequency[0].type === "Each Day") {
                isScheduledForToday = true;
            } else if (habit.frequency && habit.frequency[0] && habit.frequency[0].days) {
                isScheduledForToday = habit.frequency[0].days.some(
                    (day) => day.id === dayId && day.isSelected
                );
            }

            if (isScheduledForToday) {
                scheduledHabits.push(habit);
            }
        });

        if (scheduledHabits.length === 0) {
            setTodayProgress(100); // No habits scheduled = 100% complete
            return;
        }

        const completedHabits = scheduledHabits.filter((habit) => {
            return habit.completedDays && habit.completedDays.some(
                (day) => day.date === selectedCurrentDay
            );
        });

        const progress = Math.round((completedHabits.length / scheduledHabits.length) * 100);
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
        <div className="flex w-full flex-col gap-4 justify-center items-center p-6 rounded-lg mt-24"
             style={{
                 backgroundColor: 'rgb(83,55,34,0.3)',
                 backdropFilter: 'blur(2px)',
             }}>

            <span className="font-bold text-2xl sm:text-3xl cursor-pointer transition-colors pixelify-bold" // Zwiększono z text-xl na text-2xl sm:text-3xl
                  style={{
                      color: '#FFE4B5',
                      textShadow: '2px 2px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
                      imageRendering: 'pixelated'
                  }}>
                Statistics
            </span>

            <div className="relative pt-2 w-full flex justify-center">
                <div className="scale-75 sm:scale-100">
                    <CircularProgressBar progress={todayProgress} />
                </div>
                <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="font-bold text-xl sm:text-2xl text-primary mt-2 pixelify-bold" // Zwiększono z text-lg sm:text-xl na text-xl sm:text-2xl
                          style={{
                              color: '#9EC77D',
                              textShadow: '1px 1px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
                          }}>
                        {todayProgress}%
                    </span>
                    <span className="text-[13px] sm:text-[15px] text-center mt-1 pixelify-regular" // Zwiększono z text-[11px] sm:text-[12px]
                          style={{
                              color: '#E6E6FA',
                              textShadow: '1px 1px 0px #000000'
                          }}>
                        Today's Progress
                    </span>
                </div>
            </div>

            <div className="my-2 flex justify-center gap-4 sm:gap-6 flex-wrap items-center w-full max-sm:gap-4 ">
                {statisticsInfo.map((singleItem, singleItemIndex) => (
                    <div className="flex items-center gap-2 sm:gap-3" key={singleItemIndex}>
                        <div className="w-4 h-4" // Zwiększono z w-3 h-3 i usunąłem rounded-full (teraz kwadracik)
                             style={{
                                 backgroundColor: '#FF6B6B',
                                 boxShadow: '0 0 4px rgba(255, 107, 107, 0.6)',
                                 imageRendering: 'pixelated' // Dodano dla pixelowego stylu
                             }}></div>
                        <div className="text-[14px] sm:text-[16px]"> {/* Zwiększono z text-[12px] sm:text-[13px] */}
                            <span className="flex flex-col font-bold pixelify-bold text-lg sm:text-xl" // Dodano text-lg sm:text-xl
                                  style={{
                                      color: '#FFE4B5',
                                      textShadow: '1px 1px 0px #000000'
                                  }}>
                                {singleItem.num}
                            </span>
                            <span className="pixelify-regular text-sm sm:text-base" // Dodano text-sm sm:text-base
                                  style={{
                                      color: '#D3D3D3',
                                      textShadow: '1px 1px 0px #000000'
                                  }}>
                                {singleItem.subTitle}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}