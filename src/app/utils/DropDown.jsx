import {useState, useRef, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../contextApi";

export default function DropDown() {
    const {
        openDropDownObject,
        dropDownPositionsObject,
        openConfirmationWindowObject,
        selectedItemsObject
    } = useGlobalContextProvider();

    const { openDropDown, setOpenDropDown } = openDropDownObject;
    const { dropDownPositions } = dropDownPositionsObject;
    const {openConfirmationWindow ,setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { setSelectedItems } = selectedItemsObject;
    const ref = useRef(null);

    const dropDownMenuItems = [
        { name: "Edit", icon: faPencil },
        { name: "Delete", icon: faTrash },
    ];
    const [hover, setHover] = useState(false);
    const [indexHovered, setIndexHovered] = useState(0);

    function handleHoverChange(index, state) {
        setIndexHovered(index);
        setHover(state);
    }

    useEffect(() => {
        function handleOutsideClick(event) {
            if (ref && !ref.current?.contains(event.target)) {
                setOpenDropDown(false);
                if(!openConfirmationWindow){
                    setSelectedItems(null);
                }

            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [openDropDown, setOpenDropDown, setSelectedItems]);

    function handleClickedOption(index) {
        switch (index) {
            case 0:
                break;
            case 1:
                setOpenConfirmationWindow(true);
                setOpenDropDown(false);
                break;
            default:
                break;
        }
    }

    return (
        <div
            ref={ref}
            style={{
                left: dropDownPositions.left - 135,
                top: dropDownPositions.top + 40,
                backgroundColor: "#ffffff"
            }}
            className={`p-3 w-40 fixed z-[60] shadow-md flex rounded-lg flex-col gap-3 ${openDropDown ? "block" : "hidden"}`}
        >
            {dropDownMenuItems.map((menuItem, index) => (
                <div
                    style={{
                        backgroundColor:
                            hover && index === indexHovered ? "#9EC77D" : "",
                    }}
                    key={index}
                    onMouseEnter={() => handleHoverChange(index, true)}
                    onMouseLeave={() => handleHoverChange(index, false)}
                    onClick={() => handleClickedOption(index)}
                    className="flex gap-2 items-center rounded-md p-3 select-none cursor-pointer transition-all"
                >
                    <FontAwesomeIcon
                        style={{
                            color:
                                hover && index === indexHovered
                                    ? "#ffffff"
                                    : "#9EC77D",
                        }}
                        className="size-4"
                        icon={menuItem.icon}
                    />
                    <div
                        style={{
                            color:
                                hover && index === indexHovered
                                    ? "#ffffff"
                                    : "#333333"
                        }}
                        className=""
                    >
                        {menuItem.name}
                    </div>
                </div>
            ))}
        </div>
    );
}