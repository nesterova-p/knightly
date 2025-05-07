import LogoAndName from "../Landing/LogoAndName";
import MenuSelection from "../Sidebar/MenuSelection";
import LogOut from "../Sidebar/LogOut";

export default function Sidebar(){
    return (
        <div className="border-r-2 h-screen p-10 flex flex-col gap-20">
            <LogoAndName />
            <MenuSelection />
            <LogOut/>
        </div>
    )
}