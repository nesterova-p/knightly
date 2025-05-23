import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {iconToText, textToIcon} from "../../AllHabits/Components/IconWindow/IconData";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";
import { v4 as uuidv4 } from 'uuid';

export function SingleHabitCard({ singleHabit }) {
    const {
        allHabitObject,
        selectedCurrentDayObject,
        openDropDownObject,
        dropDownPositionsObject
    } = useGlobalContextProvider();

    const { allHabits, setAllHabits } = allHabitObject;
    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { setOpenDropDown } = openDropDownObject;
    const { setDropDownPositions } = dropDownPositionsObject;


    const iconObject = singleHabit.icon ?
        (typeof singleHabit.icon === 'string' ? textToIcon(singleHabit.icon) : singleHabit.icon)
        : faCode;

    const isChecked = Boolean(
        singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        )
    );

    function handleCheckboxChange(event) {
        const checked = event.target.checked;

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

    function handleClickThreeDots(event) {
        const target = event.target;
        const rect = target.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        setDropDownPositions({ top, left });

        event.stopPropagation();
        setOpenDropDown(true);
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

            <div className="bg-slate-50 flex justify-between gap-2 w-full p-3 py-4 rounded-xl">
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
                    <button
                        className="focus:outline-none"
                        onClick={handleClickThreeDots}
                    >
                        <MoreVertIcon sx={{ color: "gray" }} />
                    </button>
                </div>
            </div>
        </div>
    );
}