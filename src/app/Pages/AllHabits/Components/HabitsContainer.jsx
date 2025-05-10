import HabitsContainerTop from "../../AllHabits/Components/HabitsContainer/HabitsContainerTop";
import HabitsContainerMain from "../../AllHabits/Components/HabitsContainer/HabitsContainerMain";
import HabitsCompleted from "../../AllHabits/Components/HabitsCompleted";

export default function HabitsContainer(){
    return (
        <div className={"mt-5 bg-white rounded-md p-5 flex flex-col gap-3"}>
            {/* overflow-y-auto */}
            <HabitsContainerTop/>
            <HabitsContainerMain/>
        </div>
    )
}