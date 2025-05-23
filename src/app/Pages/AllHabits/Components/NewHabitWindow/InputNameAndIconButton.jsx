import React, {useEffect, useRef} from "react";
import {useGlobalContextProvider} from "../../../../contextApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIcons} from "@fortawesome/free-solid-svg-icons";
import {textToIcon} from "../IconWindow/IconData";

export default function InputNameAndIconButton({ onUpdateHabitName, habitName, selectedIcon, setOpenIconWindow }) {
    const inputRef = useRef(null);
    const { habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;

    function updateInputHabit(event) {
        onUpdateHabitName(event.target.value);
    }

    useEffect(() => {
        if (openHabitWindow) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
        } else {
            onUpdateHabitName("");
        }
    }, [openHabitWindow]);

    const iconObject = selectedIcon ?
        (typeof selectedIcon === 'string' ? textToIcon(selectedIcon) : selectedIcon)
        : faIcons;

    return (
        <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Adventure Name</div>
            <div className="flex items-center">
                <input
                    ref={inputRef}
                    value={habitName}
                    onChange={(event) => updateInputHabit(event)}
                    className="flex-grow py-3 px-4 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Type a name for an adventure..."
                />
                <button
                    className="ml-2 p-3 bg-primary text-white rounded-md hover:bg-primary transition-colors"
                    onClick={() => setOpenIconWindow(true)}
                >
                    <FontAwesomeIcon
                        icon={iconObject}
                        width={16}
                        height={16}
                    />
                </button>
            </div>
        </div>
    );
}