import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Client.css"; 

const Client = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/clients/${clientId}`
        );
        setClient(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchClient();
  }, [clientId]);

  if (loading) {
    return <div className="center">Loading...</div>;
  }

  if (error) {
    return <div className="center">Error: {error.message}</div>;
  }

  return (
    <div className="client-container">
      <h1>Client Details</h1>
      {client ? (
        <div className="client-details">
          <p>
            <strong>ID:</strong> {client.idClient}
          </p>
          <p>
            <strong>Username:</strong> {client.userName}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Address:</strong> {client.address}
          </p>
          <button
            className="order-button"
            onClick={() => navigate(`/orders/client/${client.idClient}`)}
          >
            View Orders
          </button>
        </div>
      ) : (
        <div>No client data found.</div>
      )}
    </div>
  );
};

export default Client;
