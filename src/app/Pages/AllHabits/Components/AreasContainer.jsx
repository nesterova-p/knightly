import {useGlobalContextProvider} from "../../../contextApi";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function AreasContainer(){
    const {allAreasObject} = useGlobalContextProvider();
    const {allAreas} = allAreasObject;

    const [selectedAreas, setSelectedAreas] = useState({});

    const toggleAreaSelection = (index) => {
        const selectedAreasCopy = {...selectedAreas};
        Object.keys(selectedAreasCopy).forEach((key) => {
            selectedAreasCopy[parseInt(key)] = false;
        });

        selectedAreasCopy[index] = true;
        setSelectedAreas(selectedAreasCopy);
    };

    useEffect(() => {
        const initialSelectedAreas = {};
        allAreas.forEach((_, index) => {
            initialSelectedAreas[index] = false;
        });

        initialSelectedAreas[0] = true;
        setSelectedAreas(initialSelectedAreas);
    }, [allAreas]);

    console.log('Selected Areas:', JSON.stringify(selectedAreas));

    return (
        <div
            className="p-5 bg-white rounded-md flex gap-3 items-center transition-all mt-5 text-sm"
        >
            {allAreas.map((area, index) => (
                <div onClick={() => toggleAreaSelection(index)} key={area.id || index}>
                    <SingleAreaContainer
                        singleArea={area}
                        isSelected={selectedAreas[index]}
                    />
                </div>
            ))}
        </div>
    )
}

function SingleAreaContainer({ singleArea, isSelected }) {
    return (
        <div
            className={`p-2 px-3 rounded-md flex gap-1 items-center cursor-pointer ${
                isSelected ? "bg-primary text-white" : "text-gray-400"
            }`}
        >
            <FontAwesomeIcon icon={singleArea.icon} />
            <span>{singleArea.name}</span>
        </div>
    );
}