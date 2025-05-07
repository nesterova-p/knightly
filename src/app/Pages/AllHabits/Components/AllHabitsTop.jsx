import AllHabitsSearch from '../../AllHabits/Components/AllHabitsSearch';
import DarkMode from "../../AllHabits/Components/DarkMode";

export function AllHabitsTop() {
    return (
        <div className={"bg-white p-5 rounded-md flex justify-between"}>
            <div className={"flex flex-col"}>
                <span className={"text-xl"}>
                    <span className={"font-bold"}>Hi</span>
                    <span className={"font-light"}>, Polinka</span>
                </span>
                <span className={"font-light text-[12px] text-gray-400"}>welcome back!</span>
            </div>
        <div className={"w-[50%] flex gap-3 justify-between"}>
            <AllHabitsSearch/>
            <DarkMode/>
        </div>

        </div>
    )
}

