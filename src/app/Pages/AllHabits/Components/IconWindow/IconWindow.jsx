import { useState } from "react";
import { iconsData } from "./IconData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function IconWindow({ openIconWindow, setOpenIconWindow, setIconSelected }) {
    const [allIcons, setAllIcons] = useState(iconsData);

    return (
        <>
            {/* Background overlay */}
            {openIconWindow && (
                <div
                    className="fixed inset-0 bg-black opacity-25 z-50"
                    onClick={() => setOpenIconWindow(false)}
                />
            )}

            {/* Icon selection modal */}
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                w-[90%] max-w-[700px] bg-white rounded-md shadow-lg z-[60] p-6
                ${openIconWindow ? "block" : "hidden"}`}
            >
                {/* Close button */}
                <div className="absolute top-4 right-4">
                    <FontAwesomeIcon
                        onClick={() => setOpenIconWindow(false)}
                        icon={faClose}
                        className="text-gray-300 hover:text-gray-500 cursor-pointer"
                        width={16}
                        height={16}
                    />
                </div>

                {/* Title */}
                <h2 className="font-bold text-lg mb-6">Choose Your Icon</h2>

                {/* Icon grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {allIcons.map((icon, iconIndex) => (
                        <div
                            key={iconIndex}
                            className="border border-gray-200 rounded-md p-3 flex items-center justify-center cursor-pointer hover:border-primary hover:text-primary transition-colors"
                            onClick={() => {
                                setIconSelected(icon.faIcon);
                                setOpenIconWindow(false);
                            }}
                        >
                            <FontAwesomeIcon
                                icon={icon.faIcon}
                                className="text-2xl"
                                width={24}
                                height={24}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}