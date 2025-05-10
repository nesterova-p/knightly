import UserProfile from "../../AllHabits/Components/SecondSideBar/UserProfile";
import MainStats from "../../AllHabits/Components/SecondSideBar/MainStats";
import Calendar from "../../AllHabits/Components/SecondSideBar/Calendar";
import DarkMode from "../../AllHabits/Components/DarkMode";

export function AllHabitsRight() {
    return (
        <div className={"w-[30%] bg-white flex flex-col items-center-center m-5 rounded-lg p-2"}>
            <div className="px-4 mb-4">
                <div className={"flex flex-col mb-3 mt-2"}>
                    <span className={"text-xl"}>
                        <span className={"font-bold"}>Hi</span>
                        <span className={"font-light"}>, Polinka</span>
                    </span>
                    <span className={"font-light text-[12px] text-gray-400"}>welcome back!</span>
                </div>
                <DarkMode/>
            </div>

            <MainStats/>
            <Calendar/>
        </div>
    )
}

