import React from "react";
import "./Card.css";

const Card = ({ title, description, image, price, category, click }) => {
  return (
    <div className="card" onClick={() => click()}>
      {image && <img src={image} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-category">{category}</p>
        <p className="card-description">{description}</p>
        <p className="card-price">${price}</p>
      </div>
    </div>
  );
};

export default Card;
