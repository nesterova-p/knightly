import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

export default function ActivityHeatmap({ allHabits }) {
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        calculateHeatmapData();
    }, [allHabits]);

    const calculateHeatmapData = () => {
        const dateMap = {};

        allHabits.forEach(habit => {
            if (habit.completedDays && habit.completedDays.length > 0) {
                habit.completedDays.forEach(day => {
                    const date = day.date;
                    if (dateMap[date]) {
                        dateMap[date]++;
                    } else {
                        dateMap[date] = 1;
                    }
                });
            }
        });

        const heatmapValues = Object.keys(dateMap).map(date => ({
            date: date,
            count: dateMap[date]
        }));

        setHeatmapData(heatmapValues);
    };

    const getHeatmapColor = (value) => {
        if (!value || value.count === 0) {
            return "color-empty";
        }
        const maxCount = Math.max(...heatmapData.map(d => d.count), 1);
        const intensity = Math.ceil((value.count / maxCount) * 4);
        return `color-scale-${Math.min(intensity, 4)}`;
    };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 6);

    const dayOfWeek = startDate.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : (1 - dayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - daysToMonday);

    return (
        <div className="bg-white p-5 rounded-md">
            <style jsx>{`
                .color-empty { fill: #ebedf0; }
                .color-scale-1 { fill: #c6e48b; }
                .color-scale-2 { fill: #7bc96f; }
                .color-scale-3 { fill: #239a3b; }
                .color-scale-4 { fill: #196127; }
                .react-calendar-heatmap .react-calendar-heatmap-weekday-labels {
                    transform: translateY(15px);
                }
                .react-calendar-heatmap .react-calendar-heatmap-weekday-labels text:first-child {
                    display: none;
                }
                .react-calendar-heatmap .react-calendar-heatmap-weekday-labels text {
                    font-size: 10px;
                }
            `}</style>

            <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-primary" />
                <h3 className="font-bold text-lg">Activity Heatmap</h3>
            </div>

            <div className="overflow-x-auto">
                <div style={{ minWidth: '600px' }}>
                    <CalendarHeatmap
                        startDate={startDate}
                        endDate={endDate}
                        values={heatmapData}
                        showMonthLabels={true}
                        showWeekdayLabels={true}
                        classForValue={getHeatmapColor}
                        tooltipDataAttrs={(value) => {
                            if (!value || !value.date) {
                                return null;
                            }
                            return {
                                'data-tip': `${value.date}: ${value.count} habits completed`,
                            };
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-200"></div>
                    <div className="w-3 h-3" style={{ backgroundColor: '#c6e48b' }}></div>
                    <div className="w-3 h-3" style={{ backgroundColor: '#7bc96f' }}></div>
                    <div className="w-3 h-3" style={{ backgroundColor: '#239a3b' }}></div>
                    <div className="w-3 h-3" style={{ backgroundColor: '#196127' }}></div>
                </div>
                <span>More</span>
            </div>
        </div>
    );
}