import AllHabitsSearch from '../../AllHabits/Components/AllHabitsSearch';
import LogoAndName from "../../../Landing/LogoAndName";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {UserButton} from "@clerk/nextjs";
import {useGlobalContextProvider} from "../../../contextApi";
import {useEffect} from "react";

export function AllHabitsTop() {
    const userButtonAppearance = {
        elements: {
            userButtonAvatar: "w-8 h-8 sm:w-10 sm:h-10",
            userButtonPopover: 'text-primary',
        }
    }

    const {openSideBarObject} = useGlobalContextProvider();
    const {openSideBar, setOpenSideBar} = openSideBarObject || {};

    function openSideBarFunction() {
        setOpenSideBar(!openSideBar);
    }

    useEffect(() => {
        function handleSizeChange(){
            setOpenSideBar(false);
        }

        window.addEventListener("resize", handleSizeChange)

        return () => {
            window.removeEventListener("resize", handleSizeChange)
        }
    }, [setOpenSideBar]);

    return (
        <div className={"bg-white p-3 sm:p-5 rounded-md flex justify-between items-center flex-wrap gap-2"}>
            <div className={"flex items-center gap-1 flex-shrink-0"}>
                <div className={"max-lg:flex hidden"}>
                    <UserButton appearance={userButtonAppearance}/>
                </div>
                <div className="hidden sm:block">
                    <LogoAndName />
                </div>
            </div>

            <div className={"flex items-center gap-2 flex-1 sm:flex-initial justify-end"}>
                <div className="w-full sm:w-auto max-w-xs">
                    <AllHabitsSearch/>
                </div>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={openSideBarFunction}
                    className={"max-xl:flex hidden cursor-pointer text-lg"}
                />
            </div>
        </div>
    )
}