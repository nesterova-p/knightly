import MenuSelection from "./MenuSelection";
import LogOut from "./LogOut";
import UserProfile from "../Pages/AllHabits/Components/SecondSideBar/UserProfile";

export default function Sidebar(){
    return (
        <div className="flex-grow p-10 flex flex-col border bg-white min-h-screen">
            <UserProfile/>
            <MenuSelection />
            <LogOut/>
        </div>
    )
}