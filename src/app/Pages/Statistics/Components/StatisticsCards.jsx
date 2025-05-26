import { useEffect, useState } from "react";
import { faBorderAll, faChartSimple, faCheck, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "../../../contextApi";
import { calculateCurrentStreak, calculateTotalPerfectDays } from "../../../utils/statisticsUtils";

export default function StatisticsCards() {
    const [statisticsCard, setStatisticsCard] = useState([
        { id: 1, icon: faFaceSmile, counter: 0, text: 'Total Habits' },
        { id: 2, icon: faBorderAll, counter: 0, text: 'Total Perfect Days' },
        { id: 3, icon: faChartSimple, counter: 0, text: 'Average Per Daily' },
        { id: 4, icon: faCheck, counter: 0, text: 'Best Streak' }
    ]);

    const [windowWidth, setWindowWidth] = useState(0);
    const { allHabitObject: { allHabits } } = useGlobalContextProvider();

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!allHabits || allHabits.length === 0) {
            setStatisticsCard(prev => prev.map(card => ({ ...card, counter: 0 })));
            return;
        }

        // total habits
        const totalHabits = allHabits.length;

        // perfect days
        const perfectDays = calculateTotalPerfectDays(allHabits);

        // average per daily
        const allCompletedDates = new Set();
        let totalCompletions = 0;

        allHabits.forEach(habit => {
            if (habit.completedDays) {
                habit.completedDays.forEach(day => {
                    allCompletedDates.add(day.date);
                    totalCompletions++;
                });
            }
        });

        const averagePerDaily = allCompletedDates.size > 0
            ? (totalCompletions / allCompletedDates.size).toFixed(1)
            : 0;

        // best streak
        let bestStreak = 0;
        allHabits.forEach(habit => {
            const streak = calculateCurrentStreak(habit);
            if (streak > bestStreak) {
                bestStreak = streak;
            }
        });

        const updatedStats = [...statisticsCard];
        updatedStats[0].counter = totalHabits;
        updatedStats[1].counter = perfectDays;
        updatedStats[2].counter = parseFloat(averagePerDaily);
        updatedStats[3].counter = bestStreak;
        setStatisticsCard(updatedStats);
    }, [allHabits]);

    const filteredStatisticsCards = windowWidth < 640
        ? statisticsCard.filter((card) => card.text !== "Average Per Daily")
        : statisticsCard;

    return (
        <div className="p-5 mt-4 rounded-md grid grid-cols-4 gap-4 max-sm:grid-cols-3 bg-white">
            {filteredStatisticsCards.map((singleCard, index) => (
                <div key={index}
                     className="bg-slate-50 flex flex-col gap-1 items-center p-5 rounded-md">
                    <FontAwesomeIcon className="text-primary" icon={singleCard.icon} />
                    <span className="font-bold text-xl mt-3">{singleCard.counter}</span>
                    <span className="text-sm text-light">{singleCard.text}</span>
                </div>
            ))}
        </div>
    );
}