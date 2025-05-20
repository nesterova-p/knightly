import { useGlobalContextProvider } from "../../../../contextApi";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { textToIcon } from "../../Components/IconWindow/IconData";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export default function HabitsContainerMiddle() {
    const { allHabitObject } = useGlobalContextProvider();
    const { allHabits } = allHabitObject;

    const nonEmptyHabits = allHabits.filter(habit => habit.name.trim() !== "");

    return (
        <div className="p-3">
            {nonEmptyHabits.length > 0 ? (
                nonEmptyHabits.map((singleHabit, singleHabitIndex) => (
                    <div key={singleHabitIndex}>
                        <HabitCard singleHabit={singleHabit} />
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-500 py-4">
                    No habits added yet. Click "New Adventure" to create one.
                </div>
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
            {/* The rounded checkbox */}
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