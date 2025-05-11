import React from "react";
import {useGlobalContextProvider} from "../../../../contextApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "./ToggleSwitch";

export default function Reminder() {
    const { openTimePickerObject, habitWindowObject } = useGlobalContextProvider();
    const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;
    const { habitItem, setHabitItem } = habitWindowObject;

    const isOn = habitItem?.hasReminder || false;

    const defaultTime = "08:00 AM";

    function updateToggle() {
        const newIsOn = !isOn;

        setHabitItem(prev => ({
            ...prev,
            hasReminder: newIsOn,
            reminderTime: newIsOn ? (prev.reminderTime || defaultTime) : defaultTime
        }));
    }

    function openTimePicker() {
        setOpenTimePickerWindow(true);
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
                    <div
                        className="flex gap-2 items-center justify-center cursor-pointer select-none"
                        onClick={openTimePicker}
                    >
                        <span>{habitItem?.reminderTime || defaultTime}</span>
                        <FontAwesomeIcon height={12} width={12} icon={faChevronDown} />
                    </div>
                </div>
            )}
        </div>
    );
}