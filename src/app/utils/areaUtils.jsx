import { iconToText } from "../Pages/AllHabits/Components/IconWindow/IconData";
import toast from "react-hot-toast";

export async function addNewArea({ allAreas, setAllAreas, area }) {
    const { icon } = area;
    const areaIconText = iconToText(icon);
    const updatedArea = { ...area, icon: areaIconText };

    try {
        const response = await fetch("/api/areas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedArea),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.error || "Failed to create area");
            return false;
        }

        const data = await response.json();
        const { _id } = data.area;
        const updatedIdOfArea = { ...area, _id: _id };

        setAllAreas([...allAreas, updatedIdOfArea]);
        toast.success("Area created successfully!");
        return true;

    } catch (error) {
        console.error("Error creating area:", error);
        toast.error("Something went wrong while creating the area");
        return false;
    }
}

export async function updateAreaInServer({ allAreas, setAllAreas, selectedArea, area }) {
    try {
        const areaIconText = iconToText(area.icon);
        const updatedArea = { ...area, icon: areaIconText };

        const response = await fetch(`/api/areas?areaId=${selectedArea._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updatedArea.name,
                icon: updatedArea.icon,
                clerkUserId: updatedArea.clerkUserId
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message || "Failed to update area");
            return false;
        }

        const updateAllAreas = allAreas.map((singleArea) => {
            if (singleArea._id === selectedArea._id) {
                return { ...area, _id: selectedArea._id };
            }
            return singleArea;
        });

        setAllAreas(updateAllAreas);
        toast.success("Area updated successfully!");
        return true;

    } catch (error) {
        console.error("Error updating area:", error);
        toast.error("Something went wrong while updating the area");
        return false;
    }
}

export async function deleteArea(allAreas, setAllAreas, selectedArea) {
    try {
        const updatedAreas = allAreas.filter((area) =>
            area._id !== selectedArea?._id
        );

        const response = await fetch('/api/areas', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ areaId: selectedArea?._id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData.message);
            toast.error("Failed to delete area");
            return false;
        }

        const data = await response.json();
        toast.success("Area deleted successfully");
        setAllAreas(updatedAreas);
        return true;

    } catch (error) {
        toast.error("Something went wrong");
        console.error("Error deleting area:", error);
        return false;
    }
}