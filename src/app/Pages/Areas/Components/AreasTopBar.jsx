import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";

export default function AreasTopBar() {
    const { openSideBarObject, areaWindowObject } = useGlobalContextProvider();
    const { setOpenSideBar } = openSideBarObject;
    const { setOpenAreaWindow } = areaWindowObject;

    const handleOpenAreaWindow = () => {
        setOpenAreaWindow(true);
    };

    return (
        <div className="bg-white p-5 rounded-md flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <span className="text-xl font-bold">Areas</span>
                <button
                    onClick={handleOpenAreaWindow}
                    className="flex gap-2 items-center bg-primary p-3 text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>New Area</span>
                </button>
            </div>
            <FontAwesomeIcon
                icon={faBars}
                onClick={() => {setOpenSideBar(true)}}
                className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
            />
        </div>
    )
}