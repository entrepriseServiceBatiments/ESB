import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
      });
  }, [id]);

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error("Failed to delete product:", err);
      });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <img src={product.picture} alt={product.name} />
      <h1>{product.name}</h1>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating} ({product.numOfRatings}{" "}
        reviews)
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <button onClick={deleteProduct} className="delete-button">
        Delete Product
      </button>
    </div>
  );
};

export default ProductDetails;
