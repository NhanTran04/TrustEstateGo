import { FC } from "react";
import { Card, CardContent } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RevenueResponse {
    period: number;
    total: number;
}

interface Props {
    title: string;
    data: RevenueResponse[];
    label: string;
}

const RevenueChart: FC<Props> = ({ title, data, label }) => {
    const chartData = {
        labels: data.map((d) => d.period.toString()),
        datasets: [
            {
                label,
                data: data.map((d) => d.total),
                backgroundColor: "rgba(75,192,192,0.6)",
            },
        ],
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <h3>{title}</h3>
                <Bar data={chartData} />
            </CardContent>
        </Card>
    );
};

export default RevenueChart;
