import { useGlobalContextProvider } from "../../../contextApi";
import SingleAreaCard from "./SingleAreaCard";

export default function AreasContainer() {
    const { allAreasObject } = useGlobalContextProvider();
    const { allAreas } = allAreasObject;

    const filteredAreas = allAreas.filter(area => area.name !== "All");

    return (
        <div className="bg-white mt-5 p-5 rounded-md">
            <div className="mb-4">
                <h2 className="font-bold text-lg">Manage Your Areas</h2>
                <p className="text-gray-500 text-sm mt-1">
                    Organize your habits into different life areas
                </p>
            </div>

            {filteredAreas.length === 0 ? (
                <div className="flex justify-center items-center flex-col py-12">
                    <div className="text-gray-400 text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-lg font-medium mb-2">No areas created yet</p>
                        <p className="text-sm">Start by creating your first area to organize your habits</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAreas.map((area, index) => (
                        <SingleAreaCard key={area._id || index} area={area} />
                    ))}
                </div>
            )}
        </div>
    );
}