import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function AllHabitsSearch() {
    return (
        <div className="w-64">
            <div className="flex bg-slate-50 gap-3 items-center p-3 rounded-xl">
                <FontAwesomeIcon
                    height={20}
                    width={20}
                    icon={faSearch}
                    className="text-gray-300"
                />
                <input
                    className="outline-none text-sm font-light bg-slate-50 w-full"
                    placeholder="Search"/>
            </div>
        </div>
    )
}