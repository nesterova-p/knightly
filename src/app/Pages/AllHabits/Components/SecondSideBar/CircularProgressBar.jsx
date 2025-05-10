import { PieChart, Pie, Cell } from 'recharts';

const CircularProgressBar = ({ progress }) => {
    const primaryColor = "#9EC77D"; // Replace with your actual default color

    const data = [
        { name: "Completed", value: progress },
        { name: "Remaining", value: 100 - progress },
    ];

    const COLORS = [primaryColor, "#edf2f4"];

    return (
        <PieChart
            width={200}
            height={160}
            margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
        >
            <Pie
                data={data}
                cx={100}
                cy={100}
                startAngle={180}
                endAngle={-180}
                innerRadius={66}
                outerRadius={progress === 100 ? 80 : 78}
                fill="#edf2f4"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default CircularProgressBar;