import React from "react";
import "../products/Card.css";

const Card = ({ userName, address, image, email, jobTitle, cin }) => {
  return (
    <div className="card">
      {image && <img src={image}  className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{userName}</h2>
        <p className="card-category">{address}</p>
        <p className="card-description">{email}</p>
        <p className="card-price">{jobTitle}</p>
        <p className="card-price">{cin}</p>
      </div>
    </div>
  );
};

export default Card;
