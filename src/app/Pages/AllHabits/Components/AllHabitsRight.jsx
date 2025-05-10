import UserProfile from "../../AllHabits/Components/SecondSideBar/UserProfile";
import MainStats from "../../AllHabits/Components/SecondSideBar/MainStats";
import Calendar from "../../AllHabits/Components/SecondSideBar/Calendar";

export function AllHabitsRight() {
    return (
        <div className={"w-[30%] bg-white flex flex-col items-center-center m-5 rounded-lg p-2"}>
            <UserProfile/>
            <MainStats/>
            <Calendar/>
        </div>
    )
}

