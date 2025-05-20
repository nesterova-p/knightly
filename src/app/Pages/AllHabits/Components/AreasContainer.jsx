import {useGlobalContextProvider} from "../../../contextApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AreasContainer() {
    const { allAreasObject, selectedAreaStringObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;
    const { selectedAreaString, setSelectedAreaString } = selectedAreaStringObject;

    const toggleAreaSelection = (areaName) => {
        setSelectedAreaString(areaName);
    };

    return (
        <div className="p-5 bg-white rounded-md flex gap-3 items-center transition-all mt-5 text-sm overflow-x-auto">
            {allAreas.map((area, index) => (
                <div onClick={() => toggleAreaSelection(area.name)} key={area.id || index}>
                    <SingleAreaContainer
                        singleArea={area}
                        isSelected={selectedAreaString === area.name}
                    />
                </div>
            ))}
        </div>
    );
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