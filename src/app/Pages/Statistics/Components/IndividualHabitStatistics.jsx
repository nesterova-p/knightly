import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import HabitStatisticsCard from "./HabitStatisticsCard";

export default function IndividualHabitStatistics({ allHabits }) {
    return (
        <div className="bg-white p-5 rounded-md mt-4">
            <div className="flex items-center gap-2 mb-6">
                <FontAwesomeIcon icon={faChartBar} className="text-primary" />
                <h3 className="font-bold text-lg">Individual Habit Statistics</h3>
            </div>

            {allHabits.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No habits to display yet</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {allHabits.map((habit, index) => (
                        <HabitStatisticsCard key={habit._id || index} habit={habit} />
                    ))}
                </div>
            )}
        </div>
    );
}