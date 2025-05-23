import { useGlobalContextProvider } from "../contextApi";
import { deleteHabit } from "./deleteHabit";

export default function ConfirmationComponent() {
    const {
        openConfirmationWindowObject,
        selectedItemsObject,
        allHabitObject
    } = useGlobalContextProvider();

    const { openConfirmationWindow, setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;
    const { allHabits, setAllHabits } = allHabitObject;

    function isAreaType(item) {
        return "name" in item && "icon" in item && !("frequency" in item);
    }

    function isHabitType(item) {
        return "frequency" in item && "completedDays" in item;
    }

    function deleteOption() {
        if (isHabitType(selectedItems)) {
            deleteHabit(allHabits, setAllHabits, selectedItems);
            setOpenConfirmationWindow(false);
            setSelectedItems(null);
        }
    }

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
                Are you sure you want to delete this {selectedItems?.isTask ? "task" : "item"}?
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