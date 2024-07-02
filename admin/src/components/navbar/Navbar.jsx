import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const { logOut, token } = useAuth();
  const signOut = () => {
    logOut();
  };

  const navigate = useNavigate();

  return (
    <>
      <div id="topNav">
        <div className="midleText">
          you can manage your products here
          <span>YouAreTheOwner</span>
        </div>
      </div>
      <div id="nav">
        <div className="logo">
          <a href="#">Company</a>
        </div>
        <div className="MidleNav">
          <ul>
            <li>
              <a href="#" onClick={() => navigate("/")}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={() => navigate("/clients")}>
                Clients
              </a>
            </li>
            <li>
              <a href="#" onClick={() => navigate("/workers")}>
                Worker
              </a>
            </li>
            <li>
              <a href="#" onClick={() => navigate("/products")}>
                Products
              </a>
            </li>
            <li>
              <a href="#" onClick={() => navigate("/add")}>
                Add Product
              </a>
            </li>
          </ul>
        </div>
        <div className="rightNav">
          <div className="icons">
            {token && (
              <div className="dropdown ">
                <i className="fas fa-user toggle"></i>
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/verify")}>
                    <i class="fa-regular fa-user"></i>
                    <span>Verification</span>
                  </li>
                  <li>
                    <i className="fas fa-shopping-bag"></i>
                    <span>Orders</span>
                  </li>
                  <li onClick={signOut}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Log Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
