import React, { useEffect, useState } from "react";
import axios from "axios";
import "./All.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allOrders");
        setOrders(response.data);
        setLoading(false);
        console.log(response.data, "orders useEff");
      } catch (error) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status,
      });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>All Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.Client.userName}</td>
              <td>{order.startDate}</td>
              <td>{order.endDate}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className="accept-button"
                  onClick={() => handleStatusChange(order.id, "accepted")}
                  disabled={order.status === "accepted"}
                >
                  Accept
                </button>
                <button
                  className="decline-button"
                  onClick={() => handleStatusChange(order.id, "declined")}
                  disabled={order.status === "declined"}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
