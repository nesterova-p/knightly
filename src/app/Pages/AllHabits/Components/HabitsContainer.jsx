import FramedBox from "../../../../components/pixel-ui/Frame/FramedBox";
import HabitsContainerTop from "../../AllHabits/Components/HabitsContainer/HabitsContainerTop";
import HabitsContainerMain from "../../AllHabits/Components/HabitsContainer/HabitsContainerMain";

export default function HabitsContainer() {
    return (
        <FramedBox>
            <HabitsContainerTop />
            <HabitsContainerMain />
        </FramedBox>
    );
}
