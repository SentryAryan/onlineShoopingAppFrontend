/*import React, { useState } from 'react';
import SalesChart from './SalesChart';
import PieChart from './PieChart';

const ManageSales = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    const handleTimeFrameChange = (e) => {
        setTimeFrame(e.target.value);
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="timeFrameSelect">Select Time Frame:</label>
                <select id="timeFrameSelect" value={timeFrame} onChange={handleTimeFrameChange} className="form-control">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <SalesChart timeFrame={timeFrame} />
            <PieChart timeFrame={timeFrame} />
        </div>
    );
};

export default ManageSales;
 */

import React, { useState } from 'react';
import SalesChart from './Sales/SalesChart';
import PieChart from './Sales/PieChart';
import ExportButton from './Sales/ExportButton';
import SalesReport from './Sales/SalesReport';
import { Row,Col, Card } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa';

const ManageSales = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    const handleTimeFrameChange = (e) => {
        setTimeFrame(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Manage Sales</h1>

            <div className="form-group tab-content mb-4">
                <label htmlFor="timeFrame">Select Time Frame:</label>
                <select
                    id="timeFrame"
                    className="form-control"
                    value={timeFrame}
                    onChange={handleTimeFrameChange}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="tab-content mb-4"> <SalesChart timeFrame={timeFrame} /></div>
            <div className="mb-4">
                <Row>
                    <Col md={7} className="tab-content me-4">
                        <PieChart timeFrame={timeFrame} />
                    </Col>

                    <Col md={4} className="ml-md-3 tab-content" >
                        <Card className="mb-4">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>Expenses</Card.Title>
                                    <FaMoneyBillWave style={{ color: '#dc3545', fontSize: '1.5rem', marginBottom: "1rem" }} />
                                </div>
                                <Card.Text><span>Rs.</span> 455</Card.Text>
                                <Card.Title className='CardTitle'>Today's Expenses</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </div>
            <div className="tab-content mb-4">
                <SalesReport timeFrame={timeFrame} />
                <ExportButton timeFrame={timeFrame} />
            </div>

        </div>
    );
};

export default ManageSales;


