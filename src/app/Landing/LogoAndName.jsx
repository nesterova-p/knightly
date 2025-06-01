import AppIcon from "../../temp/AppIcon";

export default function LogoAndName() {
    return (
        <div className="flex gap-2 items-center justify-center">
            {/*<div className="p-1.5 sm:p-2 rounded-md bg-primary">
                <AppIcon color="#FFFFFF" height={28} width={28} className="sm:h-[34px] sm:w-[34px]" />
            </div>*/}
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
                           font-light leading-tight text-center">
                <span className="pixel-title-medieval ">
                    Knightly
                </span>
            </span>
        </div>
    )
}
