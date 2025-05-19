import {AllHabitsRight} from "./Pages/AllHabits/Components/AllHabitsRight";
import {AllHabitsTop} from "./Pages/AllHabits/Components/AllHabitsTop";
import HabitsContainer from "./Pages/AllHabits/Components/HabitsContainer";
import HabitsCompleted from "./Pages/AllHabits/Components/HabitsCompleted";
import HabitWindow from "./Pages/AllHabits/Components/HabitWindow";
import { Toaster } from "react-hot-toast";

export default function AllHabits() {
    return (
        <div className = 'max-lg:flex-col w-full flex flex-row gap-0'>
            <Toaster/>
            <HabitWindow/>
            <div className={"flex-col flex-grow m-4"}>
                <AllHabitsTop/>
                <HabitsContainer/>
                <HabitsCompleted/>
            </div>
            <AllHabitsRight/>
        </div>
    )
}
