import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

export default function MonthlyProgress({ allHabits }) {
    const [monthlyProgress, setMonthlyProgress] = useState(0);

    useEffect(() => {
        calculateMonthlyProgress();
    }, [allHabits]);

    const calculateMonthlyProgress = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);

        let totalCompleted = 0;
        let totalExpected = 0;

        for (let d = new Date(monthStart); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][d.getDay()];

            allHabits.forEach(habit => {
                if (habit.isTask) {
                    if (habit.dueDate) {
                        const taskDueDate = new Date(habit.dueDate);
                        taskDueDate.setHours(0, 0, 0, 0);
                        if (taskDueDate.toISOString().split('T')[0] === dateStr) {
                            totalExpected++;
                            if (habit.completedDays && habit.completedDays.some(day => day.date === dateStr)) {
                                totalCompleted++;
                            }
                        }
                    }
                } else {
                    if (habit.frequency && habit.frequency[0] && habit.frequency[0].days) {
                        const isScheduledForDay = habit.frequency[0].days.some(
                            day => day.name === dayOfWeek && day.isSelected
                        );

                        if (isScheduledForDay) {
                            let habitExistedOnDate = true;
                            if (habit.createdAt) {
                                const createdDate = new Date(habit.createdAt);
                                createdDate.setHours(0, 0, 0, 0);
                                habitExistedOnDate = createdDate <= d;
                            }

                            if (habitExistedOnDate) {
                                totalExpected++;
                                if (habit.completedDays && habit.completedDays.some(day => day.date === dateStr)) {
                                    totalCompleted++;
                                }
                            }
                        }
                    }
                }
            });
        }

        const progress = totalExpected > 0 ? Math.round((totalCompleted / totalExpected) * 100) : 0;
        setMonthlyProgress(Math.min(progress, 100));
    };

    return (
        <div className="bg-white p-5 rounded-md mt-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFire} className="text-primary" />
                    <h3 className="font-bold text-lg">Monthly Progress</h3>
                </div>
                <span className="text-2xl font-bold text-primary">{monthlyProgress}%</span>
            </div>

            <div className="relative">
                <div className="bg-gray-200 rounded-full h-8">
                    <div
                        className="bg-gradient-to-r from-primary to-green-400 rounded-full h-8 flex items-center justify-center transition-all duration-700"
                        style={{ width: `${monthlyProgress}%` }}
                    >
                        {monthlyProgress > 20 && (
                            <span className="text-white text-sm font-medium">
                                {monthlyProgress}% Complete
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-600 mt-2 text-center">
                Keep going! You're doing great this month.
            </p>
        </div>
    );
}