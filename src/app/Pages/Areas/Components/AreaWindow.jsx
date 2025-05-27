import React, { useState, useEffect, useRef } from "react";
import { useGlobalContextProvider } from "../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faIcons } from "@fortawesome/free-solid-svg-icons";
import IconWindow from "../../AllHabits/Components/IconWindow/IconWindow";
import { textToIcon } from "../../AllHabits/Components/IconWindow/IconData";
import { addNewArea, updateAreaInServer } from "../../../utils/areaUtils";
import { useUser } from "@clerk/nextjs";

export default function AreaWindow() {
    const {
        areaWindowObject,
        selectedItemsObject,
        allAreasObject,
        allHabitObject
    } = useGlobalContextProvider();

    const { openAreaWindow, setOpenAreaWindow } = areaWindowObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;
    const { allAreas, setAllAreas } = allAreasObject;
    const { allHabits, setAllHabits } = allHabitObject;
    const { user } = useUser();

    const [areaName, setAreaName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(faIcons);
    const [openIconWindow, setOpenIconWindow] = useState(false);
    const [header, setHeader] = useState("Add New Area");

    const inputRef = useRef(null);

    useEffect(() => {
        if (openAreaWindow) {
            if (selectedItems) {
                setHeader("Edit Area");
                setAreaName(selectedItems.name || "");
                setSelectedIcon(selectedItems.icon || faIcons);
            } else {
                setHeader("Add New Area");
                setAreaName("");
                setSelectedIcon(faIcons);
            }

            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
        }
    }, [openAreaWindow, selectedItems]);

    const handleClose = () => {
        setOpenAreaWindow(false);
        setSelectedItems(null);
        setAreaName("");
        setSelectedIcon(faIcons);
    };

    const handleSave = async () => {
        if (areaName.trim() === "") {
            return;
        }

        if (selectedItems) {
            const updatedArea = {
                ...selectedItems,
                name: areaName.trim(),
                icon: selectedIcon,
                clerkUserId: user?.id
            };

            const success = await updateAreaInServer({
                allAreas,
                setAllAreas,
                selectedArea: selectedItems,
                area: updatedArea,
                allHabits,
                setAllHabits,
            });

            if (success) {
                handleClose();
            }
        } else {
            const newArea = {
                name: areaName.trim(),
                icon: selectedIcon,
                clerkUserId: user?.id
            };

            const success = await addNewArea({
                allAreas,
                setAllAreas,
                area: newArea
            });

            if (success) {
                handleClose();
            }
        }
    };

    const iconObject = selectedIcon ?
        (typeof selectedIcon === 'string' ? textToIcon(selectedIcon) : selectedIcon)
        : faIcons;

    return (
        <>
            <div
                className={`fixed inset-0 bg-black opacity-25 z-40 ${openAreaWindow ? "block" : "hidden"}`}
                onClick={handleClose}
            />

            <div
                className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 bg-white rounded-lg shadow-lg ${openAreaWindow ? "block" : "hidden"}`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-xl">{header}</span>
                        <FontAwesomeIcon
                            onClick={handleClose}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            icon={faClose}
                            width={20}
                            height={20}
                        />
                    </div>

                    <div className="mb-6">
                        <div className="text-sm text-gray-600 mb-2">Area Name</div>
                        <div className="flex items-center">
                            <input
                                ref={inputRef}
                                value={areaName}
                                onChange={(e) => setAreaName(e.target.value)}
                                className="flex-grow py-3 px-4 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter area name..."
                                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                            />
                            <button
                                className="ml-2 p-3 bg-primary text-white rounded-md hover:bg-primary transition-colors"
                                onClick={() => setOpenIconWindow(true)}
                            >
                                <FontAwesomeIcon
                                    icon={iconObject}
                                    width={16}
                                    height={16}
                                />
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-primary text-white font-medium rounded-md hover:bg-primary transition-colors"
                    >
                        {selectedItems ? "Update Area" : "Create Area"}
                    </button>
                </div>
            </div>

            <IconWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                setIconSelected={setSelectedIcon}
            />
        </>
    );
}