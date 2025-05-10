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
            userButtonAvatar: "w-10 h-10",
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
                    onClick={openSideBarFunction}
                    className={"max-xl:flex hidden cursor-pointer"}
                />
            </div>
        </div>
    )
}