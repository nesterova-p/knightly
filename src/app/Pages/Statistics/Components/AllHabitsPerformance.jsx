import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { calculateCompletionRate } from "../../../utils/statisticsUtils";

export default function AllHabitsPerformance({ allHabits }) {
    const [habitStats, setHabitStats] = useState([]);

    useEffect(() => {
        calculateHabitStats();
    }, [allHabits]);

    const calculateHabitStats = () => {
        const stats = allHabits.map(habit => {
            const completionRate = calculateCompletionRate(habit);

            return {
                name: habit.name,
                completionRate,
                isTask: habit.isTask
            };
        });

        // sort by completion rate
        setHabitStats(stats.sort((a, b) => b.completionRate - a.completionRate));
    };

    return (
        <div className="bg-white p-5 rounded-md mt-4">
            <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faChartLine} className="text-primary" />
                <h3 className="font-bold text-lg">All Habits Performance</h3>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {habitStats.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No habits to display yet</p>
                ) : (
                    habitStats.map((habit, index) => (
                        <div key={index} className="border-b pb-2 last:border-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">
                                    {habit.name}
                                    {habit.isTask && <span className="ml-2 text-xs text-gray-500">(Task)</span>}
                                </span>
                                <span className="text-sm font-bold text-primary">{habit.completionRate}%</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary rounded-full h-2 transition-all duration-500"
                                    style={{ width: `${habit.completionRate}%` }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}