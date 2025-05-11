import React, { useState, useRef, useEffect } from "react";
import { useGlobalContextProvider } from "../../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function TimePicker() {
    const { openTimePickerObject, habitWindowObject } = useGlobalContextProvider();
    const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;
    const { setHabitItem } = habitWindowObject;

    const [hours, setHours] = useState("08");
    const [minutes, setMinutes] = useState("00");
    const [period, setPeriod] = useState("AM");

    // Refs for input
    const hoursRef = useRef(null);
    const minutesRef = useRef(null);

    // Focus states
    const [hoursActive, setHoursActive] = useState(true);
    const [minutesActive, setMinutesActive] = useState(false);

    // handle input change
    const handleHoursChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 12 && value.length <= 2)) {
            setHours(value);
        }
    };

    const handleMinutesChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59 && value.length <= 2)) {
            setMinutes(value);
        }
    };

    const handleHoursBlur = () => {
        let formattedHours = hours;
        if (formattedHours === '') {
            formattedHours = '12';
        } else if (parseInt(formattedHours) === 0) {
            formattedHours = '12';
        } else if (formattedHours.length === 1) {
            formattedHours = '0' + formattedHours;
        }
        setHours(formattedHours);
    };

    const handleMinutesBlur = () => {
        let formattedMinutes = minutes;
        if (formattedMinutes === '') {
            formattedMinutes = '00';
        } else if (formattedMinutes.length === 1) {
            formattedMinutes = '0' + formattedMinutes;
        }
        setMinutes(formattedMinutes);
    };


    const handleSave = () => {
        const timeString = `${hours}:${minutes} ${period}`;
        console.log('Selected time:', timeString);

        setHabitItem(prev => ({
            ...prev,
            reminderTime: timeString,
            hasReminder: true
        }));

        setOpenTimePickerWindow(false);
    };

    useEffect(() => {
        if (openTimePickerWindow && hoursRef.current) {
            setTimeout(() => {
                hoursRef.current.focus();
            }, 100);
        }
    }, [openTimePickerWindow]);

    // Set current time when opened
    useEffect(() => {
        if (openTimePickerWindow) {
            const now = new Date();
            let currentHour = now.getHours();
            const currentMinutes = now.getMinutes().toString().padStart(2, '0');
            const currentPeriod = currentHour >= 12 ? 'PM' : 'AM';

            currentHour = currentHour % 12;
            currentHour = currentHour ? currentHour : 12;

            setHours(currentHour.toString().padStart(2, '0'));
            setMinutes(currentMinutes);
            setPeriod(currentPeriod);
        }
    }, [openTimePickerWindow]);

    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] max-w-md z-50 bg-white rounded-lg shadow-xl ${openTimePickerWindow ? "block" : "hidden"}`}>
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Select Time</h3>
                    <FontAwesomeIcon
                        icon={faClose}
                        className="text-gray-400 cursor-pointer hover:text-gray-600"
                        width={16}
                        height={16}
                        onClick={() => setOpenTimePickerWindow(false)}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="flex items-center justify-center gap-2 flex-1">
                        <div className="relative">
                            <input
                                ref={hoursRef}
                                type="text"
                                value={hours}
                                onChange={handleHoursChange}
                                onBlur={handleHoursBlur}
                                onFocus={() => {
                                    setHoursActive(true);
                                    setMinutesActive(false);
                                }}
                                className={`w-[80px] h-[70px] text-3xl text-center rounded-md outline-none transition-colors duration-200 ${
                                    hoursActive ? "bg-primary bg-opacity-10 text-primary" : "bg-gray-100 text-gray-700"
                                }`}
                                maxLength={2}
                            />
                        </div>

                        <div className="text-2xl font-bold mx-1">:</div>

                        <div className="relative">
                            <input
                                ref={minutesRef}
                                type="text"
                                value={minutes}
                                onChange={handleMinutesChange}
                                onBlur={handleMinutesBlur}
                                onFocus={() => {
                                    setHoursActive(false);
                                    setMinutesActive(true);
                                }}
                                className={`w-[80px] h-[70px] text-3xl text-center rounded-md outline-none transition-colors duration-200 ${
                                    minutesActive ? "bg-primary bg-opacity-10 text-primary" : "bg-gray-100 text-gray-700"
                                }`}
                                maxLength={2}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-3 ml-4">
                        <button
                            onClick={() => setPeriod("AM")}
                            className={`w-[70px] h-[34px] text-lg rounded-md font-medium transition-colors duration-200 ${
                                period === "AM"
                                    ? "bg-primary bg-opacity-10 text-primary"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            AM
                        </button>
                        <button
                            onClick={() => setPeriod("PM")}
                            className={`w-[70px] h-[34px] text-lg rounded-md font-medium transition-colors duration-200 ${
                                period === "PM"
                                    ? "bg-primary bg-opacity-10 text-primary"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            PM
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                    Save
                </button>
            </div>
        </div>
    );
}