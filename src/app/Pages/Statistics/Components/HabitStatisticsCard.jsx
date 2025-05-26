import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CalendarHeatmap from "react-calendar-heatmap";
import { textToIcon } from "../../AllHabits/Components/IconWindow/IconData";
import { calculateCompletionRate, calculateCurrentStreak } from "../../../utils/statisticsUtils";
import "react-calendar-heatmap/dist/styles.css";

export default function HabitStatisticsCard({ habit }) {
    const iconObject = habit.icon ?
        (typeof habit.icon === 'string' ? textToIcon(habit.icon) : habit.icon)
        : null;

    const consistency = calculateCompletionRate(habit);
    const streak = calculateCurrentStreak(habit);

    const getFrequencyText = () => {
        if (habit.isTask) return "Task";
        if (habit.frequency && habit.frequency[0]?.days) {
            const selectedDays = habit.frequency[0].days.filter(d => d.isSelected).map(d => d.name);
            return selectedDays.join(", ");
        }
        return "Not set";
    };

    const transformToHeatmapData = () => {
        const dateMap = {};
        habit.completedDays?.forEach((day) => dateMap[day.date] = 1);
        return Object.keys(dateMap).map((date) => ({ date, count: dateMap[date] }));
    };

    const heatmapData = transformToHeatmapData();
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 2);
    const dayOfWeek = startDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7;
    startDate.setDate(startDate.getDate() + daysToMonday);

    return (
        <div className="bg-slate-50 rounded-lg p-4 flex flex-col h-full min-h-[280px] transition-all duration-200 hover:shadow-md">
            <style jsx>{`
                .individual-heatmap {
                    border: 1px;
                }

                .react-calendar-heatmap {
                    font-size: 10px !important;
                }
                .react-calendar-heatmap rect {
                    rx: 2;
                    ry: 2;
                    width: 8px !important;
                    height: 8px !important;
                }
                .color-empty { fill: #ebedf0; }
                .color-filled { fill: #196127; }
            `}</style>

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3 items-center flex-1 min-w-0">
                    <div className="bg-primary w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {iconObject && <FontAwesomeIcon icon={iconObject} className="text-sm" />}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm text-gray-800 truncate">{habit.name}</h4>
                        <span className="text-xs text-gray-500 block mt-0.5">{getFrequencyText()}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">{habit.completedDays?.length || 0}</div>
                    <div className="text-xs text-gray-500">Total</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-lg text-primary">{consistency}%</div>
                    <div className="text-xs text-gray-500">Consistency</div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-lg text-pink-400">{streak}</div>
                    <div className="text-xs text-gray-500">Streak</div>
                </div>
            </div>

            {/* Heatmap */}
            <div className="individual-heatmap flex-1 flex items-end">
                <div className="w-full">
                    <CalendarHeatmap
                        startDate={startDate}
                        endDate={endDate}
                        values={heatmapData}
                        showMonthLabels={false}
                        showWeekdayLabels={false}
                        classForValue={(value) => (!value || value.count === 0 ? "color-empty" : "color-filled")}
                        tooltipDataAttrs={(value) => value?.date ? { 'data-tip': `${value.date}: Completed` } : null}
                        gutterSize={1}
                    />
                </div>
            </div>
        </div>
    );
}