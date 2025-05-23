import {AllHabitsRight} from "./Pages/AllHabits/Components/AllHabitsRight";
import {AllHabitsTop} from "./Pages/AllHabits/Components/AllHabitsTop";
import HabitsContainer from "./Pages/AllHabits/Components/HabitsContainer";
import HabitsCompleted from "./Pages/AllHabits/Components/HabitsCompleted";
import HabitWindow from "./Pages/AllHabits/Components/HabitWindow";
import { Toaster } from "react-hot-toast";
import AreasContainer from "./Pages/AllHabits/Components/AreasContainer";
import DropDown from "../app/utils/DropDown";
import ConfirmationComponent from "../app/utils/ConfirmationComponent";


export default function AllHabits() {
    return (
        <div className = 'max-lg:flex-col w-full flex flex-row gap-0'>
            <Toaster/>
            <HabitWindow/>
            <DropDown/>
            <ConfirmationComponent/>
            <div className={"flex-col flex-grow m-4"}>
                <AllHabitsTop/>
                <AreasContainer/>
                <HabitsContainer/>
                <HabitsCompleted/>
            </div>
            <AllHabitsRight/>
        </div>
    )
}
