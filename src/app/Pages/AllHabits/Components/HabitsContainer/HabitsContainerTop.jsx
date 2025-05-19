import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../../contextApi";
import { useState, useEffect } from "react";
import { getDateString, getCurrentDayName, getFormattedDate } from "../../../../utils/dateFormating";

export default function HabitsContainerTop() {
    const { habitWindowObject, selectedCurrentDayObject, offsetDayObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;
    const { selectedCurrentDay, setSelectedCurrentDay } = selectedCurrentDayObject;
    const { offsetDay, setOffsetDay } = offsetDayObject;

    function updateDate(option) {
        if (option === "next") {
            setOffsetDay((prev) => prev + 1);
        }

        if (option === "prev") {
            setOffsetDay((prev) => prev - 1);
        }
    }

    useEffect(() => {
        console.log(offsetDay);
        setSelectedCurrentDay(getDateString(new Date(), offsetDay));
    }, [offsetDay, setSelectedCurrentDay]);

    console.log(selectedCurrentDay);

    const handleOpenHabitWindow = () => {
        setOpenHabitWindow(true);
    };

    return (
        <div className="p-3 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div>
                    <h2 className="font-bold text-lg w-28">{getCurrentDayName(selectedCurrentDay)}</h2>
                    <span className="font-light text-[12px]">{getFormattedDate(selectedCurrentDay)}</span>
                </div>

                <div className="flex gap-1 ml-4">
                    <div
                        onClick={() => updateDate("prev")}
                        className="text-primary cursor-pointer"
                    >
                        <ArrowCircleLeftOutlinedIcon />
                    </div>

                    <div
                        onClick={() => updateDate("next")}
                        className="text-primary cursor-pointer"
                    >
                        <ArrowCircleRightOutlinedIcon />
                    </div>
                </div>
            </div>

            <button
                onClick={handleOpenHabitWindow}
                className="flex gap-2 items-center bg-primary p-3 text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
                <FontAwesomeIcon icon={faPlus} />
                <span>New Adventure</span>
            </button>
        </div>
    )
}