import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { calculateCompletionRate } from "../../../utils/statisticsUtils";

export default function TopPerformers({ allHabits }) {
    const [habitStats, setHabitStats] = useState([]);

    useEffect(() => {
        calculateHabitStats();
    }, [allHabits]);

    const calculateHabitStats = () => {
        const stats = allHabits.map(habit => {
            const completionRate = calculateCompletionRate(habit);

            return {
                name: habit.name,
                completed: habit.completedDays ? habit.completedDays.length : 0,
                completionRate,
                isTask: habit.isTask,
                areas: habit.areas || []
            };
        });

        // sort by completion rate
        setHabitStats(stats.sort((a, b) => b.completionRate - a.completionRate));
    };

    return (
        <div className="bg-white p-5 rounded-md">
            <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faTrophy} className="text-primary" />
                <h3 className="font-bold text-lg">Top Performers</h3>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
                {habitStats.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No habits to display yet</p>
                ) : (
                    habitStats.slice(0, 5).map((habit, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex-1">
                                <p className="font-medium text-sm">{habit.name}</p>
                                <div className="flex gap-1 mt-1">
                                    {habit.areas.map((area, idx) => (
                                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                            {area.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-primary">{habit.completionRate}%</p>
                                <p className="text-xs text-gray-500">{habit.completed} times</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}