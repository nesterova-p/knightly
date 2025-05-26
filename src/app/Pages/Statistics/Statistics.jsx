import StatisticsTopBar from "./Components/StatisticsTopBar";
import StatisticsCards from "./Components/StatisticsCards";
import ActivityHeatmap from "./Components/ActivityHeatmap";
import TopPerformers from "./Components/TopPerformers";
import MonthlyProgress from "./Components/MonthlyProgress";
import AllHabitsPerformance from "./Components/AllHabitsPerformance";
import IndividualHabitStatistics from "./Components/IndividualHabitStatistics";
import { useGlobalContextProvider } from "../../contextApi";

export default function Statistics() {
    const { allHabitObject: { allHabits } } = useGlobalContextProvider();

    return (
        <div className="w-full h-screen p-3 overflow-y-auto">
            <StatisticsTopBar />
            <StatisticsCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <ActivityHeatmap allHabits={allHabits} />
                <TopPerformers allHabits={allHabits} />
            </div>

            <MonthlyProgress allHabits={allHabits} />
            <AllHabitsPerformance allHabits={allHabits} />
            <IndividualHabitStatistics allHabits={allHabits} />
        </div>
    );
}