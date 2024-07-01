import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        data
      );

      if (response.status === 200) {
        toast.success("Login successful");

        setAdmin(response.data.admin);
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  const logOut = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, admin, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
