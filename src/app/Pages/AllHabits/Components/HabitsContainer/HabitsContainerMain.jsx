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
import { v4 as uuidv4 } from 'uuid';

export default function HabitsContainerMain() {
    const {
        allHabitObject,
        selectedCurrentDayObject,
        selectedAreaStringObject
    } = useGlobalContextProvider();

    const { allHabits, setAllHabits } = allHabitObject;
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

    }, [selectedCurrentDay, allHabits, selectedAreaString]);

    const nonEmptyHabits = allFilteredHabits.filter(habit => habit && habit.name && habit.name.trim() !== "");

    return (
        <div className="p-3">
            {nonEmptyHabits.length > 0 ? (
                nonEmptyHabits.map((singleHabit, singleHabitIndex) => (
                    <div key={singleHabitIndex}>
                        <HabitCard
                            singleHabit={singleHabit}
                            selectedCurrentDay={selectedCurrentDay}
                            allHabits={allHabits}
                            setAllHabits={setAllHabits}
                        />
                    </div>
                ))
            ) : (
                <EmptyPlaceHolder/>
            )}
        </div>
    );
}

function HabitCard({ singleHabit, selectedCurrentDay, allHabits, setAllHabits }) {
    console.log("Habit:", singleHabit.name);
    console.log("CompletedDays:", singleHabit.completedDays);
    console.log("Selected day:", selectedCurrentDay);

    const iconObject = singleHabit.icon ?
        (typeof singleHabit.icon === 'string' ? textToIcon(singleHabit.icon) : singleHabit.icon)
        : faCode;

    const isChecked = Boolean(
        singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        )
    );

    console.log("Is checked:", isChecked);


    function handleCheckboxChange(event) {
        const checked = event.target.checked;
        console.log("Adding completed day:", selectedCurrentDay);
        if (checked) {
            checkHabit();
        } else {
            uncheckHabit();
        }
    }

    function checkHabit() {
        const completedDay = {
            _id: uuidv4(),
            date: selectedCurrentDay,
        };
        console.log("Removing completed day:", selectedCurrentDay);

        const updatedHabits = allHabits.map((habit) => {
            if (habit._id === singleHabit._id) {
                const currentCompletedDays = habit.completedDays || [];
                const isAlreadyCompleted = currentCompletedDays.some(
                    (day) => day.date === selectedCurrentDay
                );

                if (!isAlreadyCompleted) {
                    return {
                        ...habit,
                        completedDays: [...currentCompletedDays, completedDay],
                    };
                }
                return habit;
            }
            return habit;
        });

        setAllHabits(updatedHabits);
    }

    function uncheckHabit() {
        const updatedHabits = allHabits.map((habit) => {
            if (habit._id === singleHabit._id) {
                const updatedCompletedDays = habit.completedDays ?
                    habit.completedDays.filter((day) => day.date !== selectedCurrentDay) : [];

                return {
                    ...habit,
                    completedDays: updatedCompletedDays,
                };
            }
            return habit;
        });

        setAllHabits(updatedHabits);
    }

    return (
        <div className="flex p-3 items-center justify-between">
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked={isChecked}
                onChange={handleCheckboxChange}
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