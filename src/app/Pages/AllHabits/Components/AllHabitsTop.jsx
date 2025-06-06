import AllHabitsSearch from '../../AllHabits/Components/AllHabitsSearch';
import LogoAndName from "../../../Landing/LogoAndName";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {UserButton} from "@clerk/nextjs";
import {useGlobalContextProvider} from "../../../contextApi";
import {useEffect, useState} from "react";

export function AllHabitsTop() {
    const userButtonAppearance = {
        elements: {
            userButtonAvatar: "w-8 h-8 sm:w-10 sm:h-10",
            userButtonPopover: 'text-primary',
        }
    }

    const [windowWidth, setWindowWidth] = useState(0);

    const {openSideBarObject} = useGlobalContextProvider();
    const {openSideBar, setOpenSideBar} = openSideBarObject || {};

    function openSideBarFunction() {
        setOpenSideBar(!openSideBar);
    }

    useEffect(() => {
        function handleSizeChange(){
            setOpenSideBar(false);
            setWindowWidth(window.innerWidth);
        }

        // Set initial width
        setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleSizeChange);

        return () => {
            window.removeEventListener("resize", handleSizeChange);
        }
    }, [setOpenSideBar]);

    const getResponsiveStyles = () => {
        if (windowWidth < 480) {

            return {
                backgroundSize: '450px 70px',
                padding: '15px 25px',
                minHeight: '70px'
            };
        } else if (windowWidth < 768) {
            return {
                backgroundSize: '800px 85px',
                padding: '18px 50px 18px 50px',
                minHeight: '85px'
            };
        } else if (windowWidth < 1024) {
            return {
                backgroundSize: '1000px 95px',
                padding: '20px 80px 20px 80px',
                minHeight: '95px'
            };
        } else {
            return {
                backgroundSize: '840px 100px',
                padding: '20px 90px 20px 40px',
                minHeight: '100px'
            };
        }
    };

    const responsiveStyles = getResponsiveStyles();

    return (
        <div
            className={" flex justify-between items-center flex-wrap gap-2 wooden-top-bar pixel-element"}
            style={{
                backgroundImage: `url('/wooden-bar2.png')`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
                ...responsiveStyles
            }}
        >
            <div className={"flex items-center gap-1 flex-shrink-0"}>
                <div className={"max-lg:flex hidden"}>
                    <UserButton appearance={userButtonAppearance}/>
                </div>
                <div className="hidden sm:block ml-2 sm:ml-10">
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
                    className={"max-xl:flex hidden cursor-pointer text-lg text-white"}
                />
            </div>
        </div>
    )
}