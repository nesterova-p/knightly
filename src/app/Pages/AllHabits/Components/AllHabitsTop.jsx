import AllHabitsSearch from '../../AllHabits/Components/AllHabitsSearch';
import LogoAndName from "../../../Landing/LogoAndName";

export function AllHabitsTop() {
    return (
        <div className={"bg-white p-5 rounded-md flex justify-between"}>
            <LogoAndName />
            <div className={"flex justify-end"}>
                <AllHabitsSearch/>
            </div>
        </div>
    )
}