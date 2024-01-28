import axios from "axios";

interface ApiResponse {
    data: string;
}

export const fetchData = async (date: string): Promise<ApiResponse> => {
    const begin = `${date}T00:00:00Z`;
    const end = `${date}T23:59:59Z`;

    return axios.get(
        `https://tsserv.tinkermode.dev/data?begin=${begin}&end=${end}`
    );
};
