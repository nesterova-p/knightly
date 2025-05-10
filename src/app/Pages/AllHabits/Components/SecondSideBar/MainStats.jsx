import CircularProgressBar from "../../Components/SecondSideBar/CircularProgressBar";

export default function MainStats() {
    const statisticsInfo = [
        {id: 1, num: 7, subTitle: "Best streaks"},
        {id: 2, num: 10, subTitle: "Perfect days"},
    ]

    return(
        <div className="flex mx-4 flex-col gap-6 justify-center items-center mt-14 rounded-xl p-5 pt-7 bg-slate-50 ">
            <span className="font-bold text-xl cursor-pointer hover:text-primary ">
                Statistics
            </span>

            {/* Circular progress Bar */}
            <div className="relative pt-3">
                <CircularProgressBar progress={89} />
                <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-1">
                    <span className="font-bold text-xl text-primary mt-2">
                         89%
                    </span>
                    <span className="text-[11px] text-slate-400 text-center mt-1">
                        {`Today's Progress`}
                    </span>
                </div>
            </div>

            {/* Perfect days */}
            <div className=" my-4  flex justify-center gap-6 flex-wrap items-center    w-full">
                {statisticsInfo.map((singleItem, singleItemIndex) => (
                    <div className=" flex items-center gap-3" key={singleItemIndex}>
                        <div className="w-2 h-2 bg-customRed rounded-full"></div>
                        <div className="text-[12px]">
                            <span className="flex flex-col font-bold  ">
                                {singleItem.num}
                            </span>
                            <span className="text-gray-500"
                            >
                                {singleItem.subTitle}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}