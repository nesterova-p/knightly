import {CastleIcon} from "../../../../temp/CastleIcon";

export default function SuccessPlaceHolder() {
    return (
        <div className={"flex justify-center items-center  flex-col"}>
            <CastleIcon/>
            <span className={"text-center text-gray-500 py-4"}>
                You've completed all your habits for today.
                Keep up the great momentum!
            </span>

        </div>
    )
}

