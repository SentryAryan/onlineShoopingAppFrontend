/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = ({ timeFrame }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/sales-data');
                const data = response.data;

                setChartData({
                    labels: ['Sales', 'Net Profit', 'Cost', 'Tax'],
                    datasets: [{
                        data: [data.sales, data.netProfit, data.cost, data.tax], 
                        // Replace with correct keys from the API
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
                        borderWidth: 1,
                    }]
                });
            } catch (error) {
                console.error('Error fetching pie chart data', error);
            }
        };

        fetchData();
    }, [timeFrame]);

    return (
        <div className="my-4">
            <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Summary</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
 */


import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChart = ({ timeFrame }) => {
    const data = {
        labels: ['Sales','Net Profit', 'Cost', 'Tax'],
        datasets: [
            {
                data: [500,300, 150, 100],
                backgroundColor: ['#262BB6','#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#262BB6','#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <span>
        <div className="my-4">
            <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Sales Breakdown</h3>
            <Pie data={data} />
        </div>
        </span>
    );
};

export default PieChart;
