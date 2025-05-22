import {SwordIcon} from "../../../../temp/SwordIcon";

export default function EmptyPlaceHolder() {
    return (
        <div className={"flex justify-center items-center  flex-col"}>
            <SwordIcon/>
            <span className={"text-center text-gray-500 py-4"}>
                No habits added yet. Click "New Adventure" to create one.
            </span>

        </div>
    )
}
