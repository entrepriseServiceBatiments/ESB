import React, { useState } from "react";
import axios from "axios";
import "./AddProducts.css";

const AddProduct = ({ setRefresh ,refresh}) => {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/products", formData)
      .then((response) => {
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
        setRefresh(!refresh)
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
      });
  };
  return ( <div className="add-product-container">
    <h2>Add New Product</h2>
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
      <button type="submit">Add Product</button>
    </form>
  </div>);
};

export default AddProduct;
