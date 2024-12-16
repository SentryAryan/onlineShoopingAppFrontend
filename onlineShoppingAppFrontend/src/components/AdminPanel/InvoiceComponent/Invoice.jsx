import React from 'react';
import './Invoice.css'; // You can style your invoice using this CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const Invoice = ({ order }) => {
    const handlePrint = () => {
        const printContents = document.getElementById('invoice').innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();  // Reload the page to reset the view
    };

    return (
        <div className="invoice-container" id="invoice" style={{width:'100%'}}>
            <div className="invoice-header">
                <h2>INVOICE</h2>
                <p>Invoice Number: #{order.id}</p>
                <p>Invoice Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="invoice-details">
                <div className="invoice-to">
                    <h3>Invoice To</h3>
                    <p>{order.customer}</p>
                    <p>Table Number: {order.tableNumber}</p>
                </div>
                <div className="invoice-from">
                    <h3>Invoice From</h3>
                    <p>India Web Digital</p>
                    <p>Restaurant Address</p>
                </div>
            </div>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Item Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.description}</td>
                            <td>Rs.{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>Rs.{item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="invoice-summary">
                <p>Subtotal: Rs.{order.subtotal}</p>
                <p>Tax: Rs.{order.tax}</p>
                <h4>Grand Total: Rs.{order.totalPrice}</h4>
            </div>

            <div className="invoice-footer">
                <button onClick={handlePrint} className="btn btn-primary">Print Invoice</button>
            </div>
        </div>
    );
};

export default Invoice;
