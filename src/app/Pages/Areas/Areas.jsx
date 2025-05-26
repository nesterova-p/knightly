import AreasTopBar from "./Components/AreasTopBar";
import AreasContainer from "./Components/AreasContainer";
import AreaWindow from "./Components/AreaWindow";
import { Toaster } from "react-hot-toast";

export default function Areas() {
    return (
        <div className="w-full h-screen p-3 overflow-y-auto">
            <Toaster/>
            <AreaWindow/>
            <AreasTopBar/>
            <AreasContainer/>
        </div>
    )
}