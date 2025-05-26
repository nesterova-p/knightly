import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useGlobalContextProvider} from "../../../contextApi";

export default function StatisticsTopBar() {
    const {openSideBarObject} = useGlobalContextProvider();
    const {setOpenSideBar} = openSideBarObject;

    return (
        <div className={"p-6 rounded-md flex justify-between items-center transition-all bg-white"}>
            <div>
                <span className={"text-xl font-bold"}>
                    Statistics
                </span>
            </div>
            <FontAwesomeIcon
                icon={faBars}
                onClick={() => {setOpenSideBar(true)}}
                className={"m-2 max-xl:flex hidden mt-[13px] cursor-pointer"}
            />
        </div>
    )
}