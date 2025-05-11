import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "./ToggleSwitch";

export default function Reminder() {
    const [isOn, setIsOn] = useState(false);

    function updateToggle() {
        setIsOn(!isOn);
    }

    return (
        <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 mb-2">Daily Notification</span>
                <ToggleSwitch isOn={isOn} updateToggle={updateToggle} />
            </div>

            {isOn && (
                <div className="flex justify-between p-4 m-2 mt-4 rounded-md bg-gray-50">
                    <span>Select Time</span>
                    <div className="flex gap-2 items-center justify-center cursor-pointer select-none">
                        <span>08:00 AM</span>
                        <FontAwesomeIcon height={12} width={12} icon={faChevronDown} />
                    </div>
                </div>
            )}
        </div>
    );
}
