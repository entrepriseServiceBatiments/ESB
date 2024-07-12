import React from "react";
import Card from "./Cards.jsx"; 
import "../products/Products.css";
import { useNavigate } from "react-router-dom";

const Clients = ({ clients }) => {
  const navigate = useNavigate();
  return (
    <div className="products-container">
      <h1>Clients</h1>
      <div className="products-grid">
        {clients.map((item) => (
          <Card
            key={item.idClient}
            userName={item.userName}
            cin={item.cin}
            image={item.picture}
            phoneNum={item.phoneNum}
            address={item.address}
            click={() => navigate(`/client/${item.idClient}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Clients;
