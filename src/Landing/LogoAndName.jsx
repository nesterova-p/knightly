import AppIcon from "../temp/AppIcon";

export default function LogoAndName() {
    return (

    <div className="flex gap-2 items-center justify-center sm:justify-start">
        <div className="p-2 rounded-md bg-primary">
            <AppIcon color="#FFFFFF" height={34} width={34} />
        </div>
        <span className="text-2xl font-light">
            <span className="font-bold text-black">
                                Knightly
            </span>
        </span>
    </div>
    )
}