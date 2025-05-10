import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

export default function DarkMode() {
    return(
        <div className="bg-slate-50 w-[100px] h-[42px] relative rounded-3xl flex items-center px-1">
            <div className="h-full w-[50px] z-40 flex justify-center items-center">
                <FontAwesomeIcon
                    className="text-primary"
                    icon={faSun}
                    width={18}
                    height={18}
                />
            </div>
            <div className="h-full w-[50px] z-40 opacity-100 flex justify-center items-center">
                <FontAwesomeIcon
                    className="text-gray-300"
                    icon={faMoon}
                    width={18}
                    height={18}
                />
            </div>
            <div className="w-[42px] absolute h-[36px] top-[3px] left-[4px] rounded-full bg-white shadow-sm"></div>
        </div>
    )
}