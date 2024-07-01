import React from "react";
import Card from "./Card.jsx";
import "./Products.css";
import { useNavigate } from "react-router-dom";
const Products = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div className="products-container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            description={item.description}
            image={item.picture}
            price={item.price}
            category={item.category}
            onClick={() => navigate(`/products/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
