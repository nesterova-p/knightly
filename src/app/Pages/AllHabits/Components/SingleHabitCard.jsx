import { Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {iconToText, textToIcon} from "../../AllHabits/Components/IconWindow/IconData";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";
import { toggleHabitCompletion } from "../../../utils/updateCompletedDays";
import { v4 as uuidv4 } from 'uuid';
import { DifficultyDiamonds, getXPForDifficulty, getDifficultyColor } from "../../../utils/xpLevelUtils";

export function SingleHabitCard({ singleHabit }) {
    const {
        allHabitObject,
        selectedCurrentDayObject,
        openDropDownObject,
        dropDownPositionsObject,
        selectedItemsObject,
        searchHabitsObject,
        userXPObject
    } = useGlobalContextProvider();

    const { allHabits, setAllHabits } = allHabitObject;
    const { selectedCurrentDay } = selectedCurrentDayObject;
    const { setOpenDropDown } = openDropDownObject;
    const { setDropDownPositions } = dropDownPositionsObject;
    const { setSelectedItems } = selectedItemsObject;
    const { searchQuery } = searchHabitsObject;

    const iconObject = singleHabit.icon ?
        (typeof singleHabit.icon === 'string' ? textToIcon(singleHabit.icon) : singleHabit.icon)
        : faCode;

    const isChecked = Boolean(
        singleHabit.completedDays && singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDay
        )
    );

    const difficulty = singleHabit.difficulty || 'Easy';
    const xpValue = getXPForDifficulty(difficulty);
    const difficultyColor = getDifficultyColor(difficulty);

    async function handleCheckboxChange(event) {
        const checked = event.target.checked;

        const success = await toggleHabitCompletion({
            habit: singleHabit,
            selectedCurrentDay,
            isChecked: checked,
            allHabits,
            setAllHabits,
            userXPObject
        });

        if (!success) {
            event.target.checked = !checked;
        }
    }

    function handleClickThreeDots(event) {
        const target = event.target;
        const rect = target.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        setDropDownPositions({ top, left });
        console.log(singleHabit);
        setSelectedItems(singleHabit);

        event.stopPropagation();
        setOpenDropDown(true);
    }

    const highlightSearchText = (text, search) => {
        if (!search.trim()) {
            return text;
        }

        const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="bg-pink-300 px-1 rounded">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div className="flex p-2 sm:p-3 items-center justify-between">
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
                    padding: { xs: '4px', sm: '9px' },
                    '& .MuiSvgIcon-root': {
                        fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }
                }}
            />

            <div className="bg-slate-50 flex justify-between gap-2 w-full p-2 sm:p-3 py-3 sm:py-4 rounded-xl">
                <div className="w-full min-w-0">
                    <div className="flex gap-2 justify-between items-start">
                        <div className="flex gap-2 items-center min-w-0 flex-1">
                            <FontAwesomeIcon
                                className="p-2 sm:p-3 rounded-full w-3 h-3 sm:w-4 sm:h-4 bg-primary text-white flex-shrink-0"
                                height={16}
                                width={16}
                                icon={iconObject}
                            />
                            <div className="min-w-0 flex-1">
                                <span className="text-sm sm:text-base truncate block">
                                    {highlightSearchText(singleHabit.name, searchQuery)}
                                </span>
                                <div className="flex items-center gap-2 mt-1">
                                    <DifficultyDiamonds difficulty={difficulty} size="sm" />
                                    <span
                                        className="text-xs font-medium px-1.5 py-0.5 rounded"
                                        style={{
                                            backgroundColor: `${difficultyColor}20`,
                                            color: difficultyColor
                                        }}
                                    >
                                        +{xpValue} XP
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {difficulty}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3 flex-wrap">
                        {singleHabit.areas && singleHabit.areas.map((singleArea, index) => (
                            <div
                                key={index}
                                className="p-1 text-[10px] sm:text-[12px] rounded-md px-1 sm:px-2 bg-primary text-white"
                            >
                                <span>{singleArea.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-8 sm:w-10 flex items-center justify-center flex-shrink-0">
                    <button
                        className="focus:outline-none p-1"
                        onClick={handleClickThreeDots}
                    >
                        <MoreVertIcon sx={{ color: "gray", fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                    </button>
                </div>
            </div>
        </div>
    );
}