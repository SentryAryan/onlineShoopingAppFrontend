/*import React from 'react';
import { CSVLink } from 'react-csv'; // CSV export option
// You may also consider using libraries like jsPDF for PDF export

const ExportButton = ({ data }) => {
    const headers = [
        { label: "Date", key: "date" },
        { label: "Sales", key: "sales" },
        { label: "Net Profit", key: "netProfit" },
        { label: "Cost", key: "cost" },
        { label: "Tax", key: "tax" }
    ];

    return (
        <div className="my-3">
            <CSVLink data={data} headers={headers} filename={"sales-report.csv"} className="btn btn-primary">
                Export to CSV
            </CSVLink>
            //You can add more export options here, like PDF 
            </div>
        );
    };
    export default ExportButton;*/
import React from 'react';
import { CSVLink } from 'react-csv';

const ExportButton = ({ timeFrame }) => {
    const data = [
        { date: '2024-08-01', sales: 200 },
        { date: '2024-08-02', sales: 150 },
        { date: '2024-08-03', sales: 100 },
    ];

    const csvData = data.map((item) => ({
        Date: item.date,
        Sales: item.sales,
    }));

    return (
        <div className="my-4">
            <CSVLink data={csvData} filename={`${timeFrame}-sales-report.csv`} className="btn btn-primary">
                Export {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Sales Report
            </CSVLink>
        </div>
    );
};

export default ExportButton;


