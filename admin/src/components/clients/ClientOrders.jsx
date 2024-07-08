import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ClientOrders.css"; // Create and import your CSS file

const ClientOrders = () => {
  const { clientId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/client/${clientId}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  if (loading) {
    return <div className="center">Loading...</div>;
  }

  if (error) {
    return <div className="center">Error: {error.message}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Client Orders</h1>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.idOrder} className="order-item">
              <p>
                <strong>Order ID:</strong> {order.idOrder}
              </p>
              <p>
                <strong>Product:</strong> {order.productName}
              </p>
              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>No orders found for this client.</div>
      )}
    </div>
  );
};

export default ClientOrders;
