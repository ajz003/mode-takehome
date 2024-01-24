import { Fragment, useState } from "react";

interface DataPoint {
    time: string;
    value: string;
}

interface TableState {
    currentPage: number;
    dataPerPage: number;
}

export default function DataTable({ apiData }: { apiData: string }) {
    const [tableState, setTableState] = useState<TableState>({
        currentPage: 1,
        dataPerPage: 25,
    });

    const indexOfLastData = tableState.currentPage * tableState.dataPerPage;
    const indexOfFirstData = indexOfLastData - tableState.dataPerPage;

    const lines = apiData.split("\n");
    const dataPoints: DataPoint[] = [];

    lines.forEach((line) => {
        if (line) {
            const [time, value] = line.split(" ");
            dataPoints.push({
                time,
                value,
            });
        }
    });

    const currentData = dataPoints.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers: number[] = [];
    const maxPageNumbersToShow = 5;
    const totalPages = Math.ceil(dataPoints.length / tableState.dataPerPage);
    const halfMaxPageNumbers = Math.floor(maxPageNumbersToShow / 2);

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages || // Always include the first and last page numbers
            (i >= tableState.currentPage - halfMaxPageNumbers &&
                i <= tableState.currentPage + halfMaxPageNumbers)
        ) {
            pageNumbers.push(i);
        }
    }

    const handlePrevPage = () =>
        setTableState((prev) => ({
            ...prev,
            currentPage: prev.currentPage - 1,
        }));
    const handleNextPage = () =>
        setTableState((prev) => ({
            ...prev,
            currentPage: prev.currentPage + 1,
        }));
    const paginate = (pageNumber: number) =>
        setTableState({ ...tableState, currentPage: pageNumber });

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((dataPoint, index) => (
                        <tr key={index}>
                            <td>{dataPoint.time}</td>
                            <td>{dataPoint.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => paginate(1)}
                    disabled={tableState.currentPage === 1}
                    title="First Page"
                >
                    &laquo;&laquo;
                </button>
                <button
                    onClick={handlePrevPage}
                    disabled={tableState.currentPage === 1}
                    title="Previous Page"
                >
                    &laquo;
                </button>

                {pageNumbers.map((number, index) => (
                    <Fragment key={number}>
                        {index > 0 && pageNumbers[index - 1] !== number - 1 && (
                            <span>...</span>
                        )}
                        <button
                            className={
                                tableState.currentPage === number
                                    ? "active"
                                    : ""
                            }
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    </Fragment>
                ))}

                <button
                    onClick={handleNextPage}
                    disabled={tableState.currentPage === totalPages}
                    title="Next Page"
                >
                    &raquo;
                </button>
                <button
                    onClick={() => paginate(totalPages)}
                    disabled={tableState.currentPage === totalPages}
                    title="Last Page"
                >
                    &raquo;&raquo;
                </button>
            </div>
        </>
    );
}
