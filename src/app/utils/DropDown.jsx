import {useState} from "react";

export default function DropDown(){
    const dropDownMenuItems = [
        {name: "Edit", icon: "faPencil"},
        {name: "Delete", icon: "faTrash"},
    ]

    const [hover, setHover] = useState(false);
    const [indexHovered, setIndexHovered] = useState(false);

    return(
        <div>

        </div>
    )
}