import React, { useEffect, useState } from "react";
import axios from "axios";
import "./All.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrders(response.data);
        setLoading(false);
        console.log(orders, "[0]");
      } catch (error) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [refresh]);

  const accept = async (orderId) => {
    axios
      .put(`http://localhost:3000/orders/accept/${orderId}`)
      .then((res) => {
        console.log(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const decline = async (orderId) => {
    axios
      .put(`http://localhost:3000/orders/decline/${orderId}`)
      .then((res) => {
        console.log(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
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
            <th>Client ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
            <th>products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.idorders}>
              <td>{order.idorders}</td>
              <td>{order.clientId}</td>
              <td>{order.startDate}</td>
              <td>{order.endDate}</td>
              <td>{order.status}</td>
              <td>
                {order.Products.map((prod) => {
                  return <p>{prod.Product.name}</p>;
                })}
              </td>
              <td>
                <button
                  className="accept-button"
                  onClick={() => accept(order.idorders)}
                >
                  Accept
                </button>
                <button
                  className="decline-button"
                  onClick={() => decline(order.idorders)}
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