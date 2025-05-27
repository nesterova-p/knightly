import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";
import { useState, useEffect } from "react";

export default function AllHabitsSearch() {
    const { searchHabitsObject, allFilteredHabitsObject } = useGlobalContextProvider();
    const { searchQuery, setSearchQuery } = searchHabitsObject;
    const { allFilteredHabits } = allFilteredHabitsObject;

    const [filteredCount, setFilteredCount] = useState(0);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredCount(allFilteredHabits.length);
        } else {
            const filtered = allFilteredHabits.filter(habit =>
                habit.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCount(filtered.length);
        }
    }, [searchQuery, allFilteredHabits]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const hasSearchQuery = searchQuery.trim().length > 0;

    return (
        <div className="w-64">
            <div className="flex bg-slate-50 gap-3 items-center p-3 rounded-xl relative">
                <FontAwesomeIcon
                    height={20}
                    width={20}
                    icon={faSearch}
                    className="text-gray-300"
                />
                <input
                    className="outline-none text-sm font-light bg-slate-50 w-full pr-6"
                    placeholder="Search habits..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                {hasSearchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Clear search"
                    >
                        <FontAwesomeIcon
                            height={14}
                            width={14}
                            icon={faTimes}
                        />
                    </button>
                )}
            </div>

            {hasSearchQuery && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                    {filteredCount === 0 ? (
                        <span className="text-pink-400">No habits found</span>
                    ) : filteredCount === 1 ? (
                        <span>1 habit found</span>
                    ) : (
                        <span>{filteredCount} habits found</span>
                    )}
                </div>
            )}
        </div>
    );
}