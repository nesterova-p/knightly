import LogoAndName from "../../Landing/LogoAndName";
import MenuSelection from "./MenuSelection";
import LogOut from "./LogOut";

export default function Sidebar(){
    return (
        <div className="flex-grow p-10 flex flex-col border bg-white min-h-screen">
            <LogoAndName />
            <MenuSelection />
            <LogOut/>
        </div>
    )
}