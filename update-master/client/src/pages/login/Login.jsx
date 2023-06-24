/* eslint-disable react/no-unescaped-entities */

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginUserMutation } from "../../service/userAuthApi";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState(""); // State variable to store the entered username
  const [password, setPassword] = useState(""); // State variable to store the entered password
  const navigate = useNavigate(); // Provides navigation functionality
  const [loginUser, { isLoading, data, error }] = useLoginUserMutation(); // Mutation hook for logging in the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username,
        password,
      };
      const response = await loginUser(loginData).unwrap(); // Send the login request to the server and unwrap the response

      localStorage.setItem("currentUser", JSON.stringify(response)); // Store user data in local storage
      toast.success("Login Successful", {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      }); // Display a success notification

      navigate("/"); // Navigate to the home page
    } catch (err) {
      toast.error(err.data.message, {
        position: "bottom-left",
        autoClose: 1500,
        theme: "dark",
      }); // Display an error notification with the error message
    }
  };

  return (
    <div className="login">
      <ToastContainer />{" "}
      {/* ToastContainer component for displaying notifications */}
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update the username state as the input value changes
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update the password state as the input value changes
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/register">Register</Link>{" "}
        {/* Link to the registration page */}
      </p>
      <p className="signup-link">
        Forgot your password? <Link to="/Forget">Forgot Password</Link>{" "}
        {/* Link to the password reset page */}
      </p>
    </div>
  );
};

export default Login;
