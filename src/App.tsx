import { useState } from "react";
import "./App.css";
import { fetchData } from "./api";
import { useTimeStore } from "./store";

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
    const [error, setError] = useState<string | null>(null);

    const handleFetchData = async () => {
        try {
            if (!selectedDate) {
                setError("Please pick a date.");
                return;
            }
            const res = await fetchData(selectedDate);
            setData(res.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch data. Please try again later.");
        }
    };

    return (
        <div className="app-wrapper">
            <div className="date-fetch-wrapper">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) => setSelectedDate(event.target.value)}
                />
                <button onClick={handleFetchData}>Fetch Data</button>
            </div>

            {error && <div className="error-message">{error}</div>}

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
