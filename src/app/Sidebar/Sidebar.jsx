import MenuSelection from "./MenuSelection";
import LogOut from "./LogOut";
import UserProfile from "../Pages/AllHabits/Components/SecondSideBar/UserProfile";
import LevelProgress from "../Sidebar/LevelProgress";
import {useGlobalContextProvider} from "../contextApi";
import {useRef, useEffect} from "react";

export default function Sidebar() {
    const {
        openSideBarObject,
        userXPObject
    } = useGlobalContextProvider();

    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const { userXP, userLevel, isXPLoading, xpError } = userXPObject;
    const sideBarRef = useRef();

    useEffect(() => {
        function handleOutsideClicked(event) {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setOpenSideBar(false);
            }
        }

        document.addEventListener("click", handleOutsideClicked);
        return () => {
            document.removeEventListener("click", handleOutsideClicked);
        };
    }, [openSideBar]);

    return (
        <div
            ref={sideBarRef}
            className={`${!openSideBar ? "max-xl:hidden" : "fixed shadow-lg"} flex-grow p-10 flex flex-col bg-white min-h-screen z-50`}>
            <UserProfile/>

            <div className="mt-4 mb-6">
                {isXPLoading ? (
                    <div className="bg-slate-50 rounded-xl p-4 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded mb-2"></div>
                        <div className="h-2 bg-gray-300 rounded"></div>
                    </div>
                ) : xpError ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                        <p className="text-red-600 text-sm">Unable to load progress</p>
                        <p className="text-xs text-red-500 mt-1">Level data will update soon</p>
                    </div>
                ) : (
                    <LevelProgress totalXP={userXP} />
                )}
            </div>

            <MenuSelection />
            <LogOut/>
        </div>
    );
}