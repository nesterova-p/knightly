import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useGlobalContextProvider} from "../../../contextApi";

export default function DarkMode() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode, setDarkMode } = darkModeObject || { isDarkMode: false, setDarkMode: () => {} };

    const [darkModeItems, setDarkModeItems] = useState([
        { id: 1, icon: faSun, isSelected: true },
        { id: 2, icon: faMoon, isSelected: false },
    ]);

    function handleClickedItem(singleItemIndex) {
        const updatedDarkModeItems = darkModeItems.map((darkModeItem, index) => {
            if (singleItemIndex === index) {
                return { ...darkModeItem, isSelected: true };
            }
            return { ...darkModeItem, isSelected: false };
        });

        setDarkModeItems(updatedDarkModeItems);
    }

    useEffect(() => {
        const selectedItem = darkModeItems.find(item => item.isSelected);

        if (selectedItem) {
            setDarkMode(selectedItem.id === 2);
        }
    }, [darkModeItems, setDarkMode]);


    useEffect(() => {
        console.log('isDarkMode changed to:', isDarkMode);
    }, [isDarkMode]);

    return(
        <div className="bg-slate-50 w-[100px] h-[42px] relative rounded-3xl flex items-center px-1">
            {darkModeItems.map((singleItem, singleItemIndex) => (
                <div
                    key={singleItemIndex}
                    onClick={() => handleClickedItem(singleItemIndex)}
                    className="h-full w-[50px] z-40 flex justify-center items-center"
                >
                    <FontAwesomeIcon
                        className={`${
                            singleItem.isSelected ? "text-primary" : "text-gray-300"
                        } cursor-pointer`}
                        icon={singleItem.icon}
                        width={18}
                        height={18}
                    />
                </div>
            ))}
            <div
                className={`w-[42px] absolute h-[36px] top-[3px] transform ${
                    isDarkMode ? "translate-x-[48px]" : "translate-x-1"
                } rounded-full bg-white shadow-sm transition-all`}
            ></div>
        </div>
    )
}