import React, { useState } from "react";
import axios from "axios";
import "./AddProducts.css";
import { useNavigate } from "react-router-dom";
const AddProduct = ({ setRefresh, refresh }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    picture: "",
    rating: "",
    stock: "",
    numOfRatings: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedFormData = {
      ...formData,
      price: parseInt(formData.price, 10),
      rating: parseFloat(formData.rating),
      stock: parseInt(formData.stock, 10),
      numOfRatings: parseInt(formData.numOfRatings, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        parsedFormData
      );
      console.log(response.data);
      alert("Product added successfully!");
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        picture: "",
        rating: "",
        stock: "",
        numOfRatings: "",
      });
      setRefresh(!refresh);
      setError(null);
    } catch (error) {
      console.error("There was an error adding the product!", error);
      setError(error.response ? error.response.data : "An error occurred");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      {error && (
        <div className="error">
          {typeof error === "object" && error.error
            ? error.error
            : JSON.stringify(error)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="picture">Picture URL:</label>
          <input
            type="text"
            id="picture"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numOfRatings">Number of Ratings:</label>
          <input
            type="number"
            id="numOfRatings"
            name="numOfRatings"
            value={formData.numOfRatings}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            navigate("/products");
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
