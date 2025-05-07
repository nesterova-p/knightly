import {Checkbox, IconButton} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode} from "@fortawesome/free-solid-svg-icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function HabitsContainerMain() {
    return (
        <div className="p-3">
            <HabitCard/>
        </div>
    )
}

export function HabitCard() {
    return (
        <div className="flex p-3 items-center justify-between ">
            <Checkbox
                className="text-primary"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                    "&.Mui-checked": {
                        color: '#9EC77D',
                    },
                }}
            />

            <div className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50  ">
                <div className="  w-full">
                    <div className="flex gap-2 justify-between  ">
                        <div className="flex gap-2 items-center">
                            <FontAwesomeIcon
                                className="p-3 rounded-full w-4 h-4 bg-primary text-white"
                                height={20}
                                width={20}
                                icon={faCode}
                            />
                            <span className="">Coding</span>
                        </div>
                    </div>

                    {/* Divs for the areas */}
                    <div className="flex gap-2 mt-2  ">
                        <div
                            className="p-1 text-white text-[12px] rounded-md px-2 bg-primary"
                        >
                            <span className="text-customRed">Area1</span>
                        </div>
                        <div
                            className="p-1 text-white text-[12px] rounded-md px-2 bg-primary"
                        >
                            <span className="text-primary">Area1</span>
                        </div>
                    </div>
                </div>


                <div className="w-10 flex items-center justify-center">
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>


        </div>
    )
}