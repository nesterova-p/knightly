import AppIcon from "../../temp/AppIcon";

export default function LogoAndName() {
    return (

        <div className="flex gap-2 items-center justify-center sm:justify-start">
            <div className="p-1.5 sm:p-2 rounded-md bg-primary">
                <AppIcon color="#FFFFFF" height={28} width={28} className="sm:h-[34px] sm:w-[34px]" />
            </div>
            <span className="text-xl sm:text-2xl font-light">
            <span className="font-bold text-black">
                                Knightly
            </span>
        </span>
        </div>
    )
}