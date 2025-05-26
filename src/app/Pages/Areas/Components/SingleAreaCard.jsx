import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";
import { textToIcon } from "../../AllHabits/Components/IconWindow/IconData";

export default function SingleAreaCard({ area }) {
    const {
        areaWindowObject,
        selectedItemsObject,
        openConfirmationWindowObject,
        allHabitObject
    } = useGlobalContextProvider();

    const { setOpenAreaWindow } = areaWindowObject;
    const { setSelectedItems } = selectedItemsObject;
    const { setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { allHabits } = allHabitObject;

    const iconObject = area.icon ?
        (typeof area.icon === 'string' ? textToIcon(area.icon) : area.icon)
        : null;

    const habitCount = allHabits.filter(habit =>
        habit.areas && habit.areas.some(habitArea => habitArea.name === area.name)
    ).length;

    const handleEdit = () => {
        setSelectedItems(area);
        setOpenAreaWindow(true);
    };

    const handleDelete = () => {
        setSelectedItems(area);
        setOpenConfirmationWindow(true);
    };

    return (
        <div className="bg-slate-50 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-all duration-200 group">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center text-white mb-3">
                {iconObject && <FontAwesomeIcon icon={iconObject} className="text-2xl" />}
            </div>

            <h3 className="font-medium text-gray-800 mb-1">{area.name}</h3>
            <p className="text-xs text-gray-500 mb-4">
                {habitCount} {habitCount === 1 ? 'habit' : 'habits'}
            </p>

            <div className="flex gap-2 w-full">
                <button
                    onClick={handleEdit}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary transition-colors"
                >
                    <FontAwesomeIcon icon={faPencil} className="text-xs" />
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    Delete
                </button>
            </div>
        </div>
    );
}