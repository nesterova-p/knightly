import {AllHabitsRight} from "../../Pages/AllHabits/Components/AllHabitsRight";
import {AllHabitsTop} from "../../Pages/AllHabits/Components/AllHabitsTop";
import HabitsContainer from "../../Pages/AllHabits/Components/HabitsContainer";
import HabitsCompleted from "../../Pages/AllHabits/Components/HabitsCompleted";

export default function AllHabits() {
    return (
        <div className = 'w-full flex'>
            <div className={"w-[70%] m-5"}>
                <AllHabitsTop/>
                <HabitsContainer/>
                <HabitsCompleted/>
            </div>
            <AllHabitsRight/>
        </div>
    )
}
