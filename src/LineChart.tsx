import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import { useEffect, useState } from "react";
import { ChartData, Point } from "chart.js";

const options = {
    scales: {
        x: {
            title: {
                display: true,
                text: "Time",
                color: "#911",
                font: {
                    size: 18,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
        },
        y: {
            title: {
                display: true,
                text: "Value",
                color: "#191",
                font: {
                    size: 18,
                },
                padding: { top: 0, left: 0, right: 0, bottom: 20 },
            },
        },
    },
};

export default function LineChart({ apiData }: { apiData: string }) {
    const [lineChartData, setLineChartData] =
        useState<ChartData<"line", (number | Point | null)[], unknown>>();

    useEffect(() => {
        const lines = apiData.split("\n");
        const labels: string[] = [];
        const data: number[] = [];

        lines.forEach((line) => {
            if (line) {
                const [time, value] = line.split(" ");
                labels.push(time);
                data.push(parseFloat(value));
            }
        });

        setLineChartData({
            labels: labels,
            datasets: [
                {
                    label: "Time Series Data",
                    data,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ],
        });
    }, [apiData]);

    if (!lineChartData) {
        return null;
    }

    return (
        <div className="line-chart-wrapper">
            <Line data={lineChartData} options={options} />
        </div>
    );
}
