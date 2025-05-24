import {useEffect, useState} from "react";
import {faBorderAll, faChartSimple, faCheck, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function StatisticsCards() {
    const [statisticsCard, setStatisticsCard] = useState([
        {id: 1, icon: faFaceSmile, counter: 5, text: 'Total Habits'},
        {id: 2, icon: faBorderAll, counter: 3, text: 'Total Perfect Days'},
        {id: 3, icon: faChartSimple, counter: 1.5, text: 'Average Per Daily'},
        {id: 4, icon: faCheck, counter: 15, text: 'Best Streak'}
    ]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return() => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const filteredStatisticsCards = windowWidth < 640 ? statisticsCard.filter((card) => card.text !== "Average Per Daily") : statisticsCard;

    return (
        <div className={"p-5 mt-4 rounded-md grid grid-cols-4 gap-4 max-sm:grip-cols-3 bg-white"}>
            {filteredStatisticsCards.map((singleCard, index) => (
                <div key={index}
                className={"bg-slate-50 flex flex-col gap-1 items-center p-5 rounded-md"}>
                    <FontAwesomeIcon className={"text-primary"} icon={singleCard.icon} />
                    <span className={"font-bold text-xl mt-3"}>{singleCard.counter}</span>
                    <span className={"text-sm text-light"}>{singleCard.text}</span>
                </div>
            ))}
        </div>
    )
}