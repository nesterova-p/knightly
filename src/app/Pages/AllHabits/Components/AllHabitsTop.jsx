import AllHabitsSearch from '../../AllHabits/Components/AllHabitsSearch';
import LogoAndName from "../../../Landing/LogoAndName";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {UserButton} from "@clerk/nextjs";

export function AllHabitsTop() {
    const userButtonAppearance = {
        elements: {
            userButtonAvatar: "w-10 h-10",
            userButtonPopover: 'text-primary',
        }
    }

    return (
        <div className={"bg-white p-5 rounded-md flex justify-between items-center"}>
            <div className={"flex items-center gap-1"}>
                <div className={"max-lg:flex hidden"}>
                    <UserButton appearance={userButtonAppearance}/>
                </div>
                <LogoAndName />
            </div>

            <div className={"flex items-center gap-2 ml-2"}>
                <AllHabitsSearch/>
                <FontAwesomeIcon
                    icon={faBars}
                    className={"max-xl:flex hidden cursor-pointer"}
                />
            </div>
        </div>
    )
}