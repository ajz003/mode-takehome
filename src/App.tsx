import { useState } from "react";
import "./App.css";
import { fetchData } from "./api";
import { useTimeStore } from "./store";
import { format, parseISO } from "date-fns";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from "chart.js";
import LineChart from "./LineChart";
import DataTable from "./DataTable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

function App() {
    const [selectedDate, setSelectedDate] = useState("");
    const data = useTimeStore((state) => state.data);
    const setData = useTimeStore((state) => state.setData);

    const handleDateChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedDate(event.target.value);
    };

    const handleFetchData = async () => {
        const res = await fetchData(selectedDate);
        setData(res.data);
    };

    return (
        <div className="app-wrapper">
            <div>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <button onClick={handleFetchData}>Fetch Data</button>
            </div>

            {data && (
                <div className="chart-wrapper">
                    <LineChart apiData={data} />
                    <DataTable apiData={data} />
                </div>
            )}
        </div>
    );
}

export default App;
