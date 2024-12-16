/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesReport = ({ timeFrame }) => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get('/api/sales-data');
                const data = response.data;

                if (timeFrame === 'daily') {
                    setReportData(data.dailySales);
                } else if (timeFrame === 'weekly') {
                    setReportData(data.weeklySales);
                } else if (timeFrame === 'monthly') {
                    setReportData(data.monthlySales);
                }
            } catch (error) {
                console.error('Error fetching report data', error);
            }
        };

        fetchReportData();
    }, [timeFrame]);

    return (
        <div>
            <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Sales Report</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Sales</th>
                        <th>Net Profit</th>
                        <th>Cost</th>
                        <th>Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.sales}</td>
                            <td>{entry.netProfit}</td>
                            <td>{entry.cost}</td>
                            <td>{entry.tax}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;
 */


import React from 'react';

const SalesReport = ({ timeFrame }) => {
    // Add logic to fetch and display sales reports based on the timeFrame

    return (
        <div className="my-4">
            <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Sales Report</h3>
            <p>Detailed report will go here...</p>
        </div>
    );
};

export default SalesReport;
