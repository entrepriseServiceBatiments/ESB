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
    picture: null,
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

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("stock", formData.stock);
    data.append("numOfRatings", formData.numOfRatings);
    data.append("picture", formData.picture);
    // data.append("upload_preset", "ademsalah"); 

    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Product added successfully!");
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        picture: null,
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
          <label htmlFor="picture">Picture:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
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
    </div>
  );
};

export default AddProduct;
