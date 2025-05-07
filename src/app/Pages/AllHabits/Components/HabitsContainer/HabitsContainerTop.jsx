import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function HabitsContainerTop() {
    return (
        <div className="p-3 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <div>
                    <h2 className="font-bold text-lg w-28">Sunday</h2>
                    <span className="font-light text-[12px]">07 May 2025</span>
                </div>

                <div className="flex gap-1 ml-4">
                    <div className="text-primary cursor-pointer">
                        <ArrowCircleLeftOutlinedIcon />
                    </div>

                    <div className="text-primary cursor-pointer">
                        <ArrowCircleRightOutlinedIcon />
                    </div>
                </div>
            </div>

            <button className="flex gap-2 items-center bg-primary p-3 text-white rounded-md text-sm">
                <FontAwesomeIcon icon={faPlus} />
                <span>New Habit</span>
            </button>
        </div>
    )
}