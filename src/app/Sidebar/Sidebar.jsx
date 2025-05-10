import MenuSelection from "./MenuSelection";
import LogOut from "./LogOut";
import UserProfile from "../Pages/AllHabits/Components/SecondSideBar/UserProfile";
import {useGlobalContextProvider} from "../contextApi";
import {useRef, useEffect} from "react";

export default function Sidebar() {
    const { openSideBarObject } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = openSideBarObject;
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
            <MenuSelection />
            <LogOut/>
        </div>
    );
}