import React from "react";
import Card from "./Card.jsx";
import "../products/Products.css";
// import { useNavigate } from "react-router-dom";
const Workers = ({ workers }) => {
  // const navigate = useNavigate();
  return (
    <div className="products-container">
      <h1>Workers</h1>
      <div className="products-grid">
        {workers.map((item) => (
          <Card
            key={item.id}
            userName={item.userName}
            cin={item.cin}
            image={item.picture}
            jobTitle={item.jobTitle}
            adress={item.adress}
            // onClick={() => navigate(`/clients/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Workers;
