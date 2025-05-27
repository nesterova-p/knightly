import { useGlobalContextProvider } from "../contextApi";
import { deleteHabit } from "./deleteHabit";
import { deleteArea } from "./areaUtils";

export default function ConfirmationComponent() {
    const {
        openConfirmationWindowObject,
        selectedItemsObject,
        allHabitObject,
        allAreasObject
    } = useGlobalContextProvider();

    const { openConfirmationWindow, setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;
    const { allHabits, setAllHabits } = allHabitObject;
    const { allAreas, setAllAreas } = allAreasObject;

    function isAreaType(item) {
        return item && "name" in item && "icon" in item && !("frequency" in item) && item.name !== "All";
    }

    function isHabitType(item) {
        return item && "frequency" in item && "completedDays" in item;
    }

    function deleteAreaFunction() {
        if (!selectedItems) return;
        deleteArea(allAreas, setAllAreas, selectedItems, allHabits, setAllHabits);
        setOpenConfirmationWindow(false);
        setSelectedItems(null);
    }

    function deleteOption() {
        if (!selectedItems) return;

        if (isHabitType(selectedItems)) {
            deleteHabit(allHabits, setAllHabits, selectedItems);
            setOpenConfirmationWindow(false);
            setSelectedItems(null);
        } else if (isAreaType(selectedItems)) {
            deleteAreaFunction();
        }
    }

    const getItemType = () => {
        if (!selectedItems) return "item";
        if (isAreaType(selectedItems)) return "area";
        if (selectedItems?.isTask) return "task";
        return "habit";
    };

    return(
        <div
            style={{
                left: "0",
                right: "0",
                marginLeft: "auto",
                marginRight: "auto",
                top: '40%',
                transform: 'translateY(-50%)'
            }}
            className={`shadow-md rounded-md md:w-[450px] w-[310px] bg-white py-8 pt-10 p-4 z-50 flex flex-col gap-2 items-center ${openConfirmationWindow ? 'fixed' : 'hidden'}`}
        >
            <span className={"font-bold text-xl"}>
                {'Are you sure?'}
            </span>
            <span className={"text-center text-[13px] opacity-75"}>
                Are you sure you want to delete this {getItemType()}?
                <br/>
                This action cannot be undone
            </span>
            <div className={"flex gap-2 mt-5"}>
                <button
                    className={"border text-[13px] w-full px-10 p-3 rounded-md"}
                    onClick={() => {
                        setOpenConfirmationWindow(false);
                        setSelectedItems(null);
                    }}
                >
                    Cancel
                </button>
                <button
                    className={"text-[13px] w-full px-10 p-3 rounded-md text-white bg-primary"}
                    onClick={deleteOption}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}