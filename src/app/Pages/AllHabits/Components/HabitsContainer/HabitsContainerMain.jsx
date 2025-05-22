import { useGlobalContextProvider } from "../../../../contextApi";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { textToIcon } from "../../Components/IconWindow/IconData";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import EmptyPlaceHolder from "../../../AllHabits/Components/EmptyPlaceHolder";

export default function HabitsContainerMain() {
    const {
        allHabitObject,
        selectedCurrentDayObject,
        selectedAreaStringObject
    } = useGlobalContextProvider();

    const { allHabits } = allHabitObject;
    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { selectedAreaString } = selectedAreaStringObject;

    const [allFilteredHabits, setAllFilteredHabits] = useState([]);

    useEffect(() => {
        const currentDate = new Date(selectedCurrentDay);
        const currentDayIndex = currentDate.getDay();
        const dayId = currentDayIndex === 0 ? 7 : currentDayIndex;

        console.log("Current day index:", dayId, "Selected area:", selectedAreaString);


        const filteredHabitsByFrequency = allHabits.filter((singleHabit) => {
            if (!singleHabit.frequency || !singleHabit.frequency[0] || !singleHabit.frequency[0].days) {
                return false;
            }
            return singleHabit.frequency[0].days.some(
                (day) => day.id === dayId && day.isSelected
            );
        });

        console.log("Habits filtered by frequency:", filteredHabitsByFrequency);

        let filteredHabitsByArea = [];
        if (selectedAreaString !== "All") {
            filteredHabitsByArea = filteredHabitsByFrequency.filter((habit) => {
                if (!habit.areas) return false;
                return habit.areas.some((area) => area.name === selectedAreaString);
            });
        } else {
            filteredHabitsByArea = filteredHabitsByFrequency;
        }

        setAllFilteredHabits(filteredHabitsByArea);
        console.log("Final filtered habits:", filteredHabitsByArea);

    }, [selectedCurrentDay, allHabits, selectedAreaString]);

    const nonEmptyHabits = allFilteredHabits.filter(habit => habit && habit.name && habit.name.trim() !== "");

    return (
        <div className="p-3">
            {nonEmptyHabits.length > 0 ? (
                nonEmptyHabits.map((singleHabit, singleHabitIndex) => (
                    <div key={singleHabitIndex}>
                        <HabitCard singleHabit={singleHabit} />
                    </div>
                ))
            ) : (
                <EmptyPlaceHolder/>
            )}
        </div>
    );
}

function HabitCard({ singleHabit }) {
    const iconObject = singleHabit.icon ?
        (typeof singleHabit.icon === 'string' ? textToIcon(singleHabit.icon) : singleHabit.icon)
        : faCode;

    return (
        <div className="flex p-3 items-center justify-between">
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                    color: "#9EC77D",
                    "&.Mui-checked": {
                        color: "#9EC77D",
                    },
                }}
            />

            <div
                className="bg-slate-50 flex justify-between gap-2 w-full p-3 py-4 rounded-xl"
            >
                <div className="w-full">
                    {/* Divs for the icon and the name */}
                    <div className="flex gap-2 justify-between">
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon
                                className="p-3 rounded-full w-4 h-4 bg-primary text-white"
                                height={20}
                                width={20}
                                icon={iconObject}
                            />
                            <span className="">{singleHabit.name}</span>
                        </div>
                    </div>
                    {/* Divs for the areas */}
                    <div className="flex gap-2 mt-3">
                        {singleHabit.areas && singleHabit.areas.map((singleArea, index) => (
                            <div
                                key={index}
                                className="p-1 text-[12px] rounded-md px-2 bg-primary text-white"
                            >
                                <span>{singleArea.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-10 flex items-center justify-center">
                    <button className="focus:outline-none">
                        <MoreVertIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}