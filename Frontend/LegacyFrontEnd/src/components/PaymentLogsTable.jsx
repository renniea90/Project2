import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/PaymentLogsTable.css'; 

const PaymentLogsTable = () => {
  const [paymentLogs, setPaymentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentLogs();
  }, []);

  const fetchPaymentLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/payment-logs');
      setPaymentLogs(response.data);
      setLoading(false); // Set loading to false after successful data fetch
    } catch (error) {
      setError('Failed to load payment logs');
      setLoading(false); // Set loading to false in case of error
    }
  };

  if (loading) {
    return <p>Loading payment logs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="payment-logs-table-container">
      <h2>Payment Logs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Payment Status</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {paymentLogs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.orderId}</td>
              <td>{log.paymentStatus}</td>
              <td>£{log.amount.toFixed(2)}</td>
              <td>{log.currency}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentLogsTable;
