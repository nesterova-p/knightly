import MenuSelection from "./MenuSelection";
import LogOut from "./LogOut";
import UserProfile from "../Pages/AllHabits/Components/SecondSideBar/UserProfile";
import {useGlobalContextProvider} from "../contextApi";

export default function Sidebar(){
    const {openSideBarObject} = useGlobalContextProvider();
    const {openSideBar, setOpenSideBar} = openSideBarObject || {};

    return (
        <div
            className={`${!openSideBar ? "max-xl:hidden" : "fixed shadow-lg"} flex-grow p-10 flex flex-col bg-white min-h-screen z-50`}>
            <UserProfile/>
            <MenuSelection />
            <LogOut/>
        </div>
    )
}