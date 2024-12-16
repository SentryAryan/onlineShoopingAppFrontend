/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ timeFrame }) => {
    const [salesData, setSalesData] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/sales-data');
                const data = response.data;

                // Process data according to the selected timeFrame
                if (timeFrame === 'daily') {
                    setLabels(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
                    setSalesData(data.dailySales); // Assuming the API returns dailySales array
                } else if (timeFrame === 'weekly') {
                    setLabels(['Week 1', 'Week 2', 'Week 3', 'Week 4']);
                    setSalesData(data.weeklySales); // Assuming the API returns weeklySales array
                } else if (timeFrame === 'monthly') {
                    setLabels(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
                    setSalesData(data.monthlySales); // Assuming the API returns monthlySales array
                }
            } catch (error) {
                console.error('Error fetching sales data', error);
            }
        };

        fetchData();
    }, [timeFrame]);

    const data = {
        labels: labels, // Dynamic labels based on selected timeframe
        datasets: [
            {
                label: 'Sales',
                data: salesData, // Dynamic data fetched from API
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="my-4">
            <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Sales Chart</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default SalesChart;
 */



import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ timeFrame }) => {
    // Determine labels based on selected timeFrame
    const getLabels = (timeFrame) => {
        switch (timeFrame) {
            case 'daily':
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            case 'weekly':
                return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            case 'monthly':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            default:
                return [];
        }
    };

    const data = {
        labels: getLabels(timeFrame), // Set labels based on the selected timeframe
        datasets: [
            {
                label: 'Sales',
                data: [65, 559, 80, 81, 56, 55, 40], // Example data; replace with actual data based on timeframe
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="my-4">
            <h3>{timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Sales Chart</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default SalesChart;
