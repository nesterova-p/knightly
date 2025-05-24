import StatisticsTopBar from "../Statistics/Components/StatisticsTopBar";
import StatisticsCards from "../Statistics/Components/StatisticsCards";

export default function Statistics() {
    return (
        <div className={"w-full h-screen p-3"}>
            <StatisticsTopBar/>
            <StatisticsCards/>
        </div>
    )
}