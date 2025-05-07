import {AllHabitsRight} from "../../Pages/AllHabits/Components/AllHabitsRight";
import {AllHabitsTop} from "../../Pages/AllHabits/Components/AllHabitsTop";

export default function AllHabits() {
    return (
        <div className = 'w-full flex'>
            <div className={"w-[80%] m-5"}>
                <AllHabitsTop/>
            </div>
            <AllHabitsRight/>
        </div>
    )
}
